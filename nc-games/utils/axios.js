import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://nc-games-qb66.onrender.com/api'
})
