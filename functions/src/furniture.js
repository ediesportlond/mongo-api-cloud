import dbConnect from "./dbConnect.js";

export async function getAllFurniture(req, res){
    const db = dbConnect();
    const furnitureCollection = db.collection('furniture');

    const result = await furnitureCollection.find({}).toArray()
    .catch( err =>{
        res.status(500).send({success: false, message: err});
        return;
    })
    let message = "<marquee style='background-color: black; font-size:48pt;color:green'>";
    result.forEach(doc => message += `${doc.brand} ${doc.model} ${doc.type} ${doc.price} 😱 `);
    message += "</marquee>";
    res.status(201).send(message);
}