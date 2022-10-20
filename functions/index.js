import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { getAllFurniture } from "./src/furniture.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req,res) =>{
    res.send("<marquee style='font-size:48pt;color:blue'>Coming soon...</marquee>");
})
app.get("/furniture", getAllFurniture);


export const api = functions.https.onRequest(app);