import { getDashboard } from '@/api/dashboard'

const getDefaultState = () => {
  return {
    dashboardList: [],
    params: {}
  }
}

const state = getDefaultState()

const mutations = {
  UPDATE_ETC: (state, data) => {
    state.dashboardList = data
  }
}

const actions = {
  // get drivers information
  getDashboard({ commit, state }) {
    console.log('using getDashboard')
    return new Promise((resolve, reject) => {
      getDashboard(state.params).then(response => {
        const { data } = response
        console.log('we are using getDashboard', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

