import { ModalConfirmDelete } from '@/components/confirm-delete'
import Table from '@/components/ui/table'
import { get_clinic_status, get_user_status } from '@/util/convert'
import { requestApi } from '@/util/request-api'
import { Badge, Button, overlay, toaster } from '@insightcreativewebs/ui'
import { useRegisterOverlay } from '@insightcreativewebs/utils'
import Nullstack, { type BaseNullstackClientContext } from 'nullstack'
import { ModalCreateUser } from '../users/create'
import { ModalEditUser } from '../users/edit'
import { ModalCreateClinic } from './create'
import { ModalEditClinic } from './edit'

export class AdminClinics extends Nullstack {
  clinics = []
  modal_create = null
  modal_edit = null
  modal_delete = null
  modal_create_user = null
  modal_edit_user = null
  modal_delete_user = null
  prepare(context: BaseNullstackClientContext<unknown>) {
    this.modal_create = useRegisterOverlay(
      '@modal/clinic/create',
      ModalCreateClinic,
      {
        onconfirm: this.load_clinics,
      },
    )
    this.modal_edit = useRegisterOverlay(
      '@modal/clinic/edit',
      ModalEditClinic,
      {
        onconfirm: this.load_clinics,
      },
    )
    this.modal_delete = useRegisterOverlay(
      '@modal/clinic/delete',
      ModalConfirmDelete,
      {
        onconfirm: this.confirm_delete,
      },
    )

    this.modal_create_user = useRegisterOverlay(
      '@modal/operator/create',
      ModalCreateUser,
      {
        onconfirm: this.load_clinics,
      },
    )
    this.modal_edit_user = useRegisterOverlay(
      '@modal/operator/edit',
      ModalEditUser,
      {
        onconfirm: this.load_clinics,
      },
    )
    this.modal_delete_user = useRegisterOverlay(
      '@modal/operator/delete',
      ModalConfirmDelete,
      {
        onconfirm: this.confirm_delete_user,
      },
    )
  }
  async initiate(context: BaseNullstackClientContext<unknown>) {
    this.load_clinics()
  }
  terminate(context: BaseNullstackClientContext<unknown>) {
    this.modal_create.unregister()
    this.modal_edit.unregister()
    this.modal_delete.unregister()
    this.modal_edit_user.unregister()
    this.modal_create_user.unregister()
    this.modal_delete_user.unregister()
  }

  create_clinic() {
    overlay.show(this.modal_create.key, {})
  }

  async confirm_delete(context: any) {
    const { error } = await requestApi(`/clinics/${context.id}`, 'delete')
    if (error)
      return toaster(
        'error',
        context.project.name,
        'Não foi possível excluir o registro.',
      )
    toaster('success', context.project.name, 'Excluido com sucesso.')
    await this.load_clinics()

    overlay.close(this.modal_delete.key)
  }
  async confirm_delete_user(context: any) {
    const { error } = await requestApi(`/users/${context.id}`, 'delete')
    if (error)
      return toaster(
        'error',
        context.project.name,
        'Não foi possível excluir o registro.',
      )
    toaster('success', context.project.name, 'Excluido com sucesso.')
    await this.load_clinics()

    overlay.close(this.modal_delete_user.key)
  }
  async load_clinics() {
    const { data, error } = await requestApi('/clinics', 'get')
    if (error) {
      toaster('error', 'Cliniq', 'Não foi possível buscar as clinicas')
      return
    }

    this.clinics = data
  }
  render() {
    return (
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <p class="text-gray-400">Gerencie as clínicas</p>
          <Button onclick={this.create_clinic}>+ Nova Clínica</Button>
        </div>
        <Table
          columns={columns}
          data={this.clinics}
          empty-message="Nenhum registro adicione um usuário"
          expandable
          expand-content={(row) => (
            <>
              <p class="text-lg mb-4">Operadores</p>
              <Table columns={columns_users} data={row.users || []} />
            </>
          )}
        />
      </div>
    )
  }
}

const columns = [
  {
    key: 'name',
    label: 'Nome da Clinica',
  },
  {
    key: 'cnpj',
    label: 'CNPJ',
  },
  {
    key: 'address',
    label: 'Endereço',
  },
  {
    key: 'city',
    label: 'Cidade',
  },
  {
    key: 'status',
    label: 'Status',
    content: (row) => {
      const status = get_clinic_status(row.status)
      return (
        <Badge size="xs" color={status.color} rounded variant="soft" dot>
          {status.label}
        </Badge>
      )
    },
  },
  {
    key: 'actions',
    label: 'Ações',
    className: 'w-[100px]',
    align: 'right',
    content: (row) => {
      const onedit = () => overlay.show('@modal/clinic/edit', { id: row.id })
      const ondelete = () =>
        overlay.show('@modal/clinic/delete', { id: row.id })

      const oncreateuser = () =>
        overlay.show('@modal/operator/create', { clinic_id: row.id })

      return (
        <div class="flex flex-row gap-2 justify-end">
          <Button type="button" variant="ghost" color="info" onclick={onedit}>
            Editar
          </Button>
          <Button
            type="button"
            variant="ghost"
            color="danger"
            onclick={ondelete}
          >
            Excluir
          </Button>
          <Button
            type="button"
            variant="ghost"
            color="success"
            onclick={oncreateuser}
          >
            Adicionar Operador
          </Button>
        </div>
      )
    },
  },
]

const columns_users = [
  {
    key: 'name',
    label: 'Nome',
  },
  {
    key: 'email',
    label: 'E-mail',
    width: 'full',
  },
  {
    key: 'status',
    label: 'Status',
    content: (row) => {
      const status = get_user_status(row.status)
      return (
        <Badge size="xs" color={status.color} rounded variant="soft" dot>
          {status.label}
        </Badge>
      )
    },
  },
  {
    key: 'actions',
    label: 'Ações',
    align: 'right',
    content: (row) => {
      const onedit = () => overlay.show('@modal/operator/edit', { id: row.id })
      const ondelete = () =>
        overlay.show('@modal/operator/delete', { id: row.id })

      return (
        <div class="flex flex-row gap-2 justify-end">
          <Button type="button" variant="ghost" color="info" onclick={onedit}>
            Editar
          </Button>
          <Button
            type="button"
            variant="ghost"
            color="danger"
            onclick={ondelete}
          >
            Excluir
          </Button>
        </div>
      )
    },
  },
]
