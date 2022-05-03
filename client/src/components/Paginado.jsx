import {Li , Div} from "../Styles/Paginado"

const Paginado = ({paginado,cantidad,cantidadXPagina}) => {

    let array = [];

    for (let i = 1; i <= Math.ceil(cantidad/cantidadXPagina); i++){
        array.push(i)
    }

    return (
        <Div>
            {
                array && array.map(obj => {
                    return <Li key={obj} onClick={()=>paginado(obj)}>
                        <button> {obj} </button>
                    </Li>
                })
            }
        </Div>
    )
}

export default Paginado