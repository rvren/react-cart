import React from 'react';
import './styles.css';

const CheckoutItemCard = (props) => (
    <div className="Checkout-Card-container">
      <div className="Item-box">
        <img src={props.logo} className="Item-logo" alt="logo"/>
        <span className="Item-name">
          {props.name}
        </span>
      </div>

      <div className="Item-qty-box">
        <span onClick={props.removeItem} className="Item-qty-symbol">-</span>
        <span className="Item-qty-name">
          {props.number}
        </span>
        <span onClick={props.addItem} className="Item-qty-symbol">+</span>
      </div>
      <p className="Item-price">${props.price}</p>
    </div>
);


export default CheckoutItemCard;
