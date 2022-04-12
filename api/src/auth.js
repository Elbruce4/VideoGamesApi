const {verify} = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

const isAuth = (req) => {
    const authorization = req.headers["authorization"];
    if(!authorization) throw new Error("You need to log in");
    const token = authorization.split(" ")[1];
    const {userId} = verify(token,ACCESS_TOKEN_SECRET);
    return userId
}

module.exports= {
    isAuth
}