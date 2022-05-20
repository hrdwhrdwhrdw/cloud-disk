import { LOGOUT, SET_USER } from "../reducers/userReducer"

export const setUser = user => ({type: SET_USER, payload: user})
export const logout = () => ({type: LOGOUT})