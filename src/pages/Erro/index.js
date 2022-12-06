import{Link} from 'react-router-dom';
import './erro.css';


function Erro(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h2>Página não Encontrada!!</h2>
            <Link to='/'>Veja o catálogo de Filmes! </Link>
        </div>
    )
}

export default Erro;