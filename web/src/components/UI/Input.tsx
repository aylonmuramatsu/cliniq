import Nullstack, { NullstackClientContext } from 'nullstack'

interface InputProps {
  label?: string
  type?: string
  placeholder?: string
  value?: string
  required?: boolean
  oninput?: (context: { event: Event }) => void
  class?: string
}

class Input extends Nullstack<InputProps> {
  render({ label, type = 'text', placeholder, value, required, oninput, class: className }: NullstackClientContext<InputProps>) {
    return (
      <div class={className || ''}>
        {label && (
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span class="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          oninput={oninput}
          class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-colors"
        />
      </div>
    )
  }
}

export default Input

