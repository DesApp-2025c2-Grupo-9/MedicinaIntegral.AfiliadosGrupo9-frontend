import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import vacunacion from '../../assets/img/vacunacion-carousel.jpg'
import consejosSalud from '../../assets/img/consejos-salud-carousel.jpg'
import profesionales from '../../assets/img/profesionales-carousel.jpg'
import cuidadoInfantil from '../../assets/img/cuidadoInfantil-carousel.jpg'
import entregaDeComida from '../../assets/img/entregaDeComida-carousel.jpg'
import ContenidoCartilla from './ImagenCartilla';
import './styles.css'

export default function Carousel({ height }) {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "linear",
        pauseOnHover: true
    };

    return (
        <div className="w-full mx-auto lg:w-7xl md:px-4 ">
            <Slider {...settings }>
            <ContenidoCartilla imagen={consejosSalud} altImg="Consejos de Salud" heightImg={height} descripcion="Semana del corazón: Controles gratuitos de presión arterial, glucemia y colesterol" btnText="Dónde anotarse" extraStyles="top-1/2 left-1/6"/>
            <ContenidoCartilla imagen={vacunacion} altImg="Vacunacion" heightImg={height} descripcion="Se abre el periodo de vacunación" btnText="Ver turnos" extraStyles="top-1/2 left-1/6" />
            <ContenidoCartilla imagen={cuidadoInfantil} altImg="Cuidado infantil" heightImg={height} descripcion="Taller de cuidado infantil y primeros auxilios" btnText="Donde anotarse" extraStyles="top-1/2 left-3/6"/>
            <ContenidoCartilla imagen={profesionales} altImg="Profesionales de la salud" heightImg={height} descripcion="Nuevos profesionales en la empresa" btnText="Consultá acá" extraStyles="top-1/2 left-1/6"/>
            <ContenidoCartilla imagen={entregaDeComida} altImg="Cuidado infantil" heightImg={height} descripcion="Recolección de ropa y alimentos para comedores" btnText="Cómo contribuir" extraStyles="top-1/2 left-1/6"/>
            </Slider>
        </div>
    );
}