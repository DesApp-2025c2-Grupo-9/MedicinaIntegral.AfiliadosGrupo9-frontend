import React from "react";
import TituloCard from "./TituloCard";
import SubTituloCard from "./SubTituloCard";
import CampoInformacion from "./CampoInformacion";



function ColumnaPrincipal(props) {
  const { children, subtituloOn = true, detalleOn = true} = props
  //Convierte el children a array
  const arrayChildren = React.Children.toArray(children)

  const titulo = arrayChildren[0]     //Asigna el primer elemento del array al titulo
  const subtitulo = arrayChildren[1]  //Asigna el segundo elemento del array al subtitulo
  const campos = arrayChildren.slice(subtituloOn ? 2 : 1)//Asigna el resto del array para los campos
  return <div className='grid'>
    <TituloCard>{titulo}</TituloCard>
    {!detalleOn?
    (
      <SubTituloCard>{subtitulo}</SubTituloCard>

    ):(
      campos.map((texto, index) => (
        <CampoInformacion key={index}>{texto}</CampoInformacion>
      ))
    )}
  </div>;
}

export default ColumnaPrincipal;
