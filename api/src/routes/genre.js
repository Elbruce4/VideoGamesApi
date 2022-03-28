const router = require("./index");
const  axios  = require('axios');
const {Gender} = require("../db");

/* const express = require('express');
const server = express(); */

const APIKEY = "3a27a92bca59469b80d14460d384d0aa";
console.log(router)

router.get("/genre" , async(req,res) => {

    console.log("entra");

    try {
        let data = await axios.get("https://api.rawg.io/api/genres?key=" + APIKEY);
        let types = data.data.results.map(obj => obj.name);
        types.map(obj => {
            Gender.create({name :obj})
        })
        res.send(types)
    } catch (error) {
        res.status(404).send(error)
    }
});

/* server.use('/', router); */

module.exports = router