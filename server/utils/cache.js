import { createClient } from 'redis';

import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.on('error', (err) => {
    console.error('Redis Client Error', err);
});
await client.connect();

const createCache = async(key, value) => {
    await client.set(key, JSON.stringify(value));
    return true; 
}

const getCache = async(key) => {
    const value = await client.get(key);
    if(value){
        console.log(`Cache hit for key: ${key}`);
    }
    return value ? JSON.parse(value) : null;
}

const flushCache = async (key) => {
    await client.del(key);
    console.log(`Cache flushed for key: ${key}`);
};

export { createCache, getCache, flushCache };