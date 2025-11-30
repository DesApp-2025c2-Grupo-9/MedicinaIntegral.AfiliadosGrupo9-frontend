import { twMerge } from 'tailwind-merge';
import { icons } from '../../../../utils/icons';

function TipoDeTramite(props) {
  const coloresTexto = {
    pendiente: 'text-naranja-pendiente',
    aceptado: 'text-verde-aceptado',
    rechazado: 'text-rojo-rechazado',
    observado: 'text-azul-observado',
    'en análisis': 'text-violeta-analisis'
  };

  const coloresBg = {
    pendiente: 'bg-naranja-pendiente/16',
    aceptado: 'bg-verde-aceptado/16',
    rechazado: 'bg-rojo-rechazado/16',
    observado: 'bg-azul-observado/16',
    'en análisis': 'bg-violeta-analisis/16'
  };

  const iconKeys = Object.keys(icons);
  const formattedTipo = props.tipo.toLowerCase().slice(0, 10); // 
  const key = iconKeys.find(entry => entry.includes(formattedTipo));

  return (
    <div
      className={twMerge(`${coloresBg[props.colorEstado]} ${props.colorEstado ? coloresTexto[props.colorEstado] : ''} w-fit h-fit text-sm leading-3 p-1.5 uppercase flex gap-1`)}
    >
      <div className='h-3 aspect-square'>{icons[key]}</div>
      <p>{props.tipo}</p>
    </div>
  );
}

export default TipoDeTramite;
