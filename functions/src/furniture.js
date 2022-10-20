import { ObjectId } from "mongodb";
import dbConnect from "./dbConnect.js";

export async function getAllFurniture(req, res) {
    const db = dbConnect();
    const furnitureCollection = db.collection('furniture');

    const result = await furnitureCollection.find({}).toArray()
        .catch(err => {
            res.status(500).send({ success: false, message: err });
            return;
        })
    let message = "<marquee style='background-color: black; font-size:48pt;color:green'>";
    result.forEach(doc => message += `${doc.brand} ${doc.model} ${doc.type} ${doc.price} 😱 `);
    message += "</marquee>";
    res.status(201).send(message);
}

export async function addNewFurniture(req, res) {
    const db = dbConnect();
    const furnitureCollection = db.collection('furniture');

    const { brand, model, type, price } = req.body;
    const doc = { brand, model, type, price: Number(price) }

    doc.createdDate = new Date();

    const result = await furnitureCollection.insertOne(doc)
        .catch(err => {
            res.status(500).send({ success: false, message: err })
            return;
        })

    res.status(201).send({ success: true, message: result });
}

export async function updateFurniture(req,res){
    const db = dbConnect();
    const furnitureCollection = db.collection('furniture');

    const query = req.body;
    const id = {_id: new ObjectId(query.id)};
    delete query.id;
    const Query = {
        $set: query
    }

    const result = await furnitureCollection.findOneAndUpdate(id, Query)
    .catch(err => {
        res.status(500).send({success:false, message:err});
        return;
    })

    res.status(201).send({success:true, message: result});
}