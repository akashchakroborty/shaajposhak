import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import ShopActionTypes from "../../redux/shop/shop.types";
import Spinner from "../../components/spinner/spinner.component";

const CollectionOverviewContainer = lazy(() =>
  import("../../components/collection-overview/collection-overview.container")
);
const CollectionContainer = lazy(() =>
  import("./../collection/collection.container")
);

const ShopPage = ({ match, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: ShopActionTypes.FETCH_COLLECTIONS_START
    });
  }, [dispatch]);

  return (
    <div className="shop-page">
      <Suspense fallback={Spinner}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionContainer}
        />
      </Suspense>
    </div>
  );
};

export default connect()(ShopPage);
