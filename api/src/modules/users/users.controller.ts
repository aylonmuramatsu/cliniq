import { BaseController, created, ok } from '@insightcreativewebs/api'
import type { Request } from 'express'
import { Rules } from './users.rules'
import { UsersService } from './users.service'

export class UsersController extends BaseController {
  private service = new UsersService()

  async list_all(req: Request) {
    //o pick faz o sanitize dos campos conforme o schema
    const input = Rules.list_all.pick({ ...req.query })
    //check realiza as validacoes e emite o exception
    Rules.list_all.check(input)

    const response = await this.service
      //Passo uma informação extra, sem afetar os parametros do service
      .withContext({ session: req.session })
      .list_all(input)
    return ok(response)
  }

  async create(req: Request) {
    const input = Rules.create.pick({ ...req.body })
    Rules.create.check(input)

    const response = await this.service
      .withContext({ session: req.session })
      .create(input)
    return created(response)
  }

  async populate(req: Request) {
    const input = Rules.populate.pick({ user_id: req.params.id })
    Rules.populate.check(input)

    const response = await this.service
      .withContext({ session: req.session })
      .populate(input)
    return ok(response)
  }

  async update(req: Request) {
    const input = Rules.update.pick({ user_id: req.params.id, ...req.body })
    Rules.populate.check(input)

    const response = await this.service
      .withContext({ session: req.session })
      .update(input)
    return ok(response)
  }

  async delete(req: Request) {
    const input = Rules.delete.pick({ user_id: req.params.id })
    Rules.delete.check(input)

    const response = await this.service
      .withContext({ session: req.session })
      .delete(input)
    return ok(response)
  }
}
