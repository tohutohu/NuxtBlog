import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

const createStore = () => {
  return new Vuex.Store({
    state: {
      locales: ['ja'],
      locale: 'ja',
      authUser: false
    },
    mutations,
    actions
  })
}
export default createStore
