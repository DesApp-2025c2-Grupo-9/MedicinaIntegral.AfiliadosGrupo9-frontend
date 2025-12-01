import { icons } from '../../../../utils/icons';
function BotonObservaciones(props) {


  return (
    <div>
      <button
        type='button'
        className='flex flex-row
        text-gray-600
        hover:bg-blue-100
        hover:text-blue-800
         p-1 justify-end cursor-pointer text-sm transition-colors
         rounded-full
         px-3
         bg-blue-50  border-s-gray-900 shadow-2xs
         '
        onClick={props.onClick}
        title='Ver observaciones'
      >
        <span></span>
        <span className='w-5 h-4'>{icons.observaciones}</span>
      </button>
    </div>
  );
}

export default BotonObservaciones;
