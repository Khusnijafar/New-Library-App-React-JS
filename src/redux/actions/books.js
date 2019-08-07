import axios from 'axios'

export const getBooks = (page = 1) => {
    return {
        type: 'GET_BOOK',
        payload: axios.get(`https://library-app-backend.herokuapp.com/books?page=` + page, {
            headers: {'authorization': 'khusni'}
        })
    }
}

export const addBooks = (dataFile) => {
    return {
        type: 'POST_BOOK',
        payload: axios.post('https://library-app-backend.herokuapp.com/books/', dataFile, {
            headers: {'authorization': 'khusni'}
        })
    }
}

export const borrowBooks = (e, id_book) => {
    return {
        type: 'BORROW_BOOK',
        payload: axios.get(`https://library-app-backend.herokuapp.com/loanbooks/${id_book}`, e, {
            headers: {'authorization': 'khusni'}
        })
    }
}