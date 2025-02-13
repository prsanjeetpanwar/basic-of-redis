import redis from 'redis';

const client = redis.createClient({
    url: 'redis://localhost:6379'
});

// Handle errors
client.on('error', (error) => {
    console.log(`Redis client error: ${error}`);
});


async function redisDataStructures(){
     try {
   await client.connect();
    await client.mSet("user:name","prsanjeet")
    const name=await client.get("user:name")
    console.log(name)

//    await client.mSet(["user:email","prsanjeet@gmail.com","user:age","25","user:city","bangalore"])
    // const email=await client.get("user:email")
    // console.log(email)
    // const age=await client.get("user:age")
    // console.log(age)
    // const city=await client.get("user:city")
    // console.log(city)
    
        // Set multiple key-value pairs


        await client.mSet(["user:nameof","prsanjeet","user:email","prsanjeet@gmail.com","user:age","25","user:city","bangalore"])

        const [nameof,email,age,city]=await client.mGet(["user:nameof","user:email","user:age","user:city"])
        console.log(nameof,email,age,city)


        console.log("-------------------------------Lists----------------------")

        await client.del("notes"); // Clear previous values
await client.lPush("notes",[ "note1", "note2", "note3"]);
await client.lPush("notes",[ "note4", "note5", "note5"]);

const notes = await client.lRange("notes", 0, -1);
console.log(notes);
const firsttask=await client.lPop("notes")
const secondTask=await client.lPop("notes")
console.log(firsttask,secondTask)
console.log(firsttask)
const remainingNotes=await client.lRange("notes",0,-1)
console.log(remainingNotes)
console.log("                                                                                   ")

console.log("-------------------------------Sets----------------------")
console.log("                                                                                   ")
await client.sAdd('user:nickName',['prasan','prasanjeet','prasanjeet123','prasanjeet1234'])
const nicknames=await client.sMembers('user:nickName')
console.log("the nick names are",nicknames)
const checkNickName=await client.sIsMember('user:nickName','prasaesen')
console.log("Is prasan a nickname",checkNickName)
console.log("                                                                                   ")

console.log("                                                                                   ")



await client.sRem("user:nickName","prasanjeet1234")
const updatedNickNames=await client.sMembers("user:nickName")
console.log("Updated nick names are",updatedNickNames)


//                     SHORTED SETS


//zadd, zrange,zrem,zrank,zscore,zrevrank,zrevrange,zcard,zcount,zincrby,zinterstore,zunionstore
await client.zAdd("cart", [
    { score: 2, value: JSON.stringify({ productid: 1, quantity: 2 }) },
    { score: 3, value: JSON.stringify({ productid: 2, quantity: 3 }) },
    { score: 4, value: JSON.stringify({ productid: 3, quantity: 4 }) },
    { score: 5, value: JSON.stringify({ productid: 4, quantity: 5 }) }
]);

const cart=await client.zRange("cart",0,-1)
console.log(cart)
// const cart1=await client.zRange("cart",0,1)
// console.log(cart1)

await client.zRem("cart",JSON.stringify({productid:3,quantity:4}))
const updatedCart=await client.zRange("cart",0,-1)
console.log("hello hello",updatedCart)

await client.zRem("cart",JSON.stringify({productid:1,quantity:2}))
const newUpdatedCart=await client.zRange("cart",0,-1)
console.log("hello hello",newUpdatedCart)

await client.zRem("cart",JSON.stringify("dfdf"))
const newnewCart=await client.zRange("cart",0,-1)
console.log("hello hellogf",newnewCart)

const extractWithScore=await client.zRangeByScoreWithScores("cart",0,5)
console.log(extractWithScore)

const count=await client.zCard("cart")
console.log(count)

const CardTwoRank=await client.zRank("cart",JSON.stringify({productid:2,quantity:3}))
console.log(CardTwoRank)

console.log("                                                                                   ")

//------------------------------------hSet--------------------------------------------------

await client.hSet("user",["name","prsanjeet","email","prsanjeet@gmail.com","age","25","city","bangalore"])

const user=await client.hGetAll("user")
console.log(user)

console.log("                                                                                   ")




    
        
     }
     catch(err){
            console.log("Error:",err)

     }
     finally{
     await client.quit();
     }
}

redisDataStructures()