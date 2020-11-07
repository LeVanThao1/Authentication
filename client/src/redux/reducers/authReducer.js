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
        default:
            return state
    }
}

export default authReduder
