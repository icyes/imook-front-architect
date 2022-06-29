import store from '@/store/index'
import { testData } from '@/store/templates'
import { testComponents, ComponentData } from '@/store/editor'
import { clone, last } from 'lodash-es'
import { textDefaultProps } from 'lego-bricks'
const cloneComponents = clone(testComponents)
jest.mock('ant-design-vue')
describe('test vuex store', () => {
  it('should have three modules', () => {
    expect(store.state).toHaveProperty('user')
    expect(store.state).toHaveProperty('templates')
    expect(store.state).toHaveProperty('editor')
  })
  describe('test user module', () => {
    it('test login mutation', () => {
      store.commit('login')
      expect(store.state.user.isLogin).toBeTruthy()
    })
    it('test logout mutation', () => {
      store.commit('logout')
      expect(store.state.user.isLogin).toBeFalsy()
    })
  })
  describe('test templates module', () => {
    it('should have default templates', () => {
      expect(store.state.templates.data).toHaveLength(testData.length)
    })
    it('should get the correct template by Id', () => {
      const selectTemplate = store.getters.getTemplateById(1)
      expect(selectTemplate.title).toBe('test title 1')
    })
  })
})