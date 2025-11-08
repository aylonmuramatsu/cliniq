import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack'

interface TableProps {
  headers: string[]
  children: NullstackNode
  class?: string
}

class Table extends Nullstack<TableProps> {
  render({ headers, children, class: className }: NullstackClientContext<TableProps>) {
    return (
      <div class={`overflow-x-auto ${className || ''}`}>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-800 border-b border-gray-700">
              {headers.map((header) => (
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-300">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">{children}</tbody>
        </table>
      </div>
    )
  }
}

export default Table

