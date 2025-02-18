# Text Sharing Service

This project is a Serverless Node.js application built with TypeScript. It uses AWS Lambda, API Gateway, and DynamoDB. For local development, it uses Serverless Offline and Docker for DynamoDB Local.

> **Note:** This project uses dummy AWS credentials for local testing. In production, be sure to use valid AWS credentials.

---

## Prerequisites

- [Docker](https://www.docker.com/get-started) (to run DynamoDB Local)
- [Node.js](https://nodejs.org/) and npm
- [AWS CLI](https://aws.amazon.com/cli/) (for creating the DynamoDB table in local mode)
- Git

---

## Setup

1. **Install Dependencies**

   ```bash
   npm install

   ```

2. **Configure Environment Variables**

   ```bash
   AWS_ACCESS_KEY_ID=dummy
   AWS_SECRET_ACCESS_KEY=dummy
   AWS_REGION=us-east-1
   DYNAMODB_TABLE_NAME=TextTable-dev
   DYNAMODB_ENDPOINT=http://localhost:8000
   IS_OFFLINE=true
   ```

## Running the Application Locally

1. **Start DynamoDB Local**

   ```bash
   docker compose up

   ```

2. **Create the DynamoDB Table**

   ```bash
   aws dynamodb create-table \
    --table-name TextTable-dev \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --endpoint-url http://localhost:8000 \
    --region us-east-1
   ```

To verify the table was created, run:

```bash
   aws dynamodb list-tables --endpoint-url http://localhost:8000 --region us-east-1
```

3. **Start the Serverless Application**

   ```bash
   npm run start
   ```
