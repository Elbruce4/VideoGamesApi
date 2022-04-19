const {sign} = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET , REFRESH_TOKEN_SECRET} = process.env;

const createAccessToken = userId => {
    return sign({userId} , ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    })
}

const createRefreshToken = userId => {
    return sign({userId} , REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    })
}

const sendAccessToken = (req, res, accessToken, user) => {
    return res.send({
        accessToken,
        user,
        message : "Logueo existoso"
    })
}

const sendRefreshToken = (res, accessToken) => {
    return res.cookie("refreshToken" , accessToken, {
        httpOnly : true,
        path : "/refresh_token"
    })
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}