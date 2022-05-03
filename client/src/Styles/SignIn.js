import styled from "styled-components"

export const SignForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    align-items: center;
    margin-left: 525px;
`

export const Input = styled.input`
    width: 250px;
    height: 20px;
    background-color: #eebbc3;
    border-radius: 3px;
    margin-top: 1px;
    :hover{
        background-color: #fffffe;
    }
`

export const Bottom = styled.input`
    width: 150px;
    height: 40px;
    background-color: #ffc6c7;
`

export const Title = styled.h2`
    margin-right: 20px;
    color: #fffffe;
`

export const LinkLogIn = styled.p`
    margin-right: 17px;
    color: #fffffe;
`

export const Label = styled.label`
    color: #fffffe;
`