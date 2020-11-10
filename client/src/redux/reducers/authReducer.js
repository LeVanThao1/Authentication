import ACTIONS from '../action'

const initialState = {
    user: [],
    isLogged: false,
    isAdmin: false,
}

const authReduder = (state = initialState, actions) => {
    switch (actions.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged: true,
            }
        case ACTIONS.GET_USERS:
            return { ...state, ...actions.payload }
        default:
            return state
    }
}

export default authReduder
