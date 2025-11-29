import { PlanModel } from '@/database/models/plan.model'
import { PlanStatus } from '@/utils/enums'
import {
  AppException,
  BaseService,
  type InputOf,
} from '@insightcreativewebs/api'
import { Rules } from './plan.rules'

export class PlanService extends BaseService {
  async list_all(input: InputOf<typeof Rules.list_all>) {
    Rules.list_all.check(input)

    const plans = await PlanModel.findAll({})
    return plans
  }

  async create(input: InputOf<typeof Rules.create>) {
    Rules.create.check(input)

    const new_plan = await PlanModel.create(input)
    return new_plan
  }

  async populate(input: InputOf<typeof Rules.populate>) {
    Rules.populate.check(input)

    const plan = await PlanModel.findByPk(input.plan_id)
    if (!plan) throw new AppException('Clinica não existe', 400)

    return plan
  }

  async update(input: InputOf<typeof Rules.update>) {
    Rules.update.check(input)
    const { plan_id, ...values } = input

    const plan = await PlanModel.findByPk(plan_id)
    if (!plan) throw new AppException('Clinica não existe', 400)

    await plan.update(values)
    await plan.reload()
    return plan
  }

  async delete(input: InputOf<typeof Rules.delete>) {
    Rules.delete.check(input)

    const plan = await PlanModel.findByPk(input.plan_id)
    if (!plan) throw new AppException('Clinica não existe', 400)

    await plan.destroy()
    return true
  }

  async change_status(input: InputOf<typeof Rules.change_status>) {
    Rules.change_status.check(input)

    const plan = await PlanModel.findByPk(input.plan_id)
    if (!plan) throw new AppException('Clinica não existe', 400)

    await plan.update({
      status:
        plan.status === PlanStatus.Active
          ? PlanStatus.Inactive
          : PlanStatus.Active,
    })
    return true
  }
}
