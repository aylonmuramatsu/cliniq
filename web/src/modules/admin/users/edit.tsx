import { UserStatus } from '@/util/enums'
import { generate_error, requestApi } from '@/util/request-api'
import { Button, Form, Modal, overlay, toaster } from '@insightcreativewebs/ui'
import Nullstack from 'nullstack'
import { FormUser } from './form'
import { User_Model } from './user.model'

const form_name = 'edit-user'
export class ModalEditUser extends Nullstack {
  form = null
  async populate(context: any) {
    const {
      overlay: { data: modal_data },
    } = context

    const { data, error } = await requestApi(`/users/${modal_data.id}`, 'get')
    if (error) {
      toaster(
        'error',
        context.project.name,
        'Não foi possivel buscar o operador',
      )
      return
    }
    //adiciono esse timeout para acessar o form que vai estar disponivel no proximo render.
    this.form.user_model = new User_Model({
      ...data,
      status: UserStatus.Active === data.status,
      password: null,
    })
    this.form.user_model.is_editing = true
  }
  async onsubmit(context: any) {
    const {
      overlay: { key, options, data: modal_data },
    } = context

    const { data, error } = await requestApi(`/users/${modal_data.id}`, 'put', {
      ...this.form.user_model.toJSON(),
    })
    if (error) {
      toaster('error', context.project.name, generate_error(error))
      return
    }
    toaster('success', context.project.name, 'alterado com sucesso!')
    overlay.close(key)
    options?.onconfirm && options?.onconfirm()
  }
  onshow() {
    this.populate({})
  }

  render(context: any) {
    const {
      overlay: { visible, key },
    } = context

    return (
      <Modal visible={visible}>
        <Modal.Dialog>
          <Modal.Header> Editar Operador</Modal.Header>
          <Modal.Body>
            <FormUser
              form-id={form_name}
              ref={this.form}
              onsubmit={this.onsubmit}
              is-editing
            />
          </Modal.Body>

          <Modal.Footer>
            <Form.Group class="flex gap-3 justify-end">
              <Button
                type="button"
                variant="secondary"
                onclick={() => overlay.close(key)}
              >
                Cancelar
              </Button>
              <Button type="submit" form={form_name}>
                Salvar Operador
              </Button>
            </Form.Group>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    )
  }
}
