import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import Error from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

// function to mutate data (create an item, in this case)
// can reference schema.graphql as to what method you're trying to hit
// pass in vars as args to the mutation handler, and then pass it to the actual mutation createItem
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
    }
  }
`;

class UpdateItem extends Component {
  // don't need any state bc you'll only put things in state that have changed
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    console.log({ name, type, value });
    this.setState({ [name]: val });
  };

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log("updating Item!");
    console.log(this.state);
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
    console.log("updated!");
  };

  render() {
    // apollo handles the loading boolean for us!!
    // variables is how they get the mapping b/w title, desc, price, etc.
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No item found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => {
                return (
                  <Form onSubmit={e => this.updateItem(e, updateItem)}>
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                      <label>
                        Title
                        <input
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Title"
                          defaultValue={data.item.title}
                          onChange={this.handleChange}
                          required
                        />
                      </label>
                      <label>
                        Price
                        <input
                          type="text"
                          id="price"
                          name="price"
                          placeholder="Price"
                          defaultValue={data.item.price}
                          onChange={this.handleChange}
                          required
                        />
                      </label>
                      <label>
                        Description
                        <textarea
                          type="text"
                          id="description"
                          name="description"
                          placeholder="Enter a Description"
                          defaultValue={data.item.description}
                          onChange={this.handleChange}
                          required
                        />
                      </label>
                      <button type="submit">
                        Sav{loading ? "ing" : "e"} Changes
                      </button>
                    </fieldset>
                  </Form>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
