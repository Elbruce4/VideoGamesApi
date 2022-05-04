import styled from "styled-components";

export const Div = styled.div`
    display: ${({open}) => open ? "flex" : "none"};
    color: white;
    flex-direction: column;
    margin-left: 350px;
    justify-content: space-around;
    width: 700px;
    border-radius: 10px;
    border: 3px solid #b8c1ec;;
    margin-top: 40px;
    margin-bottom: 20px;
`

export const DivNewComment = styled.div`
    display: ${({open}) => !open ? "flex" : "none"};
    color: white;
    margin-left: 700px;
    margin-top: 10px;

    svg{
        width: 50px;
        height: 25px;
        margin-left: 218px;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

export const Input = styled.input`
    width: 200px;
    height: 20px;
    margin: 5px;
    color: white;
`

export const TextArea = styled.textarea`
    width: 90%;
    height: 100px;
    margin: 5px;
    color: white;
`

export const CancelNewComment = styled.p`
    margin-left: 650px;
    width: 30px;
`

export const Button = styled.input`
    background-color: #eebbc3;
`