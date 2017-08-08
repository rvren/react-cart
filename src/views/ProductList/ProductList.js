import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ProductCard from '../../components/ProductCard'
import { getProductList } from '../../actions/listing';
import { updateSelectedPayload } from '../../actions/checkoutCart'



class ProductList extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
          productList: [],
          products: 'Cart-button-inactive'
        }; 
        this._addCart = this._addCart.bind(this);
        this._setActive = this._setActive.bind(this);
        this._showMessage =  this._showMessage.bind(this);
    }

   componentDidMount() {
      this.props.dispatch(getProductList());
    }

    componentWillReceiveProps(nextProps){
      nextProps.list.toJS().listArray 
      && this._renderItem(nextProps.list.toJS().listArray);
    }

    _renderItem(productList){
        this.setState({
          productList: productList.length > 0 ? productList : [...this.state.productList, ...productList]
        });
    }

    _setActive(items){
        this.setState({
          products: items.length > 0 ? 'Cart-button-active' : 'Cart-button-inactive'
        });
    }
    
    _addCart(product) {
      this.props.dispatch(updateSelectedPayload(product));
      this._showMessage(product);
      }
      
    _showMessage(product) {
      var x = document.getElementById("snackbar")
      x.className = "show";
      x.innerHTML = product.name + ' ' + "added to cart";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

  render() {
    let payload = this.props.cart.productPayload && this.props.cart.productPayload.length;
    return (
      <div>
        {
          payload
          ? <Link to="/checkout">
              <button className="Cart-button-active">
                Go to Cart
                <img src="https://cdn.shopify.com/s/files/1/0684/3433/t/6/assets/header-cart.png?4645735867218121726" className="Cart-image" alt="cart"/>
                &nbsp;({payload})
              </button>
            </Link>
          : <button className="Cart-button-inactive">
              Go to Cart 
              <img src="https://cdn.shopify.com/s/files/1/0684/3433/t/6/assets/header-cart.png?4645735867218121726" className="Cart-image" alt="cart"/>
            </button>
            
        }
         <div className="Product-list">
          { (this.state.productList && this.state.productList.length > 0 ) 
            ? this.state.productList.map((productmap, index) => { 
                        return <ProductCard key={index}  
                                            price={productmap.price}
                                            desc={productmap.name}
                                            logo={productmap.img_url}
                                            discount={productmap.discount}
                                            addCart={() => {this._addCart(productmap);}}/>
            })
            : <h1 className="Error-message">No products found</h1>
          }
        </div>
        <div id="snackbar"></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return { 
        list: state.listing,
        cart: state.checkoutCart,

    }
}

export default withRouter(connect(mapStateToProps)(ProductList))
