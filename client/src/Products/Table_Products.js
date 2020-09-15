import React, { useEffect, useState } from "react";
//Material-ui
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import axios from "axios";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 17,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function Table_Products() {
  const [products, setProducts] = useState();
  useEffect(() => {
    if (!products) {
      axios.get("http://localhost:3000/shopify/products").then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
    }
  }, [products]);

  const classes = useStyles();
  return (
    <div style={{ width: "850px", marginRight: "auto", marginLeft: "auto" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Imagen&nbsp;</StyledTableCell>
              <StyledTableCell align="left">Producto&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Proveedor&nbsp;</StyledTableCell>
              <StyledTableCell align="right">Stock</StyledTableCell>
              <StyledTableCell align="right">Tipo&nbsp;</StyledTableCell>
              <StyledTableCell align="right">Precio</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products ? (
              products.map((product) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCell align="center">
                    <span>
                      <img
                        src={product.image && product.image.src}
                        height="100px"
                        width="100px"
                        alt=""
                      />
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.vendor}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.variants[0].inventory_quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.product_type}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.variants[0].price}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <p>No hay datos para mostrar</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ paddingLeft: "auto" }}>
        <tr>
          <td>
            <Button variant="contained" color="primary" href="/product">
              Crear Producto
            </Button>
          </td>
          <td>
            <div>
              <Button variant="contained" color="secondary" href="/">
                Cancelar
              </Button>
            </div>
          </td>
        </tr>
      </div>
    </div>
  );
}
