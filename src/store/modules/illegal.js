import { getIllegal, updateIllegal } from '@/api/illegal'

const getDefaultState = () => {
  return {
    illegalList: [],
    params: {}
  }
}

const state = getDefaultState()

const mutations = {
  UPDATE_ILLEGAL: (state, data) => {
    state.illegalList = data
  }
}

const actions = {
  // get drivers information
  getIllegal({ commit, state }) {
    return new Promise((resolve, reject) => {
      getIllegal(state.params).then(response => {
        const { data } = response
        console.log('we are using getIllegal', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateIllegal({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      updateIllegal(query).then(response => {
        const { data } = response
        console.log('we are using updateIllegal', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        // const { illegalList } = data
        // commit('UPDATE_ILLEGAL', illegalList)
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

