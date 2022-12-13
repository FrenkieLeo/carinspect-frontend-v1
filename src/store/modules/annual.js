import { getAnnual, updateAnnual } from '@/api/annual'

const getDefaultState = () => {
  return {
    annualList: [],
    params: {}
  }
}

const state = getDefaultState()

const mutations = {
  UPDATE_ETC: (state, data) => {
    state.annualList = data
  }
}

const actions = {
  // get drivers information
  getAnnual({ commit, state }) {
    return new Promise((resolve, reject) => {
      getAnnual(state.params).then(response => {
        const { data } = response
        console.log('we are using getAnnual', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateAnnual({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      updateAnnual(query).then(response => {
        const { data } = response
        console.log('we are using updateAnnual', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        // const { annualList } = data
        // commit('UPDATE_ETC', annualList)
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

