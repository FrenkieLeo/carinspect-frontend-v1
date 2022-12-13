import { getInsurance, updateInsurance } from '@/api/insurance'

const getDefaultState = () => {
  return {
    insuranceList: [],
    params: {}
  }
}

const state = getDefaultState()

const mutations = {
  UPDATE_MAINTENANCE: (state, data) => {
    state.insuranceList = data
  }
}

const actions = {
  // get drivers information
  getInsurance({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInsurance(state.params).then(response => {
        const { data } = response
        console.log('we are using getInsurance', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateInsurance({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      updateInsurance(query).then(response => {
        const { data } = response
        console.log('we are using updateInsurance', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        // const { insuranceList } = data
        // commit('UPDATE_MAINTENANCE', insuranceList)
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

