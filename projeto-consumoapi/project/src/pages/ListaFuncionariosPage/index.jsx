import { useEffect, useState } from 'react';
import './style.css'
import { toast } from 'react-toastify';

export default function ListarFuncionarioPage(){
    const [funcionarios, setFuncionarios] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscarFuncionarios(){
            try {
                const resposta = await api.get('/usuarios');
                setFuncionarios(resposta.data);
            } catch (error){
                console.error('Erro ao buscar funcionários:', error);
                const mensagemDoServidor = error.response?.data?.mensagem || 'Erro ao carregar a lista de funcionários';
                toast.error(mensagemDoServidor);
            } finally {
                setCarregando(false);
            }
        }
        buscarFuncionarios();

    },[]);
    if(carregando){
        return <div>Carregando funcionário...</div>
    }
    
    return(
        <>
        
        </>
    );
}