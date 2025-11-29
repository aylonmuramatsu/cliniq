import {
  AppException,
  BaseController,
  created,
  ok,
} from '@insightcreativewebs/api'
import type { Request } from 'express'
import { Rules } from './authentication.rules'
import { AuthenticationService } from './authentication.service'

export class AuthenticationController extends BaseController {
  private service = new AuthenticationService()

  async sign_up(req: Request) {
    //o pick faz o sanitize dos campos conforme o schema
    const input = Rules.sign_up.pick(req.body)
    //check realiza as validacoes e emite o exception
    Rules.sign_up.check(input)

    const response = await this.service.sign_up(input)
    return ok(response)
  }

  async sign_in(req: Request) {
    const input = Rules.sign_in.pick({ ...req.body })
    Rules.sign_in.check(input)

    const response = await this.service.sign_in(input)
    return created(response)
  }

  async validate_token(req: Request) {
    const session = req?.session
    if (!session)
      throw new AppException('Não foi possível autenticar o token', 404)

    return ok(session)
  }
}
