// Reducer
export default function reducer(state = {}, action={}) {
    const { STORE_PATH, data, err } = action;
    const fetchState = {
      fetching: false,
      error: null,
      data: null,
    };
    switch (action.type) {
        case 'REQUEST':
            fetchState.fetching = true;
            fetchState.error = false;
            break;
        case 'SUCCESS':
            fetchState.fetching = false;
            fetchState.error = false;
            fetchState.data = data;
            break;
        case 'ERROR':
            fetchState.fetching = false;
            fetchState.error = err;
            break;
        default: 
            return state;
   }
    return {
      ...state,
      [STORE_PATH]: {
        ...state[STORE_PATH],
        ...fetchState,
      }
    };
}