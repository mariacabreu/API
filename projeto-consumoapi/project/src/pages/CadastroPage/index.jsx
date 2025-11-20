import './style.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../service/api'
 

const esquemadeCadastro = yup.object({
    nome: yup
        .string()
        .required('O nome é obrigatório'),
    email: yup
        .string()
        .email('Email inválido')
        .required('O email é obrigatório'),
    senha: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('A senha é obrigatório')
})
export default function CadastroPage(){
    const{
        register: registrarCampo,
        handleSubmit: lidarComEnvioDoFormulario,
        formsState: { errors: errosDoFormulario, isSubmitting: estaEnviando},
        setError: definirErroNoCampo,
        reset: limparCamposDoFormulario,
    } = useForm({
        resolver: esquemadeCadastro,
        defaultValues: {
            nome: '',
            email: '',
            senha: '',
        },
    }); 
    
    async function enviarDados(dadosDoFormulario){
        const dadosParaEnvio = {
            nome: dadosDoFormulario.nome,
            email: dadosDoFormulario.email,
            senha: dadosDoFormulario.senha,
        };

        try {
            const reposta = await api.post('/users', dadosParaEnvio);
            toast.success(resposta.data.mensagem || 'Funcionário cadastrado com sucesso!');
            limparCamposDoFormulario();
        } catch (errors){
            const codigoDeStatus = error.response?.status;
            const mensagemDoServidor = error.response?.data?.mensagem || 'Erro ao cadastrar funcionário. Tente novamente mais tarde.';
            if (codigoDeStatus === 400){
                definirErroNoCampo ('email', {
                    type: 'server',
                    message: mensagemDoServidor
                });
            } else {
                toast.error(mensagemDoServidor);
                console.error('Erro ao cadastrar funcionário', error);
            }
        
        }
    }
    return (
        <>
            <div className='cadastro-container'>
                <h1>Cadastro de Funcionários</h1>
                <form noValidate onSubmit={lidarComEnvioDoFormulario(enviarDados)}>
                    {/* Nome */}
                    <div className='form-group'>
                        <label htmlFor='nome'>Nome:</label>
                        <input
                        type='text'
                        id='nome'
                        placeholder='Ex.: João Silva'
                        {...registrarCampo('nome')}
                        />
                    </div>
                    {errosDoFormulario.nome && (
                            <span className='error-message'>{errosDoFormulario.nome.message}</span>
                        )}
                    {/* Email */}
                    <div className='form-group'>
                        <label htmlFor='campo-email'>Email.</label>
                        <input
                            type='email'
                            id='campo-email'
                            placeholder='Ex.: exemplo@email.com'
                            {...registrarCampo('email')}
                        />
                    </div>
                    {errosDoFormulario.email && (
                            <span className='error-message'>{errosDoFormulario.email.message}</span>
                        )}
                    {/* Senha */}
                    <div className='form-group'>
                        <label htmlFor='campo-senha'>Senha.</label>
                        <input
                            type='senha'
                            id='campo-senha'
                            placeholder='Digite uma senha segura'
                            {...registrarCampo('senha')}
                        />
                    </div>
                    {errosDoFormulario.senha && (
                            <span className='error-message'>{errosDoFormulario.senha.message}</span>
                        )}
                    {/* Botão de Envio */}
                    <button type='submit' disabled={estaEnviando}>
                        {estaEnviando ? 'Cadastrando...' : 'Cadastrar funcionário'}
                    </button>
                </form>
            </div>
        </>
    );
}
