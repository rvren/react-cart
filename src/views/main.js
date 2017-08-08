import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import ProductList from './ProductList';
import Checkout from './Checkout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={ProductList} />
          <Route path='/home' component={ProductList} />
          <Route path='/checkout' component={Checkout} />
        </div>
      </BrowserRouter>
    )
  }
}


export default App