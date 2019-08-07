import { combineReducers } from 'redux'

// import all reducers
import books from './books'
import loan from './loanbook'

const appReducer = combineReducers({
    books,
    loan
})

export default appReducer