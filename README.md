# GP Registration Service

Note: 
When creating patient accounts you have to use the following NHS numbers because we need to have a medical record associated with each new patient. 

- 94627888551
- 94627899401
- 94627903611
- 94627928871
- 94648146751

## Prerequisites

- Node.js
- Yarn or npm
- Docker (If you have a local MySQL database, you don't need this)

## Getting Started

Follow the instructions below to set up the project.

### 1. Clone the Repository

```bash
git clone https://github.com/kavin-du/gp-reg-service.git
cd gp-reg-service
```

### 2. Set Environment Variables

Create a `.env` file in the root directory of the `nestjs-backend` folder with the following environment variables:

```bash
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USERNAME=user
MYSQL_PW=user256
JWT_SECRET=mysecret123
```

### 3. Start the MySQL Database

- If you are using a local MySQL installation, you need to change the host, port, username, pw in the `.env` file accordingly. 

- If you are using Docker, you can use the MySQL Docker compose file in the following repository. The previous `.env` example is configured according to this compose file. 
```bash
git clone https://github.com/kavin-du/Docker-Compose-Files.git
cd Docker-Compose-Files/mysql
docker-compose -f mysql.yml up -d
```

### 4. Install Dependencies

```bash
cd react-frontend
yarn # or npm install
cd ../nestjs-backend
yarn # or npm install
```

### 5. Start the Frontend and Backend

```bash

# in the backend directory
yarn start:dev # or npm run start:dev

# in the frontend directory
yarn start # or npm start
```

The frontend should be accessible at `http://localhost:4000`.


