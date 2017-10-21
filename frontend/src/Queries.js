import { gql } from 'react-apollo';

export const AllProperties = gql`
{
  properties{
    id,
    street,
    city,
    state,
    zip,
    rent,
    user{ 
      id,
      firstName,
      lastName
    }
  }
}
`;
export const SearchProperties = gql`
query($search: String!){
  search(search: $search){
    id,
    street,
    city,
    state,
    zip,
    rent,
    user{ 
      id,
      firstName,
      lastName
    }
  }
}
`;


// export const AllPropertiesWithData = graphql(AllProperties)(Properties);
