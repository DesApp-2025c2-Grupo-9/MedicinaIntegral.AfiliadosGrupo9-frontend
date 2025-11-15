///bloqueo caracteres invalidos y limite de caracteres desde el teclado
  const soloLetrasYEspaciosConLimite = (max) => (e) => {
    const key = e.key;
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]$/;
    const teclasPermitidas = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];

  if (
    !regex.test(key) &&
    !teclasPermitidas.includes(key)
  ) {
    e.preventDefault();
  }
  const valorActual = e.target.value;
  if (valorActual.length >= max && !teclasPermitidas.includes(key)) {
    e.preventDefault();
  }

  };
  
export default soloLetrasYEspaciosConLimite;
