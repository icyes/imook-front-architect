import axios, { AxiosRequestConfig } from 'axios'
import { Module, ActionContext } from 'vuex'
import { GlobalDataProps, actionWrapper } from './index' 
import { RespData } from './respTypes'
export interface UserDataProps {
  username?: string;
  id?: string;
  phoneNumber?: string;
  nickName?: string;
  description?: string;
  updatedAt?: string;
  createdAt?: string;
  iat?: number;
  exp?: number;
  picture?: string;
  gender?: string;
}

export interface UserProps {
  isLogin: boolean;
  token?: string;
  data: UserDataProps;
}

const user: Module<UserProps, GlobalDataProps> = {
  state: {
    isLogin: false,
    data: {},
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    login(state, rawData: RespData<{ token: string }>) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    fetchCurrentUser(state, rawData: RespData<UserDataProps>) {
      state.isLogin = true
      state.data = { ...rawData.data }
    },
    logout(state) {
      state.token = ''
      state.isLogin = false
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    }
  },
  actions: {
    login: actionWrapper('/users/loginByPhoneNumber', 'login', { method: 'post'}),
    // login({ commit }, payload) {
    //   return axios.post('/users/loginByPhoneNumber', payload).then(rawData => {
    //     commit('login', rawData.data)
    //   })
    // },
    fetchCurrentUser: actionWrapper('/users/getUserInfo', 'fetchCurrentUser'),
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }   
  }
}

export default user