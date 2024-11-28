import React, { children, createContext, useReducer, useContext } from 'react'

const CartStateContext = createContext();
const CartDispatchContex = createContext();
const reducer = (state, action) => {
  // console.log('Reducer Action:', action); // Log action being dispatched
  switch (action.type) {
    case 'ADD':
      // console.log('Adding Item:', action);
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.id,
            name: action.name,
            price: action.price,
            qty: action.qty,
            size: action.size,
            img: action.img,
          }
        ]
      };
    case 'UPDATE':
      console.log('Updating Item:', action);
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id
            ? { ...item, qty: parseInt(item.qty) + parseInt(action.qty), price: item.price + action.price }
            : item
        )
      };
    case 'REMOVE':
      console.log('Removing Item:', action);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    case 'DROP':
      // console.log('Removing Item:', action);
      return { items: [] }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  return (
    <CartDispatchContex.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContex.Provider>
  )
}

export const useCart = () => useContext(CartStateContext)

export const useCartDispatch = () => useContext(CartDispatchContex)