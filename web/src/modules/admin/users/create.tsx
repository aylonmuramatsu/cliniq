import { generate_error, requestApi } from '@/util/request-api'
import { Button, Form, Modal, overlay, toaster } from '@insightcreativewebs/ui'
import Nullstack from 'nullstack'
import { FormUser } from './form'

const form_name = 'create-user'
export class ModalCreateUser extends Nullstack {
  form = null
  async onsubmit(context: any) {
    const {
      overlay: { key, data: modal_data, options },
    } = context

    const { clinic_id } = modal_data
    const { _, error } = await requestApi('/users', 'post', {
      ...this.form.user_model.toJSON(),
      clinic_id,
    })
    if (error) {
      toaster('error', context.project.name, generate_error(error))
      return
    }
    toaster('success', context.project.name, 'cadastrado com sucesso!')
    overlay.close(key)
    options?.onconfirm && options?.onconfirm()
  }
  render(context: any) {
    const {
      overlay: { visible, key },
    } = context
    if (!visible) return false
    return (
      <Modal visible={visible}>
        <Modal.Dialog>
          <Modal.Header> Novo operador</Modal.Header>
          <Modal.Body>
            <FormUser
              form-id={form_name}
              ref={this.form}
              onsubmit={this.onsubmit}
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
                Criar Operador
              </Button>
            </Form.Group>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    )
  }
}
