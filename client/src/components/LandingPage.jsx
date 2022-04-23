import { Link } from "react-router-dom"
import { LandingDiv , Ptext , Image , Bottom , Div } from "../Styles/Landing"
import LandingImg from "../Assests/LandingImg.png"

const LandingPage = () => {
    return (
        <LandingDiv>
            <Div>
                <Ptext>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia odio obcaecati accusamus provident similique nostrum eum. Accusamus, quo ipsa quae, odit quisquam non dolorum cum excepturi perspiciatis veritatis et optio?</Ptext>
                <Link to="/signIn">
                    <Bottom>Sign In</Bottom>
                </Link>
                <Link to="/logIn">
                    <Bottom>Log In</Bottom>
                </Link>
            </Div>
            <Image src={LandingImg} alt="Landing Img" />
        </LandingDiv>
    )
}

export default LandingPage