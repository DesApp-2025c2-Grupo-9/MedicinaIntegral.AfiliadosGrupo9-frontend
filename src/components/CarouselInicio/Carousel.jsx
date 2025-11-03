import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import vacunacion from '../../assets/img/vacunacion-carousel.webp'
import consejosSalud from '../../assets/img/consejos-salud-carousel.webp'
import profesionales from '../../assets/img/profesionales-carousel.webp'
import cuidadoInfantil from '../../assets/img/cuidadoInfantil-carousel.webp'
import entregaDeComida from '../../assets/img/entregaDeComida-carousel.webp'
import ContenidoCartilla from './ImagenCartilla';
import './styles.css'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, right: '20px', position: 'absolute', display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, zIndex: '1', left: '20px', position: 'absolute', display: "block" }}
      onClick={onClick}
    />
  );
}

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
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: dots => (
            <div>
                <ul className='carousel-dots' style={{ margin: "0px" }}> {dots} </ul>
            </div>
        )
    };

    return (
        // <div className="w-full mx-auto md:px-4 lg:w-3xl xl:w-5xl 2xl:w-6xl">
        <div className="w-full relative rounded-lg overflow-clip shadow-custom-shadow">
            <Slider {...settings }>
            <ContenidoCartilla imagen={consejosSalud} altImg="Consejos de Salud" heightImg={height} descripcion="Semana del corazón: Controles gratuitos de presión arterial, glucemia y colesterol" btnText="Dónde anotarse" extraStyles="left-1/6"/>
            <ContenidoCartilla imagen={vacunacion} altImg="Vacunacion" heightImg={height} descripcion="Se abre el periodo de vacunación" btnText="Ver turnos" extraStyles="left-1/6" />
            <ContenidoCartilla imagen={cuidadoInfantil} altImg="Cuidado infantil" heightImg={height} descripcion="Taller de cuidado infantil y primeros auxilios" btnText="Donde anotarse" extraStyles="left-3/6"/>
            <ContenidoCartilla imagen={profesionales} altImg="Profesionales de la salud" heightImg={height} descripcion="Nuevos profesionales en la empresa" btnText="Consultá acá" extraStyles="left-1/6"/>
            <ContenidoCartilla imagen={entregaDeComida} altImg="Cuidado infantil" heightImg={height} descripcion="Recolección de ropa y alimentos para comedores" btnText="Cómo contribuir" extraStyles="left-1/6"/>
            </Slider>
        </div>
    );
}