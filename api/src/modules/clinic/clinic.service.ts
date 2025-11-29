import { ClinicModel } from '@/database/models/clinic.model'
import { UserModel } from '@/database/models/user.model'
import {
  AppException,
  BaseService,
  type InputOf,
} from '@insightcreativewebs/api'
import { Rules } from './clinic.rules'

export class ClinicService extends BaseService {
  async list_all(input: InputOf<typeof Rules.list_all>) {
    Rules.list_all.check(input)

    const clinics = await ClinicModel.findAll({
      include: [
        {
          model: UserModel,
          as: 'users',
        },
      ],
    })

    // ✨ Implementar lógica aqui
    return clinics
  }

  async create(input: InputOf<typeof Rules.create>) {
    Rules.create.check(input)

    const clinic_exist = await ClinicModel.findOne({
      where: {
        cnpj: input.cnpj,
      },
    })
    if (clinic_exist) throw new AppException('Clinica já cadastrada', 400)
    const new_clinic = await ClinicModel.create(input)
    return new_clinic
  }

  async populate(input: InputOf<typeof Rules.populate>) {
    Rules.populate.check(input)

    const clinic = await ClinicModel.findByPk(input.clinic_id)
    if (!clinic) throw new AppException('Clinica não existe', 400)

    return clinic
  }

  async update(input: InputOf<typeof Rules.update>) {
    Rules.update.check(input)
    const { clinic_id, ...values } = input

    const clinic = await ClinicModel.findByPk(input.clinic_id)
    if (!clinic) throw new AppException('Clinica não existe', 400)

    await clinic.update(values)
    await clinic.reload()
    return clinic
  }

  async delete(input: InputOf<typeof Rules.delete>) {
    Rules.delete.check(input)

    const clinic = await ClinicModel.findByPk(input.clinic_id)
    if (!clinic) throw new AppException('Clinica não existe', 400)

    await clinic.destroy()
    return true
  }
}
