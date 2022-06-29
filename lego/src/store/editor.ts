import { Module, Mutation } from 'vuex'
import { message } from 'ant-design-vue'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import store, { GlobalDataProps, actionWrapper } from './index'
import { insertAt } from '../helper'
import { AllComponentProps, textDefaultProps, imageDefaultProps } from 'lego-bricks'
import { RespWorkData, ListData, RespData, RespListData } from './respTypes'
export type MoveDirection = 'Up' | 'Down' | 'Left' | 'Right'

export interface HistoryProps {
  id: string;
  componentId: string;
  type: 'add' | 'delete' | 'modify';
  data: any;
  index?: number;
}
export interface UpdateComponentData {
  key: keyof AllComponentProps | Array<keyof AllComponentProps>;
  value: string | string[];
  id: string;
  isRoot?: boolean;
}
export interface ChannelProps {
  id: number;
  name: string;
  workId: number;
  status: number;
}
export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[];
  // 当前编辑的是哪个元素，uuid
  currentElement: string;
  // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
  page: PageData;
  // 当前被复制的组件
  copiedComponent?: ComponentData;
  // 当前操作的历史记录
  histories: HistoryProps[];
  // 当前历史记录的操作位置
  historyIndex: number;
  // 开始更新时的缓存值
  cachedOldValues: any;
  // 保存最多历史条目记录数
  maxHistoryNumber: number;
  // 数据是否有修改
  isDirty: boolean;
  // 当前 work 的 channels
  channels: ChannelProps[];
}
export interface PageProps {
  backgroundColor: string;
  backgroundImage: string;
  backgroundRepeat: string;
  backgroundSize: string;
  height: string;
}
export type AllFormProps = PageProps & AllComponentProps
export interface PageData {
  id?: number;
  props?: PageProps;
  title?: string;
  desc?: string;
  coverImg?: string;
  uuid?: string;
  setting?: { [key: string]: any };
  isTemplate?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  author?: string;
  copiedCount?: number;
  status?: number;
  user? : {
    gender: string;
    nickName: string;
    picture: string;
    userName: string;
  };
}
export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: Partial<AllComponentProps>;
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 l-text，l-image 等等 
  name: 'l-text' | 'l-image' | 'l-shape';
  // 图层是否隐藏
  isHidden?: boolean;
  // 图层是否锁定
  isLocked?: boolean;
  // 图层名称
  layerName?: string;
}
export const testComponents: ComponentData[] = [
  { id: uuidv4(), name: 'l-text', layerName:'图层1', props: { ...textDefaultProps, text: 'hello', fontSize: '20px', color: '#000000', 'lineHeight': '1', textAlign: 'left', fontFamily: '', width: '100px', height: '100px', backgroundColor: '#efefef', left: '100px', top: '150px' }},
  // { id: uuidv4(), name: 'l-text', layerName:'图层2', props: { ...textDefaultProps, text: 'hello2', fontSize: '10px', fontWeight: 'bold', 'lineHeight': '2', textAlign: 'left', fontFamily: '' }},
  // { id: uuidv4(), name: 'l-text', layerName:'图层3', props: { ...textDefaultProps, text: 'hello3', fontSize: '15px', actionType: 'url', url: 'https://www.baidu.com', 'lineHeight': '3', textAlign: 'left', fontFamily: '' }},
  // { id: uuidv4(), name: 'l-image', layerName:'图层4', props: { ...imageDefaultProps, src: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg', width: '100px' }},
]
const pageDefaultProps = { backgroundColor: '#ffffff', backgroundImage: '', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '560px' }
const debounceChange = (callback: (...args: any) => void, timeout = 1000) => {
  let timer = 0
  return (...args: any) => {
    console.log(timer)
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      timer = 0
      callback(...args)
    }, timeout) 
  }
}
const pushHistory = (state: EditorProps, historyRecord: HistoryProps) => {
  // check historyIndex is already moved
  if (state.historyIndex !== -1) {
    // if moved, delete all the records greater than the index
    state.histories = state.histories.slice(0, state.historyIndex)
    // move historyIndex to unmoved
    state.historyIndex = -1
  }
  // check length 
  if (state.histories.length < state.maxHistoryNumber) {
    state.histories.push(historyRecord)
  } else {
    // larger than max number
    // shift the first
    // push to last
    state.histories.shift()
    state.histories.push(historyRecord)
  }
}
const pushModifyHistory = (state: EditorProps, { key, value, id }: UpdateComponentData) => {
  pushHistory(state, {
    id: uuidv4(),
    componentId: (id || state.currentElement),
    type: 'modify',
    data: { oldValue: state.cachedOldValues, newValue: value, key }
  })
  state.cachedOldValues = null
}
const pushHistoryDebounce = debounceChange(pushModifyHistory)

