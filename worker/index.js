
const Redis= require('redis')

const client= Redis.createClient()

//publish to the channel


async function publishtoPUBSUB(item)
{
    try{

        console.log(item)

        const{userId,problemId}= JSON.parse(item)

        //do the necessary logic or operations and pushed the status to the database also(you can implement )


        await client.PUBLISH(`userId:${userId}`,JSON.stringify({problemId,status:'Accepted'}))

        console.log("Successfully published to a channel")



        
     



    }catch(err)

    {
       console.log("Failed to publish to a particular channel")
    }
}



async function startworker()


{
    try{


        await client.connect()

        console.log("Successfully connected Worker to Redis")

       

        while(1)

            {
                try{

                    //here you are poping the task from the queue with the help of worker

                     const response= await client.brPop('submissions',0)

                     console.log(JSON.parse(response.element))

                     //after poping you do the necessary logic for solving the task and publish the message to any particular channel

                    publishtoPUBSUB(response.element)

                }catch(err)
                {
                    console.log(err)
                }
            }
    }

    catch(err)

    {
        console.log("Failed to connect worker with Redis")
    }

}



startworker()
