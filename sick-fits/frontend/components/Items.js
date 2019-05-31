import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Item from "./Item";
import Pagination from "./Pagination";
import { perPage } from "../config";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export default class Items extends Component {
  render() {
    return (
      <div>
        <Pagination page={this.props.page} />
        <Query
          query={ALL_ITEMS_QUERY}
          // EXPLANATION OF SKIP: if you're on page 1 * perPage (4) - 4, then we skip no items
          // if you're on page 2 * 4 - 4 = 4, skip 4 items
          // if you're on page 3 * 4 - 4 = 8, skip 8 items, and so on...
          variables={{ skip: this.props.page * perPage - perPage }}
        >
          {/** Lots more in the payload vv */}
          {({ data, error, loading }) => {
            console.log({ data, error, loading });
            // should prob check before returning, for loading/error
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item item={item} key={item.id} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </div>
    );
  }
}

export { ALL_ITEMS_QUERY };
