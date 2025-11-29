import Table from '@/components/ui/table'
import { get_plan_status } from '@/util/convert'
import { to_money, to_number } from '@/util/helper'
import { requestApi } from '@/util/request-api'
import { Badge, Button, overlay, toaster } from '@insightcreativewebs/ui'
import { useRegisterOverlay } from '@insightcreativewebs/utils'
import Nullstack, { type BaseNullstackClientContext } from 'nullstack'
import { PlanStatus } from '../../../../../api/src/utils/enums'
import { ModalCreatePlan } from './create'
import { ModalEditPlan } from './edit'

const columns = [
  {
    key: 'name',
    label: 'Nome',
    width: 'full',
    content: (row) => <div class="font-medium text-gray-900">{row.name}</div>,
  },
  {
    key: 'price',
    label: 'Mensalidade',
    content: (row) => (
      <div class="text-sm text-gray-900 font-semibold">
        {to_money(to_number(row.price, 0))}
      </div>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    content: (row) => {
      const status = get_plan_status(row.status)
      return (
        <Badge size="xs" color={status.color} rounded variant="soft" dot>
          {status.label}
        </Badge>
      )
    },
  },
  {
    key: 'beneficiarios',
    label: 'Beneficiários',
    content: (row) => (
      <div class="text-sm text-gray-600">{to_number(row?.patients, 0)}</div>
    ),
  },
  {
    key: 'acoes',
    label: 'Ações',
    align: 'right',
    content: (row, context) => {
      const onedit = () => overlay.show('@modal/plan/edit', { id: row.id })
      const onchangestatus = async () => {
        const { data, error } = await requestApi(
          `/plans/${row.id}/status`,
          'put',
        )
        if (error) {
          toaster(
            'error',
            context.project.name,
            'Não foi possível alterar o status',
          )
          return
        }
        context.onrefresh && context.onrefresh()
      }
      return (
        <div class="flex items-center gap-2 justify-end">
          <Button color="info" variant="ghost" onclick={onedit}>
            Editar
          </Button>
          <Button color="danger" variant="ghost" onclick={onchangestatus}>
            {row.status === PlanStatus.Active ? 'Desativar' : 'Ativar'}
          </Button>
        </div>
      )
    },
  },
]
export class AdminPlan extends Nullstack {
  modal_create = null
  modal_edit = null
  plans = []

  prepare(context: BaseNullstackClientContext<unknown>) {
    this.modal_create = useRegisterOverlay(
      '@modal/plan/create',
      ModalCreatePlan,
      {
        onconfirm: this.load_plans,
      },
    )

    this.modal_edit = useRegisterOverlay('@modal/plan/edit', ModalEditPlan, {
      onconfirm: this.load_plans,
    })
  }

  async initiate(context: BaseNullstackClientContext<unknown>) {
    this.load_plans({})
  }

  create_plan() {
    overlay.show(this.modal_create.key, {})
  }

  async confirm_delete(context: any) {}

  async load_plans(context: any) {
    const { data, error } = await requestApi('/plans', 'get')
    if (error) {
      toaster(
        'error',
        context.project.name,
        'Não foi possível buscar as clinicas',
      )
      return
    }

    this.plans = data
  }
  render() {
    return (
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <p class="text-gray-400">Gerencie os planos de saúde disponíveis</p>
          <Button onclick={this.create_plan}>+ Criar Plano</Button>
        </div>
        <Table
          columns={columns}
          data={this.plans}
          onrefresh={this.load_plans}
        />
      </div>
    )
  }
}
