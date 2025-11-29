import Nullstack from 'nullstack'

import { Button, LucideIcons, Modal, overlay } from '@insightcreativewebs/ui'
import { jsToCss } from '@insightcreativewebs/utils'

export class ModalConfirmDelete extends Nullstack {

  onclose(context: any) {
    const {
      overlay: { key },
    } = context

    overlay.close(key)
  }

  handle_confirm(context: any) {
    const {
      overlay: { key, data, options },
    } = context

    options?.onconfirm && options.onconfirm(data)
  }

  render(context: any) {
    const {
      title,
      message,
      overlay: { visible, order, key, options },
    } = context
    if (!visible) return false

    return (
      <Modal
        visible={visible}
        modal-id={key}
        style={jsToCss({
          zIndex: 11 + order,
        })}
      >
        <Modal.Dialog>
          <Modal.Header>
            {' '}
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div>
                  <h2 class="text-lg font-bold">{options?.title || 'Confirme a exclusão'}</h2>
                </div>
              </div>
              <Button
                color="danger"
                variant="ghost"
                onclick={() => {
                  overlay.close(key)
                }}
              >
                <LucideIcons.X class="w-4 h-4" />
              </Button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div class="w-full flex">
              <div class="text-gray-700 text-base py-2">
                {message ? (
                  message
                ) : (
                  <>Tem certeza que deseja excluir este registro? Esta ação não poderá ser desfeita.</>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div class="flex w-full items-center justify-end  gap-4">
              <Button variant="ghost" onclick={this.onclose}>
                Cancelar
              </Button>
              <Button variant="solid" color="danger" onclick={this.handle_confirm}>
                Confirmar
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    )
  }

}
