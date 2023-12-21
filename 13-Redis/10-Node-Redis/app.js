// noinspection JSCheckFunctionSignatures
// 1.导入Redis库
import { createClient } from 'redis';
// 2.利用这个库连接到Redis服务器,监听连接成功还是失败
const client = await createClient({url: "redis://@127.0.0.1:6379"})
    .on('error', err => console.log('连接错误', err))
    .connect();
// 3.通过连接对象操作Redis
// await client.set('name', 'zs');
// const value = await client.get('name');
// console.log(value);

await client.HSET('user', 'name', 'zs');
const res = await client.HGETALL('user');
console.log(res);
await client.disconnect();
