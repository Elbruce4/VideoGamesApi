import styled from "styled-components"

export const Div = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 115px;
    justify-content: space-around;
    width: 500px;
    border-radius: 10px;
    border: 3px solid #b8c1ec;
    margin-bottom: 20px;
    margin-top: 20px;
    background-color: #b8c1ec;
    align-items: center;
`

export const DivOutside = styled.div`
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

export const DivComments = styled.div`
    background-color: #fffffe;
`

export const InsideDiv = styled.div`
    background-color: #b8c1ec;
    align-items: center;
    display: flex;
    flex-direction: column;
`

export const P = styled.p`
    background-color: #b8c1ec;
    
`

export const PTitle = styled.p`
    background-color: #b8c1ec;
    width: 60px;
    
`

export const H2 = styled.h2`
    background-color: #b8c1ec;
`

export const DivForm = styled.div`
    display: ${({open}) => open ? "flex" : "none"};
    color: white;
    flex-direction: column;
    margin-left: 350px;
    justify-content: space-around;
    width: 600px;
    border-radius: 10px;
    border: 3px solid #b8c1ec;;
    margin-top: 40px;
    margin-bottom: 20px;
    margin-left: 50px;
`

export const DivButton = styled.div`
    display: ${({open}) => !open ? "flex" : "none"};

    svg{
        width: 50px;
        height: 25px;
        margin-left: 650px;
    }

`


export const CancelNewComment = styled.p`
    margin-left: 550px;
    width: 30px;
`