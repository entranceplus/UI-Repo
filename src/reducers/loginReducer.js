import * as actionTypes from '../constants/actiontypes.js'

export default function bookmarkListReducer(state = {
    loginResp: ''
}, action) {
    switch (action.type) {
        case actionTypes.SIGN_UP:
            return {
                loginResp: action.response
            }
        default:
            return state;
    }
}