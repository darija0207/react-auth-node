import React, { PropTypes }  from 'react';
import CartItem from "./CartItem";

const Cart = ({items, total, currency}) => {
    return (
      <div>
        <h4>Shopping Cart</h4>

        <div className="cart">
          <div className="panel panel-default">
            <div className="panel body">
              {items.length > 0 && (
                <ul>
                  {items.map(item => (
                    <li key={item.id}>
                      <CartItem {...item}/>
                    </li>
                  ))}
                </ul>
              )}
              {items.length === 0 && (
                <div>Cart is empty</div>
              )}
              <div className="cart_total">{total}{currency}</div>
            </div>
          </div>
        </div>
      </div>
    );
};


Cart.propTypes = {
  items: PropTypes.array,
  total: PropTypes.number,
  currency: PropTypes.string,
};

export default Cart;