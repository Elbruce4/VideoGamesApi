
const Paginado = ({paginado,cantidad,cantidadXPagina}) => {

    let array = [];

    for (let i = 1; i <= Math.ceil(cantidad/cantidadXPagina); i++){
        array.push(i)
    }

    return (
        <div>
            {
                array && array.map(obj => {
                    return <li key={obj} onClick={()=>paginado(obj)}>
                        <button> {obj} </button>
                    </li>
                })
            }
        </div>
    )
}

export default Paginado