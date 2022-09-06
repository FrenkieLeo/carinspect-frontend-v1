import { getDrivers, updateDrivers } from '@/api/driver'

const getDefaultState = () => {
  return {
    driverList: [],
    params: {}
  }
}

const state = getDefaultState()

const mutations = {
  UPDATE_DRIVERS: (state, data) => {
    state.driverList = data
  }
}

const actions = {
  // get drivers information
  getDrivers({ commit, state }) {
    return new Promise((resolve, reject) => {
      getDrivers(state.params).then(response => {
        const { data } = response
        console.log('we are using getDrivers', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        // const { driverList } = data
        // commit('UPDATE_DRIVERS', driverList)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateDrivers({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      updateDrivers(query).then(response => {
        const { data } = response
        console.log('we are using updateDrivers', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        // const { driverList } = data
        // commit('UPDATE_DRIVERS', driverList)
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

