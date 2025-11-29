import { ErrorField } from "@/components/error-field";
import { Form, Input, InputMask, Switch } from "@insightcreativewebs/ui";
import Nullstack, { BaseNullstackClientContext } from "nullstack";
import { Clinic_Model } from "./clinic.model";

export class FormClinic extends Nullstack {
  clinic_model = new Clinic_Model()

  onsubmit(context) {
    const { onsubmit: _onsubmit } = context
    const validation = this.clinic_model.validate()
    if (!validation) {
      return
    }
    _onsubmit && _onsubmit({ data: this.clinic_model })
  }
  prepare({ ref }: BaseNullstackClientContext<unknown>) {
    if (ref) ref.object[ref.property] = this
  }

  render(context:any){
    return (
      <Form id={context['form-id']} onsubmit={this.onsubmit}>
        <Form.Group>
          <Form.Label for="name">Nome da clinica *</Form.Label>
          <Input
            placeholder="plano"
            name="name"
            id="name"
            bind={this.clinic_model.name}
            oninput={this.clinic_model.validateField as any}
          />
          <ErrorField field="name" model={this.clinic_model} />
        </Form.Group>

        <Form.Group>
          <Form.Label for="cnpj">CNPJ *</Form.Label>
          <InputMask
            mask="99.999.999/9999-99"
            name="cnpj"
            id="cnpj"
            bind={this.clinic_model.cnpj}
            oninput={this.clinic_model.validateField}
          />
          <ErrorField field="cnpj" model={this.clinic_model} />
        </Form.Group>

        <Form.Group>
          <Form.Label for="address">Endereço *</Form.Label>
          <Input
            name="address"
            id="address"
            bind={this.clinic_model.address}
            oninput={this.clinic_model.validateField}
          />
          <ErrorField field="address" model={this.clinic_model} />
        </Form.Group>

        <Form.Group>
          <Form.Label for="city">
            Cidade
          </Form.Label>
          <Input
            name="city"
            id="city"
            bind={this.clinic_model.city}
            oninput={this.clinic_model.validateField}
          />
          <ErrorField field="city" model={this.clinic_model} />
        </Form.Group>

        <Form.Group>
          <Form.Label for="status">
            Ativo?
          </Form.Label>
          <Switch
            name="status"
            id="status"
            bind={this.clinic_model.status}
            label={this.clinic_model.status ? 'Ativo' : 'Inativo'}
          />
          <ErrorField field="status" model={this.clinic_model} />
        </Form.Group>


      </Form>
    )
  }
}