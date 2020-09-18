import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Add_Product from "./AddProduct/Add_Product.js";
import Table_Products from "./Products/Table_Products.js";
import styles from "./App.css";
import EditProduct from "./Edit_Product/EditProduct.js";
import Answer from "./Answer/Answer.js";
//Material-ui
import Button from "@material-ui/core/Button";
import Footer from "./Footer/Footer.jsx";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <h1>PedidoTopia</h1>
        {/* <div style = {{padding: "20px"}}>
        <Button  variant="contained" color="primary" href = "/product">
          Agregar Producto
        </Button> */}
        <div style={{ marginLeft: "978px" }}>
          <Button variant="contained" color="primary" href="/table">
            Listado de Productos
          </Button>
        </div>
        {/* </div> */}
        <hr />
        <Switch>
          <Route path="/product" exact>
            <Add_Product />
          </Route>
          <Route path="/table" exact>
            <Table_Products />
          </Route>
          <Route path="/" exact>
            <Footer />
          </Route>
          <Route path="/edit/:id" component={EditProduct} />
          <Route path="/answer/:id" component={Answer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
