import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
const app = express();

app.use(express.json())
app.set('view-engine', 'html')
app.use(cors({origin: true, credentials: true}));

const JWT_SECRET = "This website has been made by Farshid Hossain"

const server = "hossainfarshid:JUITfh-891@clusterfarshid.vcl5snh.mongodb.net";
const database = "JMS";

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${server}/${database}`);
        console.log("Connecion Successful");
    }
    catch (err) {
        console.log(err);
    }
};
connect();

var Schema = new mongoose.Schema({
    name:String,
    year:String,
    department:String,
    phone: Number,
    email:String,
    college:String,
    password: String
});

let collection = mongoose.model("collection", Schema);

const port = 8000;
const hostname = "localhost";

app.post("/signup", async(req, res)=>{
    let message = '';
    const data = new collection(req.body);
    const mail = await collection.find({ email: req.body.email });
    if(mail.length == 0){
        await data.save();
        res.status(200).send("OK")
    }
    else{
        res.status(400).send("Not OK");
    }
})

app.post("/login", async(req, res)=>{
    const mail = await collection.find({email: req.body.email});
    if(mail.length === 0){
        res.status(400).json({
            message: "You have not registered before. Please register first.",
        })
    }
    else{
        if(mail[0].password !== req.body.password){
            res.status(400).json({message: "Wrong Password"})
        }
        else{
            const token = jwt.sign(
                {
                    id: mail[0]._id,
                    email: mail[0].email
                },
                JWT_SECRET,
                {
                    expiresIn: '24h',
                }
            )
            const profiles = {
                name: mail[0].name,
                email: mail[0].email,
                college: mail[0].college,
                password: mail[0].password,
                year: mail[0].year,
                department: mail[0].department,
            }
            res.status(200).json({
                message: "OK",
                token: token,
                profileinfo: profiles
            })
        }
    }
})

app.post("/removeprofile", async(req, res)=>{
    const mail = await collection.deleteOne({ email: req.body.email });
    res.status(200).send("Deleted");
})

app.post("/checktoken", async(req, res)=>{
    try{
        const decode = jwt.verify(req.body.token, JWT_SECRET);
        res.status(200).send("OK");
    }
    catch(err){
        res.status(400).send("NOT Ok");
    }
})

app.listen(port, hostname, ()=>{
    console.log(`http://${hostname}:${port}`)
})