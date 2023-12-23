const {connectToDb} = require("./dbConnect")

getActsOfChristmas = async function(latitude = null, longitude = null) {
    try {   
        const db = await connectToDb()
        const collection = await db.collection("acts")
        let query = {}
        if (latitude && longitude) {
            query = {
                $and: [
                { latitude: { $gte: latitude - 3, $lte: latitude + 3 } },
                { longitude: { $gte: longitude -3, $lte: longitude + 3 } },
                ],
            };
        }
        const result = await collection.find(query).toArray();
        return result;
    } catch(error) {
        console.log("There was an error trying to retrieve christmas acts from database", error)
    }
}

module.exports = getActsOfChristmas