import { getVehicles, updateVehicles } from '@/api/vehicles'

const getDefaultState = () => {
  return {
    vehiclesList: [],
    params: {}
  }
}

const state = getDefaultState()

const mutations = {
  UPDATE_DRIVERS: (state, data) => {
    state.vehiclesList = data
  }
}

const actions = {
  // get drivers information
  getVehicles({ commit, state }) {
    console.log('1')
    return new Promise((resolve, reject) => {
      getVehicles(state.params).then(response => {
        const { data } = response
        console.log('we are using getVehicles', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateVehicles({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      updateVehicles(query).then(response => {
        const { data } = response
        console.log('we are using updateVehicles', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        // const { vehiclesList } = data
        // commit('UPDATE_DRIVERS', vehiclesList)
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

