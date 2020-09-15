import React from "react"
import styles from "./EditProduct.module.css"
//Material-ui
import { Input, InputLabel, Container, FormControl, FormHelperText, Button, Grid} from "@material-ui/core"




export default function EditProduct (){
     return(
         <form className = {styles.form}>
     <Container maxWidth = "md">
         <Grid container alignItems="center" justify="flex-end" direction="column" spacing = {1}>
            <Grid item md = {12}>
       <FormControl>
           <InputLabel htmlFor = "">Producto</InputLabel>
           <Input type = "text" />
           <FormHelperText>Escriba su nuevo producto</FormHelperText>
       </FormControl>
            </Grid>
            <Grid item md = {12}>
       <FormControl>
       <InputLabel htmlFor = "">Proveedor</InputLabel>
           <Input type = "text" />
           <FormHelperText>Escriba su nuevo proveedor</FormHelperText>
       </FormControl>
           <Grid item md = {12}>
           </Grid>
       <FormControl>
       <InputLabel htmlFor = "">Stock</InputLabel>
           <Input type = "number" />
           <FormHelperText>Escriba su nuevo stock</FormHelperText>
       </FormControl>
       </Grid>
       <Grid item md = {12}>
       <FormControl>
       <InputLabel htmlFor = "">Precio</InputLabel>
           <Input type = "number" />
           <FormHelperText>Escriba su nuevo precio</FormHelperText>
       </FormControl>
       </Grid>
       <Grid direction="row" justify="center" alignItems="center">
       <Button variant = "contained" color = "primary">
           Editar
       </Button>
       <Button variant = "contained" color = "secondary" href = "/table">
           Cancelar
       </Button>
       </Grid>
       </Grid>
     </Container>
     </form>
     )

}