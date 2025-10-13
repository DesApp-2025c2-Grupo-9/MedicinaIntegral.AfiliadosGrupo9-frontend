
export default function ContenidoCartilla({ imagen, altImg, heightImg, descripcion, btnText, extraStyles = "" }) {
    return (
        <div className='relative'>
            <div className={`absolute z-10 ${extraStyles}`} >
                <p className="text-3xl text-white pb-4 max-w-lg">{descripcion}</p>
                <button className="bg-amber-300 p-2 rounded-md">{btnText}</button>
            </div>
            <img className={`${heightImg} w-full object-cover brightness-50 z-0`} src={imagen} alt={altImg} />
        </div>
    )
}