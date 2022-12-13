import { getEtc, updateEtc } from '@/api/etc'

const getDefaultState = () => {
  return {
    etcList: [],
    params: {}
  }
}

const state = getDefaultState()

const mutations = {
  UPDATE_ETC: (state, data) => {
    state.etcList = data
  }
}

const actions = {
  // get drivers information
  getEtc({ commit, state }) {
    return new Promise((resolve, reject) => {
      getEtc(state.params).then(response => {
        const { data } = response
        console.log('we are using getEtc', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateEtc({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      updateEtc(query).then(response => {
        const { data } = response
        console.log('we are using updateEtc', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        // const { etcList } = data
        // commit('UPDATE_ETC', etcList)
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

