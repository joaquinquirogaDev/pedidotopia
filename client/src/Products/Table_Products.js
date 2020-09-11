import React, {useEffect,useState} from "react";
//Material-ui
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function createData(Producto, Stock, Tipo, Proveedor) {
    return { Producto, Stock, Tipo, Proveedor };
  }
  
  const rows = [
    createData("hola",5,"","PedidoTopia"),
    createData( "lenceria",20,"","PedidoTopia" ),
    createData("Pollera" ,10,"", "PedidoTopia"),
    createData("Lompa Roto",5,"","PedidoTopia"),
    createData("Camisa" ,15 ,"","PedidoTopia"),
  ];
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });




export default function Table_Products(){
  const [products,setProducts] = useState();
useEffect(() =>{
if(!products){
  fetch('http://localhost:3000/shopify/products', {
  method: 'GET',
}).then((response) =>{
console.log(response.data);
setProducts(response.data);
})

}
  },[products]);

  const classes = useStyles();
    return (
        <div style = {{marginRight: "480px", marginLeft: "480px"}}>
        <TableContainer  component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Producto&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Proveedor&nbsp;</StyledTableCell>
              <StyledTableCell align="right">Stock</StyledTableCell>
              <StyledTableCell align="right">Tipo&nbsp;</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.Producto}>
               
               <StyledTableCell align="left">{row.Producto}</StyledTableCell>
                <StyledTableCell align="center">{row.Proveedor}</StyledTableCell>
                <StyledTableCell align="right">{row.Stock}</StyledTableCell>
                <StyledTableCell align="right">{row.Tipo}</StyledTableCell>
            
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style = {{paddingLeft:"805px"}}>
                <tr>
                    <td>
                    <Button  variant="contained" color="primary" href = "/product">
                     Crear Producto
                    </Button>
                    </td>
                    <td>
                    <div >   
                    <Button  variant="contained" color="secondary" href = "/">
                     Cancelar
                    </Button>
                    </div> 
                    </td>
                </tr>
                </div>
      </div>
    )
}

