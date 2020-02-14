const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const pg = require("pg");

const app = express();
/*
const {Client} = pg;
const conString = "postgresql://neetika:vP6S6Ief45af2zl3FJ4b@graphql-neetika.cnynbnl8gf9d.us-east-1.rds.amazonaws.com/graphql"
//Connect to psql from js
//
const client = new Client({
	connectionString : conString
});

client.connect(err => {
	if (err){
		console.error('connection error', err.stack);
	}
	else {
		console.log("connected");
	}
});*/

//  /graphql is middleware or single endpoint to handle all the graphql query
// node app handover the request to graphqlHTTP for this endpoint
app.use('/graphql',graphqlHTTP({
	schema,
	graphiql: true  // helps to test the server ,  developers can test the requests with graphiql without frontend
}));


app.listen(4000,() =>{
	console.log("now listening for requests on port 4000");
});