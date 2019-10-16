import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapsortToMap
} from "../../firebase/firebase.utils";

export const fetchCollectionsStartAsync = () => dispatch => {
  const collectionRef = firestore.collection("collections");
  dispatch({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
  });
  collectionRef
    .get()
    .then(snapShot => {
      const collectionMap = convertCollectionsSnapsortToMap(snapShot);
      dispatch({
        type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: collectionMap
      });
    })
    .catch(error => {
      dispatch({
        type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
        payload: error.message
      });
    });
};
