import React from "react";
import { connect } from "react-redux";
import {
  CartContainer,
  ItemCountContainer,
  ShoppingIcon
} from "./cart-icon.styles";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

const CartIcon = ({ dispatch, itemCount }) => {
  return (
    <CartContainer onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

export default connect(mapStateToProps)(CartIcon);
