import styled from "styled-components";

export const Div = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 115px;
    justify-content: space-around;
    width: 500px;
    border-radius: 10px;
    border: 3px solid #b8c1ec;
    margin-bottom: 20px;
    margin-top: 20px;
    margin-left: 430px;
    background-color: #b8c1ec;
    align-items: center;
`

export const CommentsDiv = styled.div`
    background-color: #eebbc3;
    border: 3px solid black;
    border-radius: 3px;

`

export const CommentsDivName = styled.div`
    background-color: #eebbc3;
`

export const H3 = styled.h3`
    background-color: #b8c1ec;
`

export const H6 = styled.h6`
    background-color: #b8c1ec;
`

export const P = styled.p`
    background-color: #eebbc3;
`
export const H4 = styled.h4`
    background-color: #eebbc3;
`

export const DivButton = styled.div`
    display: ${({open}) => !open ? "flex" : "none"};

    svg{
        width: 50px;
        height: 25px;
        margin-left: 900px;
        margin-top: 10px;
        fill: white;
    }

`

export const Button = styled.button`
    background-color: #eebbc3;
`