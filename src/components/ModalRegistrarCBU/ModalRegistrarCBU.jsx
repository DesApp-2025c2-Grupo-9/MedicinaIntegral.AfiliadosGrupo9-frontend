import Form from '../Form.jsx'
import Input from '../Input.jsx'
import Button from '../Button.jsx'
import { useEffect, useState } from 'react';
import { validarRegistroCBU } from '../../utils/validarRegistroCBU.js';


function ModalRegistrarCBU({isOpen, setIsOpen, onRegistrarCBU}) {
    const [registro, setRegistro] = useState({ 
        nroCBU:"",
        tipoDeCuenta:"",
        cuilOCuit:"", nombre:"",
        apellido:"" })
    const [errores, setErrores] = useState({});
    if (!isOpen) return null;



    useEffect(() => {
        document.body.classList.add("overflow-hidden");

    return () => {
        document.body.classList.remove("overflow-hidden");
    }
  }, []);

    const handleConfirmar = (e) => {
    e.preventDefault();
    const erroresValidados = validarRegistroCBU(registro); //agregue las validaciones
    setErrores(erroresValidados);

    if (Object.keys(erroresValidados).length === 0) {
        onRegistrarCBU(`${registro.nombre} ${registro.apellido}`, registro.nroCBU);
        setIsOpen(false);
    }
}
    const handleChange = (e) => {
        const { id, value } = e.target;

        const soloNumeros = ["nroCBU", "cuilOCuit"]; //esto es para bloquear numeros y letras
        const soloLetras = ["nombre", "apellido"];

        // Validar campos numéricos
        if (soloNumeros.includes(id)) {
            if (!/^\d*$/.test(value)) return;
        }

        // Validar campos de texto
        if (soloLetras.includes(id)) {
            if (!/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]*$/.test(value)) return;
        }
        setRegistro({ ...registro, [id]: value });

    };


    return (
        <div className='inset-0 h-full fixed top-0 left-0 z-50 bg-negro-translucido flex items-center justify-center'>
            <Form onSubmit={handleConfirmar} legend={"REGISTRO DE CBU"} className='w-3xl'>
                <p className="text-sm font-medium text-negro-principal pb-4 mt-[-8px]">Los pagos de reintegro se realizan por CBU. Corrobore que sea correcto.</p>
                <div className="flex flex-col w-full pb-4">

                    <Input
                        id="nroCBU"
                        label="N° de CBU"
                        placeholder="Ingresar CBU"
                        onChange={handleChange}
                        maxLength={22}
                        value={registro.nroCBU}
                        inputMode="numeric"

                    />

                    {errores.nroCBU && <p className="text-red-500 text-sm mt-1">{errores.nroCBU}</p>}
                    
                </div>
                <div className='flex flex-row gap-4 w-full pb-4'>
                    <div className='flex flex-col w-1/2 mr-2 gap-3'>
                        <div className='flex self-stretch flex-col justify-end items-start gap-2'>
                            <label htmlFor="tipoDeCuenta" className="text-base font-bold w-fit select-none">Tipo de cuenta</label>
                            <select className="outline-none border border-slate-300 rounded-lg h-fit p-3 min-w-40 w-full" name="tipoDeCuenta" id='tipoDeCuenta' onChange={handleChange}>
                                <option className="py-2 pl-3">Seleccionar tipo de cuenta</option>
                                <option className="py-2 pl-3" value="Cuenta corriente">Cuenta corriente</option>
                                <option className="py-2 pl-3" value="Caja de ahorro">Caja de ahorro</option>
                                <option className="py-2 pl-3" value="Cuenta sueldo">Cuenta sueldo</option>
                            </select>
                            {errores.tipoDeCuenta && <p className="text-red-500 text-sm mt-1">{errores.tipoDeCuenta}</p>}

                        </div>
                         <Input
                            id="nombre"
                            label="Nombre"
                            placeholder="Ingresar nombre"
                            onChange={handleChange}
                            maxLength={20}
                            value={registro.nombre}
                            inputMode="text"
                            />
                        {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}

                    </div>
                    <div className='flex flex-col w-1/2 ml-2 gap-3'>
                        <Input
                            id="cuilOCuit"
                            label="CUIL o CUIT"
                            placeholder="Ingresar CUIL o CUIT"
                            onChange={handleChange}
                            maxLength={11}
                            value={registro.cuilOCuit}
                            inputMode="numeric"
                            />

                            {errores.cuilOCuit && <p className="text-red-500 text-sm mt-1">{errores.cuilOCuit}</p>}
                            {errores.cuilOCuitFormato && <p className="text-red-500 text-sm mt-1">{errores.cuilOCuitFormato}</p>}
                            <Input
                                id="apellido"
                                label="Apellido"
                                placeholder="Ingresar apellido"
                                onChange={handleChange}
                                maxLength={20}
                                value={registro.apellido}
                                inputMode="text"
                                />
                            {errores.apellido && <p className="text-red-500 text-sm mt-1">{errores.apellido}</p>}

                    </div>
                </div>
                <div className='flex gap-4 w-full justify-end'>  
                    <Button state='active' style='outln' onClick={() => setIsOpen(false)}>Cancelar</Button>
                    <Button state='active' style='fill' type="submit">Confirmar</Button>
                </div>
            </Form>
        </div>
    )

}

export default ModalRegistrarCBU;