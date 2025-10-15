import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import BotonPapelera from "./cardComponents/BotonPapelera";
import UsuarioActual from "./cardComponents/UsuarioActual";
import BotonEditar from "./cardComponents/BotonEditar";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import MarcoCard from "./cardComponents/MarcoCard";
import TipoDeTramite from "./cardComponents/TipoDeTramite";
import BotonDescargar from './cardComponents/BotonDescargar'
import capitalize from '../../../utils/capitalize'
import logo from '../../../assets/img/med_integral_logo.png'
import { jsPDF } from 'jspdf'
import Swal from "sweetalert2";
import { useState } from "react";
import EditarReceta from "../../../pages/Recetas/EditarReceta";
function RecetaCard(props) {
  
  let receta = props.receta;
  const [modalEditarOpen, setModalEditarOpen] = useState(false);

  //Los campos que se van a cargar del medicamento
  const cardStyle = "grid-cols-2";

  const descargarReceta = () => {
    Swal.fire({
      title: "¿Desea descargar estar receta?",
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: "Descargar",
      denyButtonText: 'Salir'
    }).then((result) => {
      if (result.isConfirmed) {
        //Altura inicial de los elementos
        let y = 10
        //Generar el pdf
        const doc = new jsPDF({ format: 'a5' });
        //Marca de agua
        doc.addImage(logo, "PNG", 100, 10, 40, 40);
        //Titulo principal
        doc.setFontSize(22)
        doc.text("Medicina Integral", 10, y)
        //Titulo
        doc.setFontSize(16);
        doc.text("Receta médica", 10, y += 10)
        //Datos
        doc.setFontSize(12)
        doc.text(`Nro de afiliado: ${receta.nroAfiliado}`, 10, y += 10)
        doc.text(`Medicamento: ${receta.medicamento}`, 10, y += 10)
        doc.text(`Cantidad: ${receta.cantidad}`, 10, y += 10)
        doc.text(`Presentación: ${receta.presentacion}`, 10, y += 10)
        doc.text(`Estado: ${capitalize(receta.estado)}`, 10, y += 10)
        //Si la receta tiene observaciones agregarlas
        if (receta.observaciones && receta.observaciones.length > 0) {
          doc.text("Observaciones:", 10, y += 10);
          receta.observaciones.forEach((observacion, index) => {
            let y = 90 + index * 10;
            doc.text(
              `Emisor: ${observacion.emisor}`, 20, y
            )
            doc.text(`Descripción: ${observacion.descripcion}`, 25, y + 10)
            doc.text(`Fecha: ${new Date(observacion.fecha).toLocaleDateString()}`, 25, y + 20)
          })
        } else (
          doc.text("Observaciones: Sin observaciones", 10, y += 10)
        )
        doc.save(`Receta.pdf`)
      }
    })
  }

  const observacionesHTML = Array.isArray(receta.observaciones)
  ? receta.observaciones.map((observacion) => {
      const fecha = new Date(observacion.fecha).toLocaleDateString("es-AR");
      return `
        <div style='text-align:left; margin-bottom:10px'>
          <p><strong>Emisor: </strong>${observacion.emisor}</p>
          <p><strong>Descripción: </strong>${observacion.descripcion}</p>
          <p><strong>Fecha: </strong>${fecha}</p>
        </div>
      `;
    }).join("")
  : "";

  const verObservaciones = () => {
    Swal.fire({
  title: "Observaciones",
  html: observacionesHTML || '<p>No hay observaciones para esta receta</p>',
  confirmButtonText: "Cerrar"
});
  }

  const eliminarReceta = () => {
    Swal.fire({
      title: "Eliminar receta",
      html: `
      <div style='display: flex ;justify-content-center'>
        <div style= 'text-align:left'>
          <p><strong>Datos de la receta:</strong><p>
          <p><strong>Receta para: </strong> ${receta.nroAfiliado}</p>
          <p><strong>Medicamento: </strong> ${receta.medicamento}</p>
          <p><strong>Cantidad: </strong> ${receta.cantidad}</p>
        </div>
      </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#27a700ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminada!",
          text: "Su receta ha sido eliminada.",
          icon: "success"
        });
      }
    });
  }


  return (
    <>
      {/*Modal editar */}
      {
        modalEditarOpen && (
          <div className="bg-negro-translucido fixed top-0 left-0 w-dvw h-dvh z-10 flex items-center justify-center">
            <EditarReceta
              className='w-full max-w-[600px]'
              receta={receta}
              cancelBtnOnClick={() => setModalEditarOpen(false)}
            />
          </div>
        )
      }

      {/* Card */}
      <MarcoCard estilo={cardStyle} estado={receta.estado} >
        {/*Datos de la receta*/}
        <ColumnaPrincipal >
          Receta
          {receta.medicamento}
          {`Cantidad: ${receta.cantidad}`}
          {`Presentación: ${receta.presentacion}`}
          {receta.detalleMedicamento}
        </ColumnaPrincipal>
        <div className="grid grid-rows-4 justify-items-end">

          {/*Según es estado de la receta, varía la sección derecha de la card receta */}
          {
            props.dashboard ? (//Si es card de dashboard
              //Mostrar tipo de tramite
              <TipoDeTramite tipo={'Receta'} />
            ) : <>
              {/**Si no es card de dashboard */}
              <UsuarioActual />

              {receta.estado !== 'pendiente' ? (
                <div className="flex row-start-4">
                  <BotonDescargar onClick={descargarReceta} />
                  <BotonObservaciones onClick={verObservaciones} />

                </div>
              ) : (<></>)
              }
            </>
          }
          {/*Aca si el estado es pendiente se puede modificar o elimnar la receta */}
          {receta.estado == 'pendiente' ? (
            <div className="flex items-baseline-last justify-end row-start-4">
              <BotonDescargar onClick={descargarReceta} />
              <BotonEditar onClick={() => setModalEditarOpen(true)} />
              <BotonPapelera onClick={eliminarReceta} />
            </div>
          ) : <></>
          }
        </div>
      </MarcoCard>
    </>
  );
}

export default RecetaCard;
