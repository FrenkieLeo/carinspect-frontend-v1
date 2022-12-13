import { getFuel, updateFuel } from '@/api/fuel'

const getDefaultState = () => {
  return {
    fuelList: [],
    params: {}
  }
}

const state = getDefaultState()

const mutations = {
  UPDATE_FUEL: (state, data) => {
    state.fuelList = data
  }
}

const actions = {
  // get drivers information
  getFuel({ commit, state }) {
    return new Promise((resolve, reject) => {
      getFuel(state.params).then(response => {
        const { data } = response
        console.log('we are using getFuel', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateFuel({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      updateFuel(query).then(response => {
        const { data } = response
        console.log('we are using updateFuel', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        // const { fuelList } = data
        // commit('UPDATE_FUEL', fuelList)
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

