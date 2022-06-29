import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import InlineEdit from '@/components/InlineEdit.vue'


let wrapper: VueWrapper<any>

describe('InputEdit component', () => {
  beforeAll(() => {
    wrapper = mount(InlineEdit, {
      props: {
        value: 'test'
      },
      slots: { 
        default: '<template #default="{ text }"><h2>{{text}}</h2></template>',
      }
    })
  }),
  it('should render the default layout', () => {
    expect(wrapper.get('h2').text()).toBe('test')
  })
  it('should render input when clicking the element', async () => {
    await wrapper.trigger('click')
    expect(wrapper.find('input').exists()).toBeTruthy()
    const input = wrapper.get('input').element as HTMLInputElement
    expect(input.value).toBe('test')
  })
  it('press enter should render to default layout with new value', async () => {
    await wrapper.get('input').setValue('testnew')
    const event = new KeyboardEvent('keydown', { key: 'Enter'})
    document.dispatchEvent(event)
    await nextTick()
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.get('h2').text()).toBe('testnew')
    const events = wrapper.emitted('change')
    expect(events[0]).toEqual(['testnew'])
  })
  it('press esc should render to default layout with old value', async () => {
    await wrapper.trigger('click')
    await wrapper.get('input').setValue('test123')
    const event = new KeyboardEvent('keydown', {'key': 'Escape'})
    document.dispatchEvent(event)
    await nextTick()
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.get('h2').text()).toBe('testnew')
  })
  it('click outside should render to default layout with new value', async () => {
    await wrapper.trigger('click')
    await wrapper.get('input').setValue('testupdated')
    const event = new MouseEvent('click')
    document.dispatchEvent(event)
    await nextTick()
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.get('h2').text()).toBe('testupdated')
    const events = wrapper.emitted('change')
    expect(events[1]).toEqual(['testupdated'])
  })
})