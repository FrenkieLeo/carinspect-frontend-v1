import Cookies from 'js-cookie'

const TokenKey = 'CarInspect_token' // token的名称

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