const modifyHistory = (state: EditorProps, history: HistoryProps, type: 'undo' | 'redo') => {
  const { componentId, data } = history
  const { key, oldValue, newValue } = data
  const newKey = key as keyof AllComponentProps | Array<keyof AllComponentProps>
  const updatedComponent = state.components.find((component) => component.id === componentId)
  if (updatedComponent) {
    // check if key is array
    if (Array.isArray(newKey)) {
      newKey.forEach((keyName, index) => {
        updatedComponent.props[keyName] = type === 'undo' ? oldValue[index] : newValue[index]
      })
    } else {
      updatedComponent.props[newKey] = type === 'undo' ? oldValue : newValue
    }
  }
}
const setDirtyWrapper = (callback: Mutation<EditorProps>) => {
  return (state: EditorProps, payload: any) => {
    state.isDirty = true
    callback(state, payload)
  }
}
const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: '',
    page: {
      props: pageDefaultProps,
      title: 'test title'
    },
    histories: [],
    historyIndex: -1,
    cachedOldValues: null,
    maxHistoryNumber: 5,
    isDirty: false,
    channels: []
  },
  mutations: {
    resetEditor(state) {
      state.components = []
      state.currentElement = ''
      state.historyIndex = -1
      state.histories = []
    },
    addComponent: setDirtyWrapper((state, component: ComponentData) => {
      component.layerName = '图层' + (state.components.length + 1)
      state.components.push(component)
      pushHistory(state, {
        id: uuidv4(),
        componentId: component.id,
        type: 'add',
        data: cloneDeep(component)
      })
    }),
    setActive(state, currentId: string) {
      state.currentElement = currentId
    },
    undo(state) {
      // never undo before
      if (state.historyIndex === -1) {
        // undo the last item of the array
        state.historyIndex = state.histories.length - 1
      } else {
        // undo to the previous step
        state.historyIndex--
      }
      // get the history record
      const history = state.histories[state.historyIndex]
      switch (history.type) {
        case 'add':
          // if create a component, we should remove it
          state.components = state.components.filter(component => component.id !== history.componentId)
          break
        case 'delete':
          // if delete a component, we should restore it to the right position
          state.components = insertAt(state.components, history.index as number, history.data)
          break
        case 'modify': {
          // get the modified component by id, restore to the old value
          modifyHistory(state, history, 'undo')
          break
        }
        default:
          break
      }
    },
    redo (state) {
      // can't redo when historyIndex is the last item or historyIndex is never moved
      if (state.historyIndex === -1) {
        return
      }
      // get the record
      const history = state.histories[state.historyIndex]
      // process the history data
      switch (history.type) {
        case 'add':
          state.components.push(history.data)
          // state.components = insertAt(state.components, history.index as number, history.data)
          break
        case 'delete':
          state.components = state.components.filter(component => component.id !== history.componentId)
          break
        case 'modify': {
          modifyHistory(state, history, 'redo')
          break
        }
        default:
          break
      }
      state.historyIndex++
    },
    copyComponent(state, id) {
      const currentComponent = store.getters.getElement(id)
      if (currentComponent) {
        state.copiedComponent = currentComponent
        message.success('已拷贝当前图层', 1)
      }
    },
    pasteCopiedComponent: setDirtyWrapper((state) => {
      if (state.copiedComponent) {
        const clone = cloneDeep(state.copiedComponent)
        clone.id = uuidv4()
        clone.layerName = clone.layerName + '副本'
        state.components.push(clone)
        message.success('已黏贴当前图层', 1)
        pushHistory(state, {
          id: uuidv4(),
          componentId: clone.id,
          type: 'add',
          data: cloneDeep(clone)
        })
      }
    }),
    deleteComponent: setDirtyWrapper((state, id) => {
      const currentComponent = state.components.find((component) => component.id === id)
      if (currentComponent) {
        const currentIndex = state.components.findIndex((component) => component.id === id)
        state.components = state.components.filter(component => component.id !== id)
        pushHistory(state, {
          id: uuidv4(),
          componentId: currentComponent.id,
          type: 'delete',
          data: currentComponent,
          index: currentIndex
        })
        message.success('删除当前图层成功', 1)
      }
    }),
    moveComponent(state, data: { direction: MoveDirection; amount: number; id: string }) {
      const currentComponent = state.components.find((component) => component.id === data.id)
      if (currentComponent) {
        const oldTop = parseInt(currentComponent.props.top || '0')
        const oldLeft = parseInt(currentComponent.props.left || '0')
        const { direction, amount } = data
        switch (direction) {
          case 'Up': {
            const newValue = oldTop - amount + 'px'
            store.commit('updateComponent', { key: 'top', value: newValue, id: data.id })
            break
          }
          case 'Down': {
            const newValue = oldTop + amount + 'px'
            store.commit('updateComponent', { key: 'top', value: newValue, id: data.id })
            break
          }
          case 'Left': {
            const newValue = oldLeft - amount + 'px'
            store.commit('updateComponent', { key: 'left', value: newValue, id: data.id })
            break
          }
          case 'Right': {
            const newValue = oldLeft + amount + 'px'
            store.commit('updateComponent', { key: 'left', value: newValue, id: data.id })
            break
          }

          default:
            break
        }
      }
    },
    updateComponent: setDirtyWrapper((state, { key, value, id, isRoot }: UpdateComponentData) => {
      const updatedComponent = state.components.find((component) => component.id === (id || state.currentElement))
      if (updatedComponent) {
        if (isRoot) {
          // https://github.com/microsoft/TypeScript/issues/31663
          (updatedComponent as any)[key as string] = value
        } else {
          const oldValue = Array.isArray(key) ? key.map(key => updatedComponent.props[key]) : updatedComponent.props[key]
          if (!state.cachedOldValues) {
            state.cachedOldValues = oldValue
          }
          pushHistoryDebounce(state,  { key, value, id })
          if (Array.isArray(key) && Array.isArray(value)) {
            key.forEach((keyName, index) => {
              updatedComponent.props[keyName] = value[index]
            })
          } else if (typeof key ==='string' && typeof value === 'string') {
            updatedComponent.props[key] = value
          }
        }
        
      }
    }),
    updatePage: setDirtyWrapper((state, { key, value, isRoot, isSetting }) => {
      if (isRoot) {
        state.page[key as keyof PageData] = value
      } else if (isSetting) {
        debugger
        state.page.setting = {
          ...state.page.setting,
          [key]: value
        }
      } else {
        if (state.page.props) {
          state.page.props[key as keyof PageProps] = value
        }
      }
    }),
    fetchWork(state, { data }: RespWorkData) {
      const { content, ...rest } = data
      state.page = { ...state.page, ...rest }
      if (content.props) {
        state.page.props = content.props
      }
      state.components = content.components
    },
    saveWork(state) {
      state.isDirty = false
    },
    fetchChannels(state, { data }: RespListData<ChannelProps>) {
      state.channels = data.list
    },
    createChannel(state, { data }: RespData<ChannelProps>) {
      state.channels = [ ...state.channels, data]
    },
    deleteChannel(state, { payload }: RespData<any>) {
      if (payload && payload.urlParams) {
        const { urlParams } = payload
        state.channels = state.channels.filter(channel => channel.id !== urlParams.id)
      }
    }
  },
  actions: {
    fetchWork: actionWrapper('/works/:id', 'fetchWork'),
    saveWork: actionWrapper('/works/:id', 'saveWork', { method: 'patch' }),
    publishWork: actionWrapper('/works/publish/:id', 'publishWork', { method: 'post'}),
    fetchChannels: actionWrapper('/channel/getWorkChannels/:id', 'fetchChannels'),
    createChannel: actionWrapper('/channel/', 'createChannel', { method: 'post'}),
    deleteChannel: actionWrapper('/channel/:id', 'deleteChannel', { method: 'delete'})
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find((component) => component.id === state.currentElement)
    },
    getElement: (state) => (id: string) => {
      return state.components.find((component) => component.id === (id || state.currentElement))
    },
    getComponentsLength: (state) => {
      return state.components.length
    },
    checkUndoDisable: (state) => {
      // 1 no history item
      // 2 move to the first item
      if (state.histories.length === 0 || state.historyIndex === 0) {
        return true
      }
      return false
    },
    checkRedoDisable: (state) => {
      // 1 no history item
      // 2 move to the last item
      // 3 never undo before
      if (state.histories.length === 0 || 
        state.historyIndex === state.histories.length ||
        state.historyIndex === -1) {
        return true
      }
      return false      
    }
  }
}

export default editor
