import { ClinicStatus } from '@/util/enums'
import { generate_error, requestApi } from '@/util/request-api'
import { Button, Form, Modal, overlay, toaster } from '@insightcreativewebs/ui'
import Nullstack from 'nullstack'
import { Clinic_Model } from './clinic.model'
import { FormClinic } from './form'

export class ModalEditClinic extends Nullstack {
  form = null
  async populate(context: any) {
    const {
      overlay: { data: modal_data },
    } = context

    const { data, error } = await requestApi(`/clinics/${modal_data.id}`, 'get')
    if (error) {
      toaster(
        'error',
        context.project.name,
        'Não foi possivel buscar a clinica',
      )
      return
    }

    this.form.clinic_model = new Clinic_Model({
      ...data,
      status: ClinicStatus.Active === data.status,
    })
  }
  async onsubmit(context: any) {
    const {
      overlay: { key, options, data: modal_data },
    } = context

    const { data, error } = await requestApi(
      `/clinics/${modal_data.id}`,
      'put',
      {
        ...this.form.clinic_model.toJSON(),
      },
    )
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
          <Modal.Header> Editar clinica</Modal.Header>
          <Modal.Body>
            <FormClinic
              form-id="edit-clinic"
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
              <Button type="submit" form="edit-clinic">
                Salvar Plano
              </Button>
            </Form.Group>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    )
  }
}
