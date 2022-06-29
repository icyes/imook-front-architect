import { onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import createContextMenu, { ActionItem } from '../components/createContextMenu'
const initContextMenu = () => {
  const store = useStore()
  const testActions: ActionItem[] = [
    { shortcut: 'Backspace / Delete', text: '删除图层', action: (cid) => { store.commit('deleteComponent', cid) }}
  ]

  const testActions2: ActionItem[] = [
    { shortcut: 'Ctrl+C', text: '复制配置', action: () => { console.log(2) }}
  ]
  let destory: any, destory2: any
  onMounted(() => {
    destory = createContextMenu(testActions)
    destory2 = createContextMenu(testActions2, 'settings-panel')
  })
  onUnmounted(() => {
    destory()
    destory2()
  })
}

export default initContextMenu