import { getOrder, updateOrder } from '@/api/order'

const getDefaultState = () => {
  return {
    orderList: [],
    params: {}
  }
}

const state = getDefaultState()

const mutations = {
  UPDATE_ORDER: (state, data) => {
    state.orderList = data
  }
}

const actions = {
  // get drivers information
  getOrder({ commit, state }) {
    return new Promise((resolve, reject) => {
      getOrder(state.params).then(response => {
        const { data } = response
        console.log('we are using getOrder', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateOrder({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      updateOrder(query).then(response => {
        const { data } = response
        console.log('we are using updateOrder', data)
        if (!data) {
          return reject('something wrong, please check your params.')
        }
        // const { orderList } = data
        // commit('UPDATE_ORDER', orderList)
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

