import  axios from 'axios'

export const getHistory = () => {
    return {
        type: 'GET_LOAN',
        payload: axios.get('https://library-app-backend.herokuapp.com/loanbooks/', {
            headers: {'authorization': 'khusni'}
        })
    }
}

export const postHistory = (id_loanbook, data) => {
    return {
        type: 'POST_LOAN',
        payload: axios.patch('https://library-app-backend.herokuapp.com/loanbooks/' + id_loanbook, data, {
            headers: {'authorization': 'khusni'}
        })
    }
}