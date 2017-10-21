
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schema.js');

const app = express();

app.use(cors('*'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method");
    next();
});

const graphqlEndpoint = '/graphql';

app.use(
    graphqlEndpoint,
    bodyParser.json(),
    graphqlExpress({
      schema
    }),
  );

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint, schema: schema }));

app.listen(4000);