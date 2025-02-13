import redis from 'redis';

const client=redis.createClient({
    host:'localhost',
    port:6379
})

client.on('error',(error)=>
console.log(`Redis client error:${error}`))


async function  testAdditionalFeatures(){
  try {

    await client.connect();
    const subscriber=client.duplicate();
    await subscriber.connect();
    await subscriber.subscribe('dummy-channel', (message, channel)=>{
console.log(`Received message ${message} on channel ${channel}`)
    })


    // now we will publish this message to a dummy channel
    await client.publish('dummy-channel','Hello World')
    await client.publish('dummy-channel','\kese ho')

    // we will wait for 1 second to make sure the message is received
    await new Promise(resolve=> setTimeout(resolve,1000))
    await subscriber.unsubscribe('dummy-channel')

await subscriber.quit()


console.log('------------------------PipeLine------------------------')



  }
  catch(err){
    console.log(err)

  }
  finally{
    client.quit()
  }
}
testAdditionalFeatures()