export default function bookmarkListReducer(state = {
    list: ''
}, action) {
    switch (action.type) {
        case 'GET_LIST':
            return {
                list: action.list
            }
        default:
            return state;
    }
}