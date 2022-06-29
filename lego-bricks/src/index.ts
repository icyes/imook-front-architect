import { App } from 'vue'
export { textDefaultProps , textStylePropNames, TextComponentProps,
  imageDefaultProps, imageStylePropsNames, ImageComponentProps,
  shapeDefaultProps, shapeStylePropsNames, ShapeComponentProps,
  AllComponentProps
} from './defaultProps'

import LText from './components/LText'
import LImage from './components/LImage'
import LShape from './components/LShape'

const components = [
  LText,
  LImage,
  LShape
]

const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export {
  LText,
  LImage,
  LShape,
  install
}
export default {
  install
}