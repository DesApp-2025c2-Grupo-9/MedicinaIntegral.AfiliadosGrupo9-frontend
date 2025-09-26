import React from "react";
import BackButton from './BackButton';

function PaginationButtons({ onPrev, onNext }) {
  return (
    <div className="inline-flex items-center gap-3">
      {/*Botón previo*/}
      <BackButton onClick={onPrev} />

      {/*Botón next*/}
      <BackButton onClick={onNext} className='rotate-180' />
    </div>
  );
}

export default PaginationButtons;
