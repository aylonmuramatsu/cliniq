import { ErrorField } from '@/components/error-field'
import {
  CurrencyInput,
  Form,
  Input,
  InputMask,
  TextArea,
} from '@insightcreativewebs/ui'
import Nullstack, { type BaseNullstackClientContext } from 'nullstack'
import { Plan_Model } from './plan.model'

export class FormPlan extends Nullstack {
  plan_model = new Plan_Model()
  onsubmit(context) {
    const { onsubmit: _onsubmit } = context
    const validation = this.plan_model.validate()
    if (!validation) {
      return
    }
    _onsubmit && _onsubmit({ data: this.plan_model })
  }
  prepare({ ref }: BaseNullstackClientContext<unknown>) {
    if (ref) ref.object[ref.property] = this
  }
  render(context: any) {
    return (
      <Form id={context['form-id']} onsubmit={this.onsubmit}>
        <Form.Group>
          <Form.Label for="name">Nome do Plano *</Form.Label>
          <Input
            placeholder="plano"
            name="name"
            id="name"
            bind={this.plan_model.name}
            oninput={this.plan_model.validateField as any}
          />
          <ErrorField field="name" model={this.plan_model} />
        </Form.Group>

        <Form.Group>
          <Form.Label for="price">Mensalidade (R$) *</Form.Label>
          <CurrencyInput
            name="price"
            id="price"
            bind={this.plan_model.price}
            oninput={this.plan_model.validate}
          />
          <ErrorField field="price" model={this.plan_model} />
        </Form.Group>

        <Form.Group>
          <Form.Label for="waiting_period">Carência (dias) *</Form.Label>
          <InputMask
            mask={'999'}
            name="waiting_period"
            id="waiting_period"
            bind={this.plan_model.waiting_period}
            oninput={this.plan_model.validate}
          />
          <ErrorField field="waiting_period" model={this.plan_model} />
        </Form.Group>

        <Form.Group>
          <Form.Label for="included_procedures">
            Procedimentos Incluídos *
          </Form.Label>
          <TextArea
            rows={6}
            placeholder="Liste os procedimentos cobertos pelo plano..."
            name="included_procedures"
            id="included_procedures"
            bind={this.plan_model.included_procedures}
            oninput={this.plan_model.validate}
          />
          <ErrorField field="included_procedures" model={this.plan_model} />
        </Form.Group>
      </Form>
    )
  }
}
