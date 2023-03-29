const express = require('express');
const cors = require('cors')
require('dotenv').config()


const app = express();
const { Connection } = require('./config/db');
const {rate_limitor}=require('./middleware/rate_limiter')


app.use(express.json())
app.use(cors())

app.get('/',rate_limitor,(req,res)=>{
    try{

        res.status(200).send("This is the base router of Rate Limitor")
        res.end()
    }
    catch(err){
        console.log(err)
        res.status(500).send({'msg':"Something went wrong"})
    }
})

app.listen(2700, async () => {
    try {
        await Connection
        console.log('Connected to the database')
    }
    catch (err) {
        console.log(err)
    }
})

