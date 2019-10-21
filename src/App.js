import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import { createStructuredSelector } from "reselect";
import UserActionTypes from "./redux/user/user.types";
import { selectCurrentUser } from "./redux/user/user.selector";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const Checkout = lazy(() => import("./pages/checkout/checkout.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);

const App = ({ dispatch, currentUser }) => {
  useEffect(() => {
    dispatch({
      type: UserActionTypes.CHECK_USER_SESSION
    });
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            />
            <Route exact path="/checkout" component={Checkout} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(App);
