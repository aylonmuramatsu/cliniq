import { UserModel } from '@/database/models/user.model'
import { UserRole } from '@/utils/enums'
import {
  AppException,
  BaseService,
  type InputOf,
  prepareFilter,
} from '@insightcreativewebs/api'
import bcrypt from 'bcryptjs'
import { Rules } from './users.rules'

export class UsersService extends BaseService {
  async list_all(input: InputOf<typeof Rules.list_all>) {
    Rules.list_all.check(input)
    const { session } = this.context || {}
    //Verificamos se é um administrador fazendo essa request
    if (!session || (session && session.user.role !== UserRole.Admin))
      throw new AppException(
        'Você não possui permissão para essa operação',
        403,
      )

    const users = await UserModel.findAll({
      where: {
        role: UserRole.Operator,
      },
    })

    return users
  }

  async create(input: InputOf<typeof Rules.create>) {
    Rules.create.check(input)
    const { session } = this.context || {}
    //Verificamos se é um administrador fazendo essa request
    if (!session || (session && session.user.role !== UserRole.Admin))
      throw new AppException(
        'Você não possui permissão para essa operação',
        403,
      )

    //Preciso ver se para aquela clinica ja nao existe aquele usuario com aquele e-mail
    const where = prepareFilter(
      { email: input.email },
      {
        filters: {
          email: (value) => {
            return {
              email: value,
            }
          },
        },
        baseWhere: {
          clinic_id: input.clinic_id,
        },
      },
    )
    const user_exists = await UserModel.findOne({
      where,
    })

    if (user_exists) throw new AppException('Operador já cadastrado', 400)
    const hash_password = await bcrypt.hash(input.password, 11)

    const new_user = await UserModel.create({
      ...input,
      password: hash_password,
      password_reset: true,
    })

    //@ts-expect-error removemos o campo de password para retorna os dados (por segurança)
    delete new_user.password

    // ✨ Implementar lógica aqui
    return new_user
  }

  async populate(input: InputOf<typeof Rules.populate>) {
    Rules.populate.check(input)
    const { session } = this.context || {}
    //Verificamos se é um administrador fazendo essa request
    if (!session || (session && session.user.role !== UserRole.Admin))
      throw new AppException(
        'Você não possui permissão para essa operação',
        403,
      )

    const user = await UserModel.findByPk(input.user_id)
    if (!user) throw new AppException('Usuario não existe', 400)

    return user
  }

  async update(input: InputOf<typeof Rules.update>) {
    Rules.update.check(input)
    const { session } = this.context || {}
    //Verificamos se é um administrador fazendo essa request
    if (!session || (session && session.user.role !== UserRole.Admin))
      throw new AppException(
        'Você não possui permissão para essa operação',
        403,
      )

    const { user_id: _, password, ...values }: any = input

    let user = await UserModel.findByPk(input.user_id)
    if (!user) throw new AppException('Usuario não existe', 400)

    if (password) {
      const hash_password = await bcrypt.hash(input.password, 11)
      values.password = hash_password
      values.password_reset = true
    }
    await user.update({ ...values })
    user = await user.reload({
      attributes: ['id', 'name', 'email'],
    })
    return user
  }

  async delete(input: InputOf<typeof Rules.delete>) {
    Rules.delete.check(input)
    const { session } = this.context || {}
    //Verificamos se é um administrador fazendo essa request
    if (!session || (session && session.user.role !== UserRole.Admin))
      throw new AppException(
        'Você não possui permissão para essa operação',
        403,
      )

    const user = await UserModel.findByPk(input.user_id)
    if (!user) throw new AppException('Usuario não existe', 400)

    await user.destroy()
    return true
  }
}
