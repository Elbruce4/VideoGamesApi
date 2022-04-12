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

const sendAccessToken = (req, res, accessToken) => {
    res.send({
        accessToken,
        email : req.body.email
    })
}

const sendRefreshToken = (res, accessToken) => {
    res.cookie("refreshToken" , accessToken, {
        httpOnly : true,
        path : "/loginUser"
    })
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}