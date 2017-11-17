import Vuex from 'vuex'
import mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
      locales: ['ja'],
      locale: 'ja'
    },
    mutations
  })
}
export default createStore
