import { ErrorField } from '@/components/error-field'
import { Alert, Form, Input, Switch } from '@insightcreativewebs/ui'
import Nullstack, { type BaseNullstackClientContext } from 'nullstack'
import { User_Model } from './user.model'

export class FormUser extends Nullstack {
  user_model = new User_Model()
  onsubmit(context) {
    const { onsubmit: _onsubmit } = context
    const validation = this.user_model.validate()
    if (!validation) {
      return
    }
    _onsubmit && _onsubmit({ data: this.user_model })
  }
  prepare({ ref }: BaseNullstackClientContext<unknown>) {
    if (ref) ref.object[ref.property] = this
  }
  render(context: any) {
    return (
      <Form id={context['form-id']} onsubmit={this.onsubmit}>
        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Input
            name="name"
            id="name"
            bind={this.user_model.name}
            oninput={this.user_model.validateField}
          />
          <ErrorField field="name" model={this.user_model} />
        </Form.Group>

        <Form.Group>
          <Form.Label>E-mail</Form.Label>
          <Input
            name="email"
            id="email"
            bind={this.user_model.email}
            oninput={this.user_model.validateField}
          />
          <ErrorField field="email" model={this.user_model} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Senha</Form.Label>
          <Input
            name="password"
            id="password"
            type="password"
            bind={this.user_model.password}
            oninput={this.user_model.validateField}
          />
          <ErrorField field="password" model={this.user_model} />
          <Alert color="info" class="mt-2">
            Essa senha será alterada pelo usuário no primeiro acesso.
          </Alert>
        </Form.Group>
        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Switch
            name="status"
            id="status"
            type="status"
            bind={this.user_model.status}
          />
          <ErrorField field="status" model={this.user_model} />
        </Form.Group>
      </Form>
    )
  }
}
