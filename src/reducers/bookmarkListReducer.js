export default function bookmarkListReducer(state = {
    bookmarkList: ''
}, action) {
    switch (action.type) {
        case 'GET_BOOKMARK':
            return {
                bookmarkList: action.list
            }
        default:
            return state;
    }
}