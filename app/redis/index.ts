import Redis from 'redis';
import { createCluster } from 'redis';

export default class RedisDB {
    private client: Redis.RedisClientType;
    protected cluster: Redis.RedisClusterType; 

    constructor(
            nodes: Array<{url: string}> = 
            [
                {url: 'redis://127.0.0.1:16379'}
            ]
        ) 
        {
            this.client = Redis.createClient();
            this.cluster = createCluster({
                rootNodes: nodes
            });
            this.client.on('error', err => console.log('Redis Client Error', err));
            this.cluster.on('error', (err) => console.log('Redis Cluster Error', err));
    }

    public async connDB() { await this.client.connect(); }
    public async connCluster() { await this.cluster.connect(); }

    public async set(key: string, value: string): Promise<void> {
        if(this.client.isOpen && this.client) await this.client.set(key, value);
    }

    public async get(key: string): Promise<string | null | undefined> {
        if(this.client.isOpen && this.client)
            return await this.client.get(key);
        return
    }

    public async del(key: string): Promise<void> {
        if(this.client.isOpen && this.client)
            await this.client.del(key);
    }

    public async hSet(key: string, object: any): Promise<void> {
        if(this.client.isOpen && this.client)
            await this.client.hSet(key, {...object});
    }

    public async hGetAll(key: string): Promise<any> {
        if(this.client.isOpen && this.client) {
            const session = await this.client.hGetAll(key);
            console.log(JSON.stringify(session, null, 2));
            return session;
        }
        return
    }

    public async quitDB(): Promise<void> {
        if(this.cluster.isOpen && this.cluster) {
            await this.client.disconnect();
            this.client.quit();
            console.log('Disconnected from Redis');
        }
        return
    }

    public async setToCluster(key: string, value: string) : Promise<void> {
        if(this.cluster.isOpen && this.cluster)
            await this.cluster.set(key, value);
        return
    }

    public async getFromCluster(key: string) : Promise<any> {
        if(this.cluster.isOpen && this.cluster)
            return await this.cluster.get(key);
        return
    }

    public async quitCluster(): Promise<void> {
        if(this.cluster.isOpen && this.cluster) {
            await this.cluster.disconnect();
            this.cluster.quit();
            console.log('Disconnected from Cluster');
        }
        return
    }

    public async setAllToDB(dataMap: Map<string, any>) {
        const promises: any = [];
        dataMap.forEach((value, key) => {
            promises.push(this.client.json.set(key, '$', value));
        });
        await Promise.all(promises);
    }
    // await Promise.all([
    //     this.client.json.set('user:1', '$', {
    //         "name": "Paul John",
    //         "email": "paul.john@example.com",
    //         "age": 42,
    //         "city": "London"
    //     }),
    //     this.client.json.set('user:2', '$', {
    //         "name": "Eden Zamir",
    //         "email": "eden.zamir@example.com",
    //         "age": 29,
    //         "city": "Tel Aviv"
    //     }),
    //     this.client.json.set('user:3', '$', {
    //         "name": "Paul Zamir",
    //         "email": "paul.zamir@example.com",
    //         "age": 35,
    //         "city": "Tel Aviv"
    //     }),
    // ]);
}