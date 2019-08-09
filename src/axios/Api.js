import axios from 'axios'

export default axios.create({
    url: "http://localhost:https://library-app-backend.herokuapp.com/",
    headers: { "authorization": "khusni" }
})