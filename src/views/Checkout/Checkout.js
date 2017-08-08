import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import {
  Link,
  withRouter
} from 'react-router-dom';
import { Route, Redirect } from 'react-router'
import { updateSelectedPayload , removeSelectedPayload} from '../../actions/checkoutCart';
import CheckoutItemCard from '../../components/CheckoutItemCard';



class Checkout extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
          item_length: 0,
          price: 0,
          discount: 0,
          type_discount: 0,
          total_price: 0,
          net_price: 0,
          products: []
        }; 
        this._addItem = this._addItem.bind(this);
        this._removeItem = this._removeItem.bind(this);
        this._groupItems = this._groupItems.bind(this);
    }

  _calculateParams(products) {
    let price = 0;
    let discount = 0;
    let type_discount = 0;
    let net_price = 0;
    let item_length = 0;
    products.forEach(function(element) {
        price = price + element.price;
        discount = discount + element.discount;
        (element.type == 'fiction') ? type_discount = type_discount + 15 : type_discount = type_discount + 0;
    }, this);
    net_price = price - discount - type_discount;
    item_length = products.length;
    this.setState({ price: price,
                    net_price : net_price,
                    discount:  discount,
                    type_discount: type_discount,
                    item_length: item_length,
                    products: this._groupItems(products)});
  }

  componentDidMount() {
    this.props.cart.productPayload && this._calculateParams(this.props.cart.productPayload);
  }

  _addItem(product) {
    this.props.dispatch(updateSelectedPayload(product));
    this.props.cart.productPayload && this._calculateParams(this.props.cart.productPayload);
  }

  _removeItem(product) {
    this.props.dispatch(removeSelectedPayload(product));
    this.props.cart.productPayload && this._calculateParams(this.props.cart.productPayload);
  }

  _groupItems(products) {
    
    var group_to_values = products.reduce(function(obj,item){
      obj[item.id] = obj[item.id] || [];
      obj[item.id].push(item);
      return obj;
    }, {});

    return Object.keys(group_to_values).map(function(key){
      return {id: key,
              nos: group_to_values[key].length,  
              discount: group_to_values[key][0].discount,
              img: group_to_values[key][0].img_url,
              name: group_to_values[key][0].name,
              price: group_to_values[key][0].price,
              type: group_to_values[key][0].type };
    });
  }

  render() {
    return (
      <div className="Checkout-container">
        <div className="Checkout-first-column">
           <h1 className="Summary-title">Order Summary</h1>
           <table className="Checkout-table">
            <thead>
              <tr className="Checkout-table-head">
                <td>Item</td>
                <td>Qty</td>
                <td>Price</td>
              </tr>
            </thead>
            </table>
              { ( this.state.products &&  this.state.products.length > 0 ) 
                ? this.state.products.map((productmap, index) => { 
                            return <CheckoutItemCard
                                        key={index} 
                                        logo={productmap.img}
                                        name={productmap.name}
                                        price={productmap.price}
                                        number={productmap.nos}
                                        addItem={() => {this._addItem(productmap);}}
                                        removeItem={() => {this._removeItem(productmap);}}/>
                                        
                                       
                })
                : null
              }
           
        </div>
        <div className="Checkout-second-column">
          <p className="Total-title">Total</p>
          <div className="Total-item">
            <span className="Item-text">Items ({this.state.item_length})</span>
            <span className="Item-text">${this.state.price}</span>
          </div>
          <div className="Total-discount">
            <span className="Item-text">Discount</span>
            <span className="Item-text">${this.state.discount}</span>
          </div>
           <div className="Total-type-discount">
            <span className="Item-text">Type Discount</span>
            <span className="Item-text">${this.state.type_discount}</span>
          </div>
          <div className="Total-order">
            <span className="Item-text">Order Total</span>
            <span className="Item-text">${this.state.net_price}</span>
          </div>
        </div>

       
      </div>
    );
  }
}



const mapStateToProps = state => {
    return { 
        cart: state.checkoutCart,

    }
}

export default withRouter(connect(mapStateToProps)(Checkout))
