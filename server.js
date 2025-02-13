import redis from 'redis';

const client = redis.createClient({
    url: 'redis://localhost:6379'
});

// Handle errors
client.on('error', (error) => {
    console.log(`Redis client error: ${error}`);
});

async function testRedisConnection() {
    try {
        await client.connect();
        console.log('Connected to Redis');

        await client.set("one", "Prsanjeet");

        const extractValue = await client.get("one");
        console.log("Extracted Value:", extractValue); 

        const deleteCount = await client.del("one");
        console.log("Deleted Count:", deleteCount);

        const extractUpdateValue = await client.get("one");
        console.log("After Deletion:", extractUpdateValue); 

        await client.set('count', 1002)
        const incrementCount=await client.incr('count');
        console.log(incrementCount)
        const decrementCount=await client.decr('count');
        console.log(decrementCount)
        
    } catch (err) {
        console.log("Error:", err);
    } finally {
        await client.quit();
    }
}

testRedisConnection();
