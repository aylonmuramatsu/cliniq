import { UserRole } from '@/utils/enums'
import {
  AppException,
  BaseController,
  created,
  ok,
} from '@insightcreativewebs/api'
import type { Request } from 'express'
import { Rules } from './plan.rules'
import { PlanService } from './plan.service'

export class PlanController extends BaseController {
  private service = new PlanService()

  async list_all(req: Request) {
    //o pick faz o sanitize dos campos conforme o schema
    const input = Rules.list_all.pick({ user_id: req.user_id })
    //check realiza as validacoes e emite o exception
    Rules.list_all.check(input)

    const response = await this.service.list_all(input)
    return ok(response)
  }

  async create(req: Request) {
    const input = Rules.create.pick({ ...req.body, user_id: req.user_id })
    Rules.create.check(input)

    if (req.session.user?.role !== UserRole.Admin) {
      throw new AppException('Você não possui permissão.', 403)
    }

    const response = await this.service.create(input)
    return created(response)
  }

  async populate(req: Request) {
    const input = Rules.populate.pick({ plan_id: req.params.id })
    Rules.populate.check(input)

    const response = await this.service.populate(input)
    return ok(response)
  }

  async update(req: Request) {
    const input = Rules.update.pick({ plan_id: req.params.id, ...req.body })
    Rules.populate.check(input)

    const response = await this.service.update(input)
    return ok(response)
  }

  async delete(req: Request) {
    const input = Rules.delete.pick({ plan_id: req.params.id })
    Rules.delete.check(input)

    const response = await this.service.delete(input)
    return ok(response)
  }

  async change_status(req: Request) {
    const input = Rules.change_status.pick({ plan_id: req.params.id })
    Rules.change_status.check(input)

    const response = await this.service.change_status(input)
    return ok(response)
  }
}
