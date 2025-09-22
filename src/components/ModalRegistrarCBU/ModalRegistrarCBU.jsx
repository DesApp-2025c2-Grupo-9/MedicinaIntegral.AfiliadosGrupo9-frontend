import Form from '../Form.jsx'
import Input from '../Input.jsx'
import Button from '../Button.jsx'
import { useState } from 'react';

function ModalRegistrarCBU() {
    const [isOpen, setIsOpen] = useState(true);
    const [registro, setRegistro] = useState({ nroCBU:"nroCBU", tipoDeCuenta:"tipoDeCuenta", cuilOCuit:"cuilOCuit", nombre:"nombre", apellido:"apellido" })

    const handleConfirmar = () => {
        // Guardar datos en la base de datos..
        setIsOpen(false);  // Cierro el modal
    }

    const handleChange = (e) => {
        setRegistro({ ...registro, [e.target.id]:e.target.value });
    };


    return (
        <>
        {isOpen && 
            <div className='inset-0 h-full absolute z-50'>
                <div className='absolute z-30 w-full h-full bg-fondo-modal opacity-40 mix-blend-multiply'>
                </div>
                <div className='w-3xl absolute z-40 top-1/5 left-1/3'>
                    <Form onSubmit={handleConfirmar} legend={"REGISTRO DE CBU"}>
                        <p className="text-sm font-medium text-negro-principal pb-4 mt-[-8px]">Los pagos de reintegro se realizan por CBU. Corrobore que sea correcto.</p>
                        <div className='w-full flex'>
                            <Input id={"nroCBU"} label={"N° de CBU"} placeholder="Ingresar CBU" onChange={handleChange} />
                        </div>
                        <div className='flex flex-row gap-4 w-full pb-4'>
                            <div className='flex flex-col w-1/2 mr-2 gap-3'>
                                <div className='flex self-stretch flex-col justify-end items-start gap-2'>
                                    <label htmlFor="tipoDeCuenta" className="text-base font-bold w-fit select-none">Tipo de cuenta</label>
                                    <select className="outline-none border border-slate-300 rounded-lg h-fit p-3 min-w-40 w-full" name="tipoDeCuenta" id='tipoDeCuenta' onChange={handleChange}>
                                        <option className="py-2 pl-3" value="Cuenta corriente">Cuenta corriente</option>
                                        <option className="py-2 pl-3" value="Caja de ahorro">Caja de ahorro</option>
                                        <option className="py-2 pl-3" value="Cuenta sueldo">Cuenta sueldo</option>
                                    </select>
                                </div>
                                <Input id={"nombre"} label={"Nombre"} placeholder="Ingresar nombre" onChange={handleChange} />
                            </div>
                            <div className='flex flex-col w-1/2 ml-2 gap-3'>
                                <Input id={"cuilOCuit"} label={"CUIL o CUIT"} placeholder="Ingresar CUIL o CUIT" onChange={handleChange} />
                                <Input id={"apellido"} label={"Apellido"} placeholder="Ingresar apellido" onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex gap-4 w-full justify-end'>  
                            <Button state='active' style='outln' onClick={() => setIsOpen(false)}>Cancelar</Button>
                            <Button state='active' style='fill'>Confirmar</Button>
                        </div>
                    </Form>
                </div>
            </div>
        }
        </>
    )

}

export default ModalRegistrarCBU;