import { observable, action } from 'mobx'

class UiStore {
  @observable count = 0

  @action
  incrementCount = () => {
    this.count = this.count + 1
  }
}

const uiStore = new UiStore()

export default uiStore
export { UiStore }
