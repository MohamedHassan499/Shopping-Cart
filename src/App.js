import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';

import NavBar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import NotFound from "./components/NotFound";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Admin from './components/Admin';
import ProductForm from "./components/ProductForm";


class App extends Component {
  state = {
    products: []
  };

  async componentDidMount(){
    const {data} = await axios.get('http://localhost:3000/products/')
    this.setState({products: data})
    console.log(this.state)
  }

  handleReset = () => {
    //Clone
    let products = [...this.state.products];
    //Edit
    products = products.map((p) => {
      p.count = 0;
      return p;
    });
    //Set state
    this.setState({ products });
  };

  IncrementHandler = (product) => {
    //Clone
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    //Edit
    products[index].count++;
    //Set State
    this.setState({ products });
  };

  handleDelete = (product) => {
    //Clone
    const products = [...this.state.products];
    const index = products.indexOf(product);
    //Edit
    products.splice(index, 1);
    //Set State
    this.setState({ products });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          productsCount={this.state.products.filter((p) => p.isInCart).length}
        />
        <main className="container">
        <Switch>
          <Route path='/products/:id/:name?' render={(props) => (
            <ProductDetails
              products = {this.state.products} 
              {...props}
              />
          )}/>
          <Route path = '/home' component={Home}/>
          <Route path = '/porductform/id?' component={ProductForm}/>
          <Route path = '/admin' render={(props) => (
            <Admin
              products={this.state.products}
              {...props}
              />
          )}/>
          <Route path = '/menu' render={(props) => (
            <Menu
              products={this.state.products}
              {...props} />
          )}/>
          <Route path = '/about' component={About}/>
          <Route path = '/contact' component={Contact}/>
          <Route path = '/cart' render={(props) => (
              <Cart
              products={this.state.products}
              onIncrement={this.IncrementHandler}
              onDelete={this.handleDelete}
              onReset={this.handleReset}
              {...props}
            />
          )}/>
          <Route path = '/notfound' component={NotFound}/>
          <Route path='/login' component={Login}/>
          <Redirect from='/' exact to='/home' component={Home}/>
          <Redirect to='/notfound'/>
          { 
            //<Route path = '/cart' component={Cart}/>
          }
        </Switch>

          {/* <Cart
            products={this.state.products}
            onIncrement={this.IncrementHandler}
            onDelete={this.handleDelete}
            onReset={this.handleReset}
          /> */}
        </main>
      </React.Fragment>
    );
  }
}

export default App;
