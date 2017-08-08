import React from 'react';
import './styles.css';

const ProductCard = (props) => (
    <div className="Card-container">
      <div className="Card">
        {(props.discount !== 0)
        ? <div className="Discount-strip">{props.discount}% off</div>
        : <div className="Null-discount-strip">0</div>}
        <img className="Card-logo" src={props.logo} alt="logo"/>
        <div className="Container">
          <div className="Card-footer">
            <span className="Item-name">{props.desc}</span>
            <div className="Card-sub-footer"> 
              <p className="Item-price">${props.price}</p> 
              <button className="Card-button"
                      onClick={props.addCart}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
);


export default ProductCard;
