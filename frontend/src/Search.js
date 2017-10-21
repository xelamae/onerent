import React, { Component } from 'react'
import { Grid, Input } from 'semantic-ui-react'
import Properties from './Properties';
import { SearchProperties } from './Queries'
import { graphql } from 'react-apollo';

var SearchPropertiesWithData = graphql(SearchProperties, {
    options: { variables: { search: "" } },
})(Properties);

export default class SearchArea extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      var s = this.state.value;
      SearchPropertiesWithData = graphql(SearchProperties, {
        options: { variables: { search: s.toLowerCase() } },
      })(Properties);

      this.setState({
        isLoading: false,
      })

    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={16} >
            <Input fluid icon='search' placeholder='Search properties' loading={isLoading} onChange={this.handleSearchChange} />
        </Grid.Column>
        <SearchPropertiesWithData />
      </Grid>
    )
  }
}