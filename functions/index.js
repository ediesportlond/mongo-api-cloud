import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { getAllFurniture, addNewFurniture, updateFurniture } from "./src/furniture.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req,res) =>{
    res.send("<marquee style='font-size:48pt;color:white; background-color: black'>Coming soon...</marquee>");
})
app.get("/furniture", getAllFurniture);
app.post("/furniture/addnew", addNewFurniture);
app.post("/furniture/update", updateFurniture);


export const api = functions.https.onRequest(app);