var express = require('express');
var addAct = require("../models/addActOfChristmas")
var getActsOfChristmas = require("../models/getActsOfChristmas")
var router = express.Router();


/* GET acts listing */
router.get('/', async function(req, res) {
  try {
    const {latitude, longitude} = req.query
    const result = await getActsOfChristmas(latitude, longitude)
    res.status(200).json(result)
  } catch(error) {
    console.log("There was an error in the routing function to get christmas acts: ", error)
  }
});

router.post('/', async function(req, res) {
  try {
    let {body} = req
    const newAct = {name: body.name, description: body.description, latitude: body.latitude, longitude: body.longitude}
    await addAct(newAct)
    res.json({message: "Sucesfully added", newAct: newAct})
    res.status(201)
  } catch(error) {
    console.error(`Error in attempt to add act:`, error)
    res.status(500).json({error: 'Internal server error'})
  }
});

module.exports = router;
