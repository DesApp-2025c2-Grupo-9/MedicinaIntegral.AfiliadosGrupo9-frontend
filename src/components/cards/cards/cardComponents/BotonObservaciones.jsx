function BotonObservaciones(props) {
  return (
    <div className="grid  row-start-4 justify-items-end">
      <button
        className="flex flex-row text-blue-500 hover:text-blue-600 p-1 justify-end cursor-pointer"
        onClick={props.onClick}
      >
        <span className="text-xs mr-1">Observaciones</span>
      </button>
    </div>
  );
}

export default BotonObservaciones;
