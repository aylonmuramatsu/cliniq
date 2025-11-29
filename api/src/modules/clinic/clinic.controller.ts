import { BaseController, created, ok } from '@insightcreativewebs/api';
import { Request } from 'express';
import { Rules } from './clinic.rules';
import { ClinicService } from './clinic.service';

export class ClinicController extends BaseController {
  private service = new ClinicService();

  async list_all(req: Request) {
    //o pick faz o sanitize dos campos conforme o schema
    const input = Rules.list_all.pick({ ...req.query });
    //check realiza as validacoes e emite o exception
    Rules.list_all.check(input);
    
    const response = await this.service.list_all(input);
    return ok(response);
  }

  async create(req: Request) {
    const input = Rules.create.pick({ ...req.body });
    Rules.create.check(input);
    
    const response = await this.service.create(input);
    return created(response);
  }

  async populate(req: Request){
    const input = Rules.populate.pick({ clinic_id: req.params.id })
    Rules.populate.check(input);

    const response = await this.service.populate(input);
    return ok(response)
  }

  async update(req: Request){
    const input = Rules.update.pick({ clinic_id: req.params.id , ...req.body })
    Rules.populate.check(input);

    const response = await this.service.update(input);
    return ok(response)
  }

  async delete(req: Request){
    const input = Rules.delete.pick({ clinic_id: req.params.id}) 
    Rules.delete.check(input)

    const response = await this.service.delete(input)
    return ok(response)
  }
}
