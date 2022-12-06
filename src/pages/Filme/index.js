import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import'./filme-info.css';
import { toast } from 'react-toastify'

import api from '../../Services/api';

function Filme(){
    const {id} = useParams();
    const navigate= useNavigate();

    const [filme, setFilme] = useState({});
    const [loading,setLoading] = useState(true);
    

    useEffect(()=>{
        async function loadFilme(){
        await api.get(`/movie/${id}`,{
            params:{
                api_key:'665086e41b04d4ac508429bb35a6b109',
                language : 'pt-BR',
            }
        })
        .then((response)=>{
            setFilme(response.data);
            setLoading(false);
        })
        .catch(()=>{
            console.log('Filme Não Encontrado');
            navigate('/',{replace:true});
            return;

        })
        
        }

        loadFilme();

        return () =>{
            console.log('Componente Foi Desmontado')
        }
    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@primeflix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme){
           toast.warn('Esse filme já foi salvo na lista!!!')
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!!!')
    }

    if(loading){
        return(
            <div className='filme-info'>
              <h1>Carregando Detalhes...</h1>  
            </div>
        )
    }

    return(
        <div className='filme-info'>
        <h1>{filme.title}</h1>   
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

         <h3>Sinopse</h3>
         <span>{filme.overview}</span>
         <br/>
         <strong>Avaliação: {filme.vote_average} / 10</strong>
<br/>
          <div className='area-buttons'>
            <button onClick={salvarFilme}>Salvar</button>

            <button>
                <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
            </button>

          </div>

        </div>
    );
}

export default Filme;