import Nullstack, {
  type BaseNullstackClientContext,
  type NullstackClientContext,
  type NullstackNode,
} from 'nullstack'

import { OverlayManager, Toaster } from '@insightcreativewebs/ui'
import '../tailwind.css'
import { Router } from './util/router'
export let app: any = null

declare function Head(): NullstackNode

class Application extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.locale = 'pt-BR'
  }
  update(context: BaseNullstackClientContext<unknown>) {
    app = context
  }

  renderHead() {
    return (
      <head>
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </head>
    )
  }

  render() {
    return (
      <body class="">
        <Head />

        <Router />
        <OverlayManager />
        <Toaster position="top-right" />
      </body>
    )
  }
}

export default Application
