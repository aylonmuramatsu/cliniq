import { UserModel } from '@/database/models/user.model'
import { UserStatus } from '@/utils/enums'
import { session } from '@/utils/session'
import {
  AppException,
  BaseService,
  type InputOf,
} from '@insightcreativewebs/api'
import bcrypt from 'bcryptjs'
import { Rules } from './authentication.rules'

export class AuthenticationService extends BaseService {
  async sign_up(input: InputOf<typeof Rules.sign_up>) {
    Rules.sign_up.check(input)

    const user_exists = await UserModel.findOne({
      where: {
        email: input.email,
      },
    })
    if (user_exists) throw new AppException('Usuário já cadastrado', 400)
    const hash_password = await bcrypt.hash(input.password, 11)
    const new_user = await UserModel.create({
      ...input,
      password: hash_password,
    })

    const new_session = await session.generate(new_user.id)
    return new_session
  }

  async sign_in(input: InputOf<typeof Rules.sign_in>) {
    Rules.sign_in.check(input)

    const user = await UserModel.findOne({
      where: {
        email: input.email,
        status: UserStatus.Active,
      },
    })

    if (!user) throw new AppException('Usuário não cadastrado', 400)
    if (user.status === UserStatus.Inactive)
      throw new AppException('Usuário bloqueado', 400)
    const validate_password = await bcrypt.compare(
      input.password,
      user.password,
    )

    if (!validate_password)
      throw new AppException('Usuário/Senha incorreto', 400)

    const new_session = await session.generate(user.id)

    return new_session
  }
}
