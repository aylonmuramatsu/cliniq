import { ClinicStatus } from '@/util/enums'
import { to_number } from '@/util/helper'
import { generate_error, requestApi } from '@/util/request-api'
import { Button, Form, Modal, overlay, toaster } from '@insightcreativewebs/ui'
import Nullstack from 'nullstack'
import { FormPlan } from './form'
import { Plan_Model } from './plan.model'

const form_name = 'edit-plan'
export class ModalEditPlan extends Nullstack {
  form = null
  async populate(context: any) {
    const {
      overlay: { data: modal_data },
    } = context

    const { data, error } = await requestApi(`/plans/${modal_data.id}`, 'get')
    if (error) {
      toaster('error', context.project.name, 'Não foi possivel buscar a planos')
      return
    }
    this.form.plan_model = new Plan_Model({
      ...data,
      price: to_number(data.price, 0),
      status: ClinicStatus.Active === data.status,
    })
    this.form.plan_model.is_editing = true
  }
  async onsubmit(context: any) {
    const {
      overlay: { key, options, data: modal_data },
    } = context

    const { data, error } = await requestApi(`/plans/${modal_data.id}`, 'put', {
      ...this.form.plan_model.toJSON(),
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
          <Modal.Header> Editar clinica</Modal.Header>
          <Modal.Body>
            <FormPlan
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
                Salvar Plano
              </Button>
            </Form.Group>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    )
  }
}
