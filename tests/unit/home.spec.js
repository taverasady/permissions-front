import { shallowMount } from '@vue/test-utils'
import Home from '@/views/home.vue'

describe('Home View', () => {
  it('view mounts properly', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Home, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
