import  axios from 'axios'

export const getHistory = () => {
    return {
        type: 'GET_LOAN',
        payload: axios.get('http://localhost:3001/loanbooks/', {
            headers: {'authorization': 'khusni'}
        })
    }
}

export const postHistory = (id_loanbook, data) => {
    return {
        type: 'POST_LOAN',
        payload: axios.patch('http://localhost:3001/loanbooks/' + id_loanbook, data, {
            headers: {'authorization': 'khusni'}
        })
    }
}