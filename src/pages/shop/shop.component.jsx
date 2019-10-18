import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CollectionOverviewContainer from "../../components/collection-overview/collection-overview.container";
import CollectionContainer from "./../collection/collection.container";
import ShopActionTypes from "../../redux/shop/shop.types";

class ShopPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: ShopActionTypes.FETCH_COLLECTIONS_START
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionContainer}
        />
      </div>
    );
  }
}

export default connect(null)(ShopPage);
