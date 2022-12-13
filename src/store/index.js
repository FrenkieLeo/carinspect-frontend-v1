import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import drivers from './modules/drivers'
import files from './modules/files'
import vehicles from './modules/vehicles'
import etc from './modules/etc'
import fuel from './modules/fuel'
import maintenance from './modules/maintenance'
import insurance from './modules/insurance'
import illegal from './modules/illegal'
import accidents from './modules/accidents'
import annual from './modules/annual'
import order from './modules/order'
import dashboard from './modules/dashboard'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    drivers,
    files,
    vehicles,
    etc,
    fuel,
    maintenance,
    insurance,
    illegal,
    accidents,
    annual,
    order,
    dashboard
  },
  getters
})

export default store
