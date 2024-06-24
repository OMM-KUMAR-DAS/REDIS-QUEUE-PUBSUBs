const express= require('express')

const bodyParser = require('body-parser')

const app= new express()

const Redis = require('redis');

const client = Redis.createClient();

app.use(bodyParser.json())


app.post('/submitcode',async(req,res)=>{

    const{userId,problemId,language,code}= req.body

    try{

        await client.lPush("submissions",JSON.stringify({userId,problemId,language,code}))

        // will store this data to database

        res.json({
            success:true,
            message:'Pushed to queue'
        })

    }catch(err)
    {
         res.json({
            suucess:false,
            error:err
         })
    }
})



async function startServer()
{
    try{

        await client.connect()

        console.log("Successfully connected to Redis")

        

        app.listen(3000,()=>{

            console.log("Successfully connected to Port",3000)

        })



    }catch(err)
    {
          console.log("Failed to connect to Redis",err)
    }
}






startServer()