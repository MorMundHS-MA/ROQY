import Vue from 'vue'
import header from '@/components/BotHeader'

describe('BotHeader.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(header)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent)
      .to.equal('')
  })
})
