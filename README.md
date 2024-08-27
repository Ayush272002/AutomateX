## Running the frontend

```shell
docker pull ayush272002/zaper-frontend:latest

docker run -e NEXT_PUBLIC_API_BASE_URL="<backend_url>" -e NEXT_PUBLIC_WEBHOOK_URL="<webhook_url>" -p 3000:3000 ayush272002/zapier-frontend:latest
```

## Running primary-backend

```shell
docker pull ayush272002/zapier-primary-backend:latest

docker run -e PORT=8001 -e JWT_SECRET="<jwt_secret>" -e DATABASE_URL="<db_url>" -d -p 8001:8001 ayush272002/zapier-primary-backend:latest
```

## Running hooks

```shell
docker pull ayush272002/zapier-hooks:latest

 docker run -e PORT="8000" -e DATABASE_URL="<db_url>" -d -p 8000:8000 ayush272002/zapier-hooks:latest
```

## Running processor

```shell
 docker pull ayush272002/zapier-processor:latest

docker run -e DATABASE_URL="<db_url>" -e KAFKA_URI="<kafka_uri>" -e KAFKA_USERNAME="<username>" -e KAFKA_PASSWORD="<password>" -d -p 8002:8002 ayush272002/zapier-processor:latest
```

## Running worker

```shell
 docker pull ayush272002/zapier-worker:latest

 docker run -e DATABASE_URL="<db_url>" -e KAFKA_URI="<kafka_uri>" -e KAFKA_USERNAME="<username>" -e KAFKA_PASSWORD="<password>" -e SOL_PRIVATE_KEY="<priv_key_of_your_wallet>" -e SMTP_HOST="<host>" -e SMTP_PORT="587" -e SMTP_USERNAME="<username>" -e SMTP_PASSWORD="<password>" -e SMTP_SENDER="<sender_email>" -e SOL_RPC_URL="<sol_rpc>" -d -p 8003:8003 ayush272002/zapier-worker:latest
```
