import { React, useContext, Fragment } from "react";

import CartContext from "../store/cart-context";
import CartItem from "./CartItem";

const BackDrop = (props) => {
  return (
    <div
      className="w-full h-screen bg-neutral-800 opacity-[0.8] fixed  z-20 "
      onClick={props.toHide}
    ></div>
  );
};

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartRemoveHandler = (id) => {
      cartCtx.removeItem(id);
    };

    const cartAddHandler = (item) => {
      cartCtx.addItem({...item , amount: 1});
    };

  const cartItems = (
    <ul>
          {cartCtx.items.map((item) => (
              <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price}
                  onRemove={ cartRemoveHandler.bind(null , item.id)}  onAdd ={cartAddHandler.bind(null , item)}
              />
      ))}
    </ul>
  );

  return (
    <Fragment>
      <BackDrop toHide={props.toHide} />
          <div className="fixed top-[7rem] left-1/4 flex flex-col p-5  z-30 bg-primary text-white w-1/2 min-h-[560px] rounded-xl">
              
              <h1 className="text-3xl font-semibold  text-center mb-4">Cart</h1>
              <div className="max-h-[23rem] overflow-y-auto">{cartItems}</div>
              <div className="mt-auto">
                  <div className="flex justify-between ">
                      <div className="flex items-center font-bold text-3xl">Total Amount</div>
                        <div>{totalAmount}</div>
                  </div>
              {hasItems && <div className="flex justify-end"><button className="p-3  bg-red-400 rounded-xl">Order</button></div>}
                  
              </div>
        
      </div>
    </Fragment>
  );
};

export default Cart;
