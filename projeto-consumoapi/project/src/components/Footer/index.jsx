import './style.css'

export default function Footer(){
    const anoatual = new Date().getFullYear();
    return(
        <>
        <footer className="footer">
            <span>&copy; {anoAtual} - Todos os direitos reservados. | Maria Clara Abreu</span>
        </footer>
        </>
    );
}