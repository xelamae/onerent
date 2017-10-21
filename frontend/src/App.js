import React, { Component } from 'react';
import './App.css';
import SearchArea from './Search.js'
import {
  Container,
  Segment,
} from 'semantic-ui-react'
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({
  networkInterface
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Segment>
          <div className="App">
            <Container>
              <SearchArea fluid/>
            </Container>
          </div>
      </Segment>
      </ApolloProvider>
    );
  }
}

export default App;
