import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CollectionOverviewContainer from "../../components/collection-overview/collection-overview.container";
import CollectionContainer from "./../collection/collection.container";
import ShopActionTypes from "../../redux/shop/shop.types";

const ShopPage = ({ match, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: ShopActionTypes.FETCH_COLLECTIONS_START
    });
  }, [dispatch]);

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
};

export default connect()(ShopPage);
