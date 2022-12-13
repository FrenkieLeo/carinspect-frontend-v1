import { getMaintenance, updateMaintenance } from '@/api/maintenance'

const getDefaultState = () => {
  return {
    maintenanceList: [],
    params: {}
  }
}

const state = getDefaultState()

const mutations = {
  UPDATE_MAINTENANCE: (state, data) => {
    state.maintenanceList = data
  }
}

const actions = {
  // get drivers information
  getMaintenance({ commit, state }) {
    console.log('getMain2')
    return new Promise((resolve, reject) => {
      getMaintenance(state.params).then(response => {
        const { data } = response
        console.log('we are using getMaintenance', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateMaintenance({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      updateMaintenance(query).then(response => {
        const { data } = response
        console.log('we are using updateMaintenance', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        // const { maintenanceList } = data
        // commit('UPDATE_MAINTENANCE', maintenanceList)
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

