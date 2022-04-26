import { Div , Text , P , Span} from "../Styles/Footer"
import SocialList from "./SocialList"

const Footer = () => {

    return (
        <Div>

            <Text>
                <P>Hecho con <Span>❤️</Span> por Bruno Lococo{" "}
                {new Date().getFullYear()}</P>
            </Text>
            <SocialList></SocialList>
        </Div>
    )
}

export default Footer