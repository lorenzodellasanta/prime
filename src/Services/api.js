import axios from 'axios';

//Base da URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=665086e41b04d4ac508429bb35a6b109&language=pt-BR


const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
})

export default api;