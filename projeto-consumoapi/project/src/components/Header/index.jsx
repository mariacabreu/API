import './style.css'
import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <>
            <header className="header">
                <Link to="/">SENAI</Link>
                <nav>
                    <Link to="/cadastro">Cadastrar Funcionários</Link>
                    <Link to="/funcionarios">Listar Funcionários</Link>
                </nav>
            </header>
        </>
    );
}