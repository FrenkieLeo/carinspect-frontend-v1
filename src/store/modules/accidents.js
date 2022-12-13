import { getAccidents, updateAccidents } from '@/api/accidents'

const getDefaultState = () => {
  return {
    accidnetsList: [],
    params: {}
  }
}

const state = getDefaultState()

const mutations = {
  UPDATE_ACCIDENTS: (state, data) => {
    state.accidnetsList = data
  }
}

const actions = {
  // get drivers information
  getAccidents({ commit, state }) {
    return new Promise((resolve, reject) => {
      getAccidents(state.params).then(response => {
        const { data } = response
        console.log('we are using getAccidents', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateAccidents({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      updateAccidents(query).then(response => {
        const { data } = response
        console.log('we are using updateAccidents', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        // const { accidnetsList } = data
        // commit('UPDATE_ACCIDENTS', accidnetsList)
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

