import ACTIONS from './index'
import axios from 'axios'

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN,
    }
}

export const fetchUser = async (token) => {
    const res = await axios.get('/user/infor', {
        headers: { Authorization: token },
    })
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USERS,
        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false,
        },
    }
}
