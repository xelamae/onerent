import React from 'react'
import Property from './Property'
import { Item } from 'semantic-ui-react'

const Properties = ({data : { loading, error, search, variables } }) => {
    if (loading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }
    return <Item.Group > { search.map( ( property, i ) => (  <Property s={variables.search} key={i} {...property}  /> ) ) } </Item.Group>;
    
};
export default Properties