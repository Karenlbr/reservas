import { Redis } from "ioredis";

const redis = new Redis({
  port: 6379,
  host: "172.28.193.153",
});

export default redis;
