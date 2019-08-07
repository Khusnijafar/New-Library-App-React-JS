const initialState = {
    loanList: [],
    isLoading: false,
    isError: false,
    isFulfilled: false,
}

const loaning = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LOAN_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isError: false
            }
        case 'GET_LOAN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: false,
                isError: true
            }
        case 'GET_LOAN_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                isError: false,
                loanList: action.payload.data.result
            }
        case 'POST_LOAN_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isError: false
            }
        case 'POST_LOAN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: false,
                isError: true
            }
        case 'POST_LOAN_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                isError: false,
                loanList: action.payload.data.result
            }
               
        default:
            return state
    }
}

export default loaning