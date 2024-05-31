export const initialState = {
  basket: localStorage.getItem("basket")
    ? JSON.parse(localStorage.getItem("basket"))
    : {
        priceTotal: 0,
        qtyTotal: 0,
        products: [],
      },
  user: null,
};

export const getBasketTotal = (basket) =>
  basket.products?.reduce((amount, item) => item.price * item.qte + amount, 0);

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET": {
      const index = state.basket.products.findIndex(
        (productItem) => productItem.product === action.item.product
      );
      let newProduct = [...state.basket.products];
      let newQtyTotal = state.basket.qtyTotal;
      let newPriceTotal = state.basket.priceTotal;

      if (index >= 0) {
        newProduct[index] = {
          ...newProduct[index],
          qte: newProduct[index].qte + 1,
        };
        newQtyTotal += 1;
        newPriceTotal += newProduct[index].price;
      } else {
        const newItem = { ...action.item, qte: 1 };
        newProduct.push(newItem);
        newQtyTotal += 1;
        newPriceTotal += newItem.price;
      }

      localStorage.setItem(
        "basket",
        JSON.stringify({
          priceTotal: newPriceTotal,
          qtyTotal: newQtyTotal,
          products: newProduct,
        })
      );

      return {
        ...state,
        basket: {
          priceTotal: newPriceTotal,
          qtyTotal: newQtyTotal,
          products: newProduct,
        },
      };
    }
    case "EMPTY_BASKET":
      localStorage.removeItem("basket");
      return {
        ...state,
        basket: {
          priceTotal: 0,
          qtyTotal: 0,
          products: [],
        },
      };
    case "REMOVE_FROM_BASKET": {
      const removeIndex = state.basket.products.findIndex(
        (productItem) => productItem.product === action.item.id
      );
      if (removeIndex >= 0) {
        let newRemoveBasket = [...state.basket.products];
        let removeQtyTotal = state.basket.qtyTotal;
        let removePriceTotal = state.basket.priceTotal;

        removeQtyTotal -= newRemoveBasket[removeIndex].qte;
        removePriceTotal -=
          newRemoveBasket[removeIndex].price * newRemoveBasket[removeIndex].qte;
        newRemoveBasket.splice(removeIndex, 1);

        localStorage.setItem(
          "basket",
          JSON.stringify({
            priceTotal: removePriceTotal,
            qtyTotal: removeQtyTotal,
            products: newRemoveBasket,
          })
        );

        return {
          ...state,
          basket: {
            priceTotal: removePriceTotal,
            qtyTotal: removeQtyTotal,
            products: newRemoveBasket,
          },
        };
      } else {
        console.warn(
          `Can't remove product (product: ${action.item.id}) as it's not in basket!`
        );
        return state;
      }
    }
    case "INCREASE_QUANTITY": {
      // console.log('INCREASE_QUANTITY ',action.item.id)
      const increaseIndex = state.basket.products.findIndex(
        (productItem) => productItem.product === action.item.id
      );
      let newIncreaseBasket = [...state.basket.products];
      let increaseQtyTotal = state.basket.qtyTotal;
      let increasePriceTotal = state.basket.priceTotal;

      if (increaseIndex >= 0) {
        newIncreaseBasket[increaseIndex] = {
          ...newIncreaseBasket[increaseIndex],
          qte: newIncreaseBasket[increaseIndex].qte + 1,
        };
        increaseQtyTotal += 1;
        increasePriceTotal += newIncreaseBasket[increaseIndex].price;

        localStorage.setItem(
          "basket",
          JSON.stringify({
            priceTotal: increasePriceTotal,
            qtyTotal: increaseQtyTotal,
            products: newIncreaseBasket,
          })
        );
      }

      return {
        ...state,
        basket: {
          priceTotal: increasePriceTotal,
          qtyTotal: increaseQtyTotal,
          products: newIncreaseBasket,
        },
      };
    }
    case "DECREASE_QUANTITY": {
      const decreaseIndex = state.basket.products.findIndex(
        (productItem) => productItem.product === action.item.id
      );
      let newDecreaseBasket = [...state.basket.products];
      let decreaseQtyTotal = state.basket.qtyTotal;
      let decreasePriceTotal = state.basket.priceTotal;

      if (decreaseIndex >= 0 && newDecreaseBasket[decreaseIndex].qte > 1) {
        newDecreaseBasket[decreaseIndex] = {
          ...newDecreaseBasket[decreaseIndex],
          qte: newDecreaseBasket[decreaseIndex].qte - 1,
        };
        decreaseQtyTotal -= 1;
        decreasePriceTotal -= newDecreaseBasket[decreaseIndex].price;
      } else if (
        decreaseIndex >= 0 &&
        newDecreaseBasket[decreaseIndex].qte === 1
      ) {
        decreaseQtyTotal -= 1;
        decreasePriceTotal -= newDecreaseBasket[decreaseIndex].price;
        newDecreaseBasket.splice(decreaseIndex, 1);
      }

      localStorage.setItem(
        "basket",
        JSON.stringify({
          priceTotal: decreasePriceTotal,
          qtyTotal: decreaseQtyTotal,
          products: newDecreaseBasket,
        })
      );

      return {
        ...state,
        basket: {
          priceTotal: decreasePriceTotal,
          qtyTotal: decreaseQtyTotal,
          products: newDecreaseBasket,
        },
      };
    }
    case "authUser":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
