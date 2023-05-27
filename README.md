# Overview

Primarily backend solution for food delivery application with basic implementation in frontend part.

## Postman documentation

**Documentation**: https://documenter.getpostman.com/view/13574264/2s8Z75SV9E

### Getting Started

If you want to run this project on your local environment, please follow these steps:

Clone the repository:

```
git clone https://github.com/nedoder/TatjanaDoderovic_Omega.git
```

There are two parts of this project:

1. **server**: It is a web application that is used to manage the restaurants, orders, users, products, etc. It has a REST API that is used to communicate with the frontend.
2. **client**: This is the basic example of a website. It is a web application that is used to display the products and place order. It has a dashboard for admin to manage  products, restaurants, etc.

#### Server:

To run the `server` application, follow these steps:

```
cd server
```

Install dependencies:

```
npm install
```

Create .env file in server directory.
Now, copy the `.env.example` file to `.env` file and change the credientials with your own values.

Run docker

```
npm run docker:db
```

Run the database migrations

```
npm run db:migrate
```


To populate the database with dummy data, run the following command:

```
npm run db:seed
```

Start the development server with this command:

```
npm start
```

Your application is now running on http://localhost:3000

#### Client

To run the `client` application, follow these steps:

```
cd client
```

Install dependencies:

```
npm install
```
Now, you can run the frontend applicaton with the following command.

```
npm run dev
```

Your frontend application is now running on http://localhost:5173/


To login as admin, use username: nedoder, password: nedoder.