import { format, addDays } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { icons } from '../utils/icons';
import pesosArg from '../utils/pesosArg';
import { useEffect, useRef } from 'react';

function DetallesCard({ reintegro, className, isOpen, setIsOpen }) {
  const cardRef = useRef(null);
  const bgColor = {
    pendiente: 'bg-[#FD7400]',
    observado: 'bg-[#1B76FF]',
    'en análisis': 'bg-[#9C27B0]',
    aceptado: 'bg-[#00AB01]',
    rechazado: 'bg-[#FF1D23]'
  };
  const borderColor = {
    pendiente: 'border-[#FD7400]',
    observado: 'border-[#1B76FF]',
    'en análisis': 'border-[#9C27B0]',
    aceptado: 'border-[#00AB01]',
    rechazado: 'border-[#FF1D23]'
  };
  const { factura, formaDePago, cbu } = reintegro;
  const fechaFacturacion = format(addDays(factura.fecha, 1), 'dd/MM/yy');
  const valorTotal = pesosArg.format(factura.valorTotal);
  const iconsArr = [
    icons.turnos,
    icons.usuario,
    icons.hashtag,
    icons.reintegros,
    icons.money,
    icons.bank,
  ];
  const camposArr = [
    ['Fecha de facturación', fechaFacturacion],
    ['Persona a facturar', factura.personaAFacturar],
    ['CUIT', factura.cuit],
    ['Forma de pago', formaDePago],
    ['Valor total', valorTotal],
    ['CBU', cbu]
  ];

  useEffect(() => {
    const handleClickOutside = e => {
      if (isOpen && cardRef.current && !cardRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  return (
    <div
      ref={cardRef}
      className={twMerge('p-3 w-full h-full min-h-[149px] rounded-lg bg-blanco-principal border flex flex-wrap relative overflow-clip', borderColor[reintegro.estado], className)}
    >
      {camposArr.map(([key, value], index) => {
        if (value) {
          return (
            <div
              key={index}
              className='flex items-center gap-2 w-full max-w-[50%]'
            >
              <div className='border p-2 rounded-full border-negro-principal flex items-center justify-center'>
                <div className='w-4 aspect-square'>{iconsArr[index]}</div>
              </div>
              <p className='leading-4 text-xs'>
                {key}:<br />
                <span className='font-bold capitalize'>{value}</span>
              </p>
            </div>
          );
        }
      })}
      <button
        onClick={() => setIsOpen(false)}
        className={twMerge(
          'absolute top-2 right-2 p-1 pr-1.5 aspect-square lg:cursor-pointer flex justify-center items-centers rounded-full lg:hover:scale-120 transition-all',
          bgColor[reintegro.estado]
        )}
      >
        <div className='w-3 aspect-square rotate-90 text-blanco-principal'>{icons.chevronDown}</div>
      </button>
    </div>
  );
}
export default DetallesCard;
