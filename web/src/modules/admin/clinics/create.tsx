import { generate_error, requestApi } from '@/util/request-api'
import { Button, Form, Modal, overlay, toaster } from '@insightcreativewebs/ui'
import Nullstack from 'nullstack'
import { FormClinic } from './form'

export class ModalCreateClinic extends Nullstack {
  form = null
  async onsubmit(context: any) {
    const {
      overlay: { key, options },
    } = context

    const { data, error } = await requestApi('/clinics', 'post', {
      ...this.form.clinic_model.toJSON(),
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
          <Modal.Header> Nova clinica</Modal.Header>
          <Modal.Body>
            <FormClinic
              form-id={'create-clinic'}
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
              <Button type="submit" form="create-clinic">
                Criar Plano
              </Button>
            </Form.Group>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    )
  }
}
