import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack'

interface CardProps {
  title?: string
  children: NullstackNode
  class?: string
}

class Card extends Nullstack<CardProps> {
  render({ title, children, class: className }: NullstackClientContext<CardProps>) {
    return (
      <div
        class={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-4 ${className || ''}`}
      >
        {title && (
          <h3 class="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
            {title}
          </h3>
        )}
        <div class="text-gray-700">{children}</div>
      </div>
    )
  }
}

export default Card

