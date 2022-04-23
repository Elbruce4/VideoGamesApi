import { Div , Text} from "../Styles/Footer"
import SocialList from "./SocialList"

const Footer = () => {

    return (
        <Div>

            <Text>
                Hecho con <span>❤️</span> por Bruno Lococo{" "}
                {new Date().getFullYear()}
            </Text>
            <SocialList></SocialList>
        </Div>
    )
}

export default Footer