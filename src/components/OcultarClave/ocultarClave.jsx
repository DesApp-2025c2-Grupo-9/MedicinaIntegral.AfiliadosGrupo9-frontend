import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './ocultarClave.css';

const OcultarClave = ({ id, placeholder, value, onChange, label }) => {
  const [mostrarClave, setMostrarClave] = useState(false);

  return (
    <div className='input-eye'>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={mostrarClave ? 'text' : 'password'}
        placeholder={placeholder}
        maxLength={6}
        value={value}
        onChange={onChange}
      />
      <span
        className='icon-eye'
        onClick={() => setMostrarClave(prev => !prev)}
      >
        {mostrarClave ? <FaEye /> : <FaEyeSlash />}
      </span>
    </div>
  );
};

export default OcultarClave;
