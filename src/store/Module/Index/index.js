export default {
  namespaced: true, // 区分命名空间
  state: {
    height: 0, // container的高度
    width: 0
  },
  getters: {
    getHeight: state => {
      return state.height
    },
    getWidth: state => {
      return state.width
    }
  },
  mutations: {
    setHeight(state, value) {
      // console.log(value)
      state.height = value
    },
    setWidth(state, value) {
      // console.log(value)
      if (value < 910) {
        state.width = 910
      } else {
        state.width = value
      }
    }
  }
}
