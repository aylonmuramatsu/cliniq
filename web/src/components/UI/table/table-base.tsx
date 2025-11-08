import Nullstack from 'nullstack'

import { twMerge } from 'tailwind-merge'

import { TableBody } from './table-body'
import { TableHeader } from './table-thead'

const defaultValues = {
  size: 'sm',
  expandable: false,
  columns: [],
  rows: [],
  loading: false,
  empty_message: 'Nenhum item encontrado.',
  loading_message: 'Carregando...',
  onrowclick: undefined,
}
export class TableBase extends Nullstack {
  render(context) {
    const {
      data: rows,
      size,
      expandable,
      columns,
      loading,
      'empty-message': empty_message,
      'loading-message': loading_message,
      onrowclick,
    } = Object.assign({}, defaultValues, context)

    const classes = [
      size === 'sm' && 'text-sm',
      size === 'md' && 'text-base',
      size === 'lg' && 'text-lg',
      'bg-white overflow-x-auto rounded-lg border border-gray-200 shadow-sm',
    ]

    return (
      <div class={classes}>
        <table class="min-w-full divide-y divide-gray-100">
          <TableHeader>
            <tr>
              {expandable && (
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12" />
              )}
              {columns.map((column) => (
                <th
                  class={`px-6 py-3 text-${column.align || 'left'
                    } text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width ? `w-${column.width}` : ''
                    }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={columns.length + (expandable ? 1 : 0)}
                  class="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {empty_message}
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td
                  colSpan={columns.length + (expandable ? 1 : 0)}
                  class="px-6 py-4 text-center text-sm text-gray-500"
                >
                  <div class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
                    <span class="ml-2">{loading_message}</span>
                  </div>
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <>
                <tr
                  class={`${expandable || onrowclick ? 'cursor-pointer hover:bg-gray-50 transition' : ''}`}
                  // onclick={({ event }) => handleRowClick(row, event)}
                  // aria-expanded={expandable ? isRowExpanded(row.id) : undefined}
                  tabindex={expandable || onrowclick ? 0 : undefined}
                >
                  {/* {expandable && (
                    <td class="px-6 py-4 whitespace-nowrap text-sm" onclick={({ event }) => handleExpand(row, event)}>
                      {!isRowExpanded(row.id) && <ChevronRight class="w-4 h-4" />}
                      {isRowExpanded(row.id) && <ChevronDown class="w-4 h-4" />}
                    </td>
                  )} */}
                  {columns.map((column) => (
                    <td
                      class={twMerge(
                        `px-6 py-4 whitespace-nowrap text-sm text-${column.align || 'left'}`,
                        column.class,
                      )}
                    >
                      {column?.content
                        ? column.content(row, context)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
                {/* {expandable && isRowExpanded(row.id) && expanded_content && (
                  <tr>
                    <td colSpan={columns.length + 1} class="bg-gray-50 px-6 py-4 text-sm text-gray-700">
                      {expanded_content(row)}
                    </td>
                  </tr>
                )} */}
              </>
            ))}
          </TableBody>
        </table>
      </div>
    )
  }
}
