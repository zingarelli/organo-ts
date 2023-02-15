import './Banner.css';

interface BannerProps {
    enderecoImagem: string;
    // o ? ao lado do nome significa que é uma prop opcional
    textoAlternativo?: string;
}

const Banner = ({ enderecoImagem, textoAlternativo}: BannerProps) => {
    return (
        <header className="banner">
            <img src={enderecoImagem} alt={textoAlternativo} />
        </header>
    )
}

export default Banner;