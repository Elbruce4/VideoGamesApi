import {Link} from "react-router-dom"
import { Div , P , H2 , H4 , Button } from "../Styles/Games"

const Games = ({props}) => {

    return (
        <Div>
            <H2>{props.name}</H2>
            <H4>{props.date}</H4>
            <H4>{props.rating}</H4>
            <P>{props.desc}</P>
            <Link to={`/${props.id}`}>
                <Button>Ver comentarios</Button>
            </Link>
        </Div>
    )

}

export default Games