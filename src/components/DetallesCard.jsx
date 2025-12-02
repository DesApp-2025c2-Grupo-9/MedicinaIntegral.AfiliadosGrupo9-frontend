import { format, addDays } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { icons } from '../utils/icons';
import pesosArg from '../utils/pesosArg';
import { useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

function DetallesCard({ reintegro, className, isOpen, setIsOpen }) {
  const cardRef = useRef(null);
  const bgColor = {
    pendiente: 'hover:bg-[#FD7400]/24',
    observado: 'hover:bg-[#1B76FF]/24',
    'en análisis': 'hover:bg-[#9C27B0]/24',
    aceptado: 'hover:bg-[#00AB01]/24',
    rechazado: 'hover:bg-[#FF1D23]/24'
  };
  const borderColor = {
    pendiente: 'border-[#FD7400]',
    observado: 'border-[#1B76FF]',
    'en análisis': 'border-[#9C27B0]',
    aceptado: 'border-[#00AB01]',
    rechazado: 'border-[#FF1D23]'
  };
  const textColor = {
    pendiente: 'text-[#FD7400]',
    observado: 'text-[#1B76FF]',
    'en análisis': 'text-[#9C27B0]',
    aceptado: 'text-[#00AB01]',
    rechazado: 'text-[#FF1D23]'
  };
  const { factura, formaDePago, cbu } = reintegro;
  const fechaFacturacion = format(addDays(factura.fecha, 1), 'dd/MM/yy');
  const valorTotal = pesosArg.format(factura.valorTotal);
  const iconsArr = [icons.turnos, icons.usuario, icons.hashtag, icons.reintegros, icons.money, icons.bank];
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
              className='flex items-start gap-2 w-full max-w-[calc(50%-16px)]'
            >
              <div className='hidden border p-2 rounded-full border-negro-principal xs:flex items-center justify-center'>
                <div className='w-4 aspect-square'>{iconsArr[index]}</div>
              </div>
              <span className='xs:hidden'>•</span>
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
          'absolute top-1 right-1 w-11 h-6 aspect-square lg:cursor-pointer flex justify-center items-centers rounded-full transition-all border',
          bgColor[reintegro.estado],
          borderColor[reintegro.estado],
          textColor[reintegro.estado]
        )}
      >
        <ChevronLeft
          strokeWidth={2.4}
          className='self-center w-5.5 h-5.5'
        />
      </button>
    </div>
  );
}
export default DetallesCard;
