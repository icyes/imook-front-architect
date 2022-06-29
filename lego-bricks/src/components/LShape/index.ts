import { App } from 'vue'
import LShape from './LShape.vue'
LShape.install = (app: App) => {
  app.component(LShape.name, LShape)
}

export default LShape