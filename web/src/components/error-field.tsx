import type { Model } from '@/util/model'
import { Alert } from '@insightcreativewebs/ui'
import Nullstack, {
  type NullstackClientContext,
  type NullstackNode,
} from 'nullstack'

interface ErrorFieldProps {
  field: string
  model: Model
}
export class ErrorField extends Nullstack<ErrorFieldProps> {
  render(context: NullstackClientContext<ErrorFieldProps>): NullstackNode {
    const errors = context.model.getErrors({field:context.field} as any)

    if (errors.length > 0)
      return (
        <Alert class="mt-2">
          <ul>
            {errors.map((e) => (
              <li>{e}</li>
            ))}
          </ul>
        </Alert>
      )
    else return false
  }
}
