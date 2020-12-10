import { shallowMount } from '@vue/test-utils'
import moxios from 'moxios';
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Home from '@/views/home.vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

describe('Home View', () => {

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    moxios.uninstall();
  });

  it('Home renders without errors', () => {
    const wrapper = shallowMount(Home, {});
    expect(wrapper.vm).toBeTruthy();
  })
})
