import axios from '@@/plugins/axios'
const actions = {
  login ({ commit }, form) {
    return axios({
      // クライアントのクッキーをサーバーに送信
      url: '/api/admin/login',
      withCredentials: true,
      method: 'POST',
      json: true,
      data: form
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return res.data
        }
      })
      .then((authUser) => {
        commit('SET_USER', true)
      })
  },
  logout ({commit}) {
    return axios({
      url: '/api/admin/logout',
      method: 'POST',
      withCredentials: true,
      json: true
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Some thing wrong!')
        } else {
          return res.data
        }
      })
      .then(() => {
        commit('SET_USER', false)
      })
  }
}

if (!process.env.static) {
  actions.nuxtServerInit = ({ commit }, { req }) => {
    console.log('nuxtServerInit', req.session.authUser)
    if (req.session && req.session.authUser) {
      commit('SET_USER', true)
    }
  }
}

export default actions
