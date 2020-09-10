import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Add_Product from "./AddProduct/Add_Product.js"
import styles from "./App.css"
//Material-ui
import Button from '@material-ui/core/Button';




function App() {
 
  return (
    <Router>
      <div className = {styles.App}>
        <h1>PedidoTopia</h1>
        <div>
        <Button variant="contained" color="primary" href = "/product">
          Agregar Producto
        </Button>
        </div>
        <hr/>
      <Switch>
         <Route path = "/product" exact>
           <Add_Product/>
         </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
