# 🗃️ Redis Quick Reference – Core Commands & Data Types

## 🔑 Basics

- **Key-Value Store**: Redis stores everything as key-value pairs.
- **In-Memory**: Data is stored in RAM – extremely fast.
- **Persistence**: Optional (RDB snapshots or AOF logs).
- **Use Cases**: Caching, sessions, queues, real-time analytics, pub/sub, leaderboard, rate limiting.

---

## 📦 String Commands (Default Type)

- `SET key value` – Set a value.
  - Options: `EX seconds`, `PX milliseconds`, `NX`, `XX`
- `GET key` – Get the value.
- `DEL key` – Delete key.
- `EXISTS key` – Returns 1 if exists, 0 otherwise.
- `KEYS pattern` – Get matching keys (e.g., `KEYS *`, `KEYS user:*`) – avoid in prod.
- `FLUSHALL` – Delete all keys from all databases.
- `FLUSHDB` – Delete all keys from the current database.
- `TTL key` – Get time to live.
  - `-1` = no expiration
  - `-2` = key does not exist
- `EXPIRE key seconds` – Set TTL.
- `PERSIST key` – Remove TTL (make key permanent).

---

## 📃 Lists (Ordered Collection, Allows Duplicates)

- `LPUSH key value` – Add to **start** of list.
- `RPUSH key value` – Add to **end** of list.
- `LPOP key` – Remove from **start**.
- `RPOP key` – Remove from **end**.
- `LRANGE key start stop` – Get range (`0 -1` for full list).
- `LLEN key` – Get list length.
- `LREM key count value` – Remove `count` occurrences of value.
- `LINDEX key index` – Get element at index.
- `LTRIM key start stop` – Trim list to specified range.

---

## 🔘 Sets (Unordered Collection, Unique Values)

- `SADD key value [value ...]` – Add value(s) to set.
- `SMEMBERS key` – Get all members.
- `SREM key value [value ...]` – Remove value(s).
- `SISMEMBER key value` – Check if value exists.
- `SCARD key` – Number of elements.
- `SRANDMEMBER key [count]` – Random member(s).
- `SUNION key [key ...]`, `SINTER`, `SDIFF` – Set operations.

---

## 🧩 Hashes (Key-Value Map inside a Key)

- `HSET key field value` – Set field.
- `HGET key field` – Get field.
- `HGETALL key` – All fields + values.
- `HDEL key field [field ...]` – Delete field(s).
- `HEXISTS key field` – Check if field exists.
- `HLEN key` – Number of fields.
- `HKEYS key` / `HVALS key` – Get all fields / values.

---

## 🔢 Sorted Sets (ZSET – Unique Values with Scores)

- `ZADD key score member [score member ...]` – Add/update member.
- `ZRANGE key start stop [WITHSCORES]` – Get range by index.
- `ZREVRANGE key start stop` – Reverse order.
- `ZRANGEBYSCORE key min max` – Get by score range.
- `ZREM key member [member ...]` – Remove member(s).
- `ZCARD key` – Count members.
- `ZSCORE key member` – Get score of member.
- `ZRANK key member` – Get index rank.

---

## 📢 Pub/Sub

- `PUBLISH channel message` – Send message.
- `SUBSCRIBE channel [channel ...]` – Receive messages.
- `UNSUBSCRIBE [channel ...]`

---

## 🔧 Other Useful Commands

- `TYPE key` – Show data type of key.
- `RENAME oldkey newkey` – Rename key.
- `MOVE key db` – Move key to another DB.
- `SELECT db` – Select DB index (0 by default).
- `INFO` – Show server stats.
- `MONITOR` – Debug real-time commands.
- `CLIENT LIST` – List connected clients.

---