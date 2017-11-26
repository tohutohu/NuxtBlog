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
        commit('SET_USER', authUser)
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
        commit('SET_USER', null)
      })
  }
}

if (!process.env.static) {
  actions.nuxtServerInit = ({ commit }, { req }) => {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  }
}

export default actions
