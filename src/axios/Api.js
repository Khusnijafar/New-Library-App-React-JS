import axios from 'axios'

export default axios.create({
    url: "http://localhost:3001/",
    headers: { "authorization": "khusni" }
})