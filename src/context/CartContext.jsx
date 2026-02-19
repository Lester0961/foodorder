import { createContext, useReducer, useEffect, useContext } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + (action.payload.quantity || 1),
                  addons: [
                    ...(item.addons || []),
                    ...(action.payload.addons || []),
                  ],
                  addonsPrice:
                    (item.addonsPrice || 0) +
                    (action.payload.addonsPrice || 0),
                }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, quantity: action.payload.quantity || 1 },
        ],
      };
    }

    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }

    case 'SET_SPECIAL_INSTRUCTIONS': {
      return {
        ...state,
        specialInstructions: action.payload.trim(),
      };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    { items: [], specialInstructions: '' },
    () => {
      try {
        const saved = localStorage.getItem('lutongPinoyCart');
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            items: parsed.items || [],
            specialInstructions: parsed.specialInstructions || '',
          };
        }
      } catch (e) {
        console.warn('Failed to load cart from localStorage');
      }
      return { items: [], specialInstructions: '' };
    }
  );

  useEffect(() => {
    localStorage.setItem(
      'lutongPinoyCart',
      JSON.stringify({
        items: cartState.items,
        specialInstructions: cartState.specialInstructions,
      })
    );
  }, [cartState]);

  const value = {
    cart: cartState.items,
    specialInstructions: cartState.specialInstructions,
    setSpecialInstructions: (text) =>
      dispatch({ type: 'SET_SPECIAL_INSTRUCTIONS', payload: text }),
    dispatch,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};