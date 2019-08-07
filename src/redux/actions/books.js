import axios from 'axios'

export const getBooks = (page = 1) => {
    return {
        type: 'GET_BOOK',
        payload: axios.get(`http://localhost:3001/books?page=` + page, {
            headers: {'authorization': 'khusni'}
        })
    }
}

export const addBooks = (dataFile) => {
    return {
        type: 'POST_BOOK',
        payload: axios.post('http://localhost:3001/books/', dataFile, {
            headers: {'authorization': 'khusni'}
        })
    }
}

export const borrowBooks = (e, id_book) => {
    return {
        type: 'BORROW_BOOK',
        payload: axios.get(`http://localhost:3001/loanbooks/${id_book}`, e, {
            headers: {'authorization': 'khusni'}
        })
    }
}