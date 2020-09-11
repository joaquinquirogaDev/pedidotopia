import React, { useEffect,useState } from "react";
import styles from "./Add_Product.module.css"

//Material-ui
import DescriptionIcon from '@material-ui/icons/Description';
import LabelIcon from '@material-ui/icons/Label';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Button from "@material-ui/core/Button";
import InputIcon from "@material-ui/icons/Input";
import CancelPresentationRoundedIcon from "@material-ui/icons/CancelPresentationRounded";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(0.7),
    },
  }));
   const [input, setInput] = useState({
     Product: "",
     Proveedor: "",
     Price: 0,
     Stock: 0,
   });

   const onSubmitHandle = function (event) {
     event.preventDefault();
     const data = {
       Product: input.Product,
       Price: input.Price,
       Proveedor: input.Proveedor,
       Stock: input.Stock,
     };
   }
   const handleInputChange = function (e) {
     setInput({
       ...input,
       [e.target.name]: e.target.value,
     });
     if (e.target.name === "Price" || e.target.name === "Stock") {
       setInput({ ...input, [e.target.name]: Number(e.target.value) });
    }
   };
  export default function Add_Product (){
    const [renderUpdate, setRenderUpdate] = useState(false);
    const classes = useStyles();
    return(
        <form className = {styles.form} onChange = {onSubmitHandle}>
            <div className = {styles.contenedor}>
                
            <div className={styles.inputcontenedor}>
            <i className={styles.icon}>{<LabelIcon />}</i>    
            <input 
                value = {input.Product && input.name}
                type="text"
                placeholder="Producto"
                onChange = {handleInputChange}
              />
            </div>
            <div className={styles.inputcontenedor}>
            <i className={styles.icon}>{<DescriptionIcon />}</i>    
            <input className = {styles.input}
                value = {input.Proveedor}
                type="text"
                placeholder="Prooveedor"
                onChange = {handleInputChange}
              />
            </div>
            <div className={styles.inputcontenedor}>
            <i className={styles.icon}>{<AttachMoneyIcon/>}</i>    
            <input className = {styles.input}
                 value = {input.Price}
                type="number"
                placeholder="Precio"
                onChange = {handleInputChange}
              />
            </div>
            <div className={styles.inputcontenedor}>
            <i className={styles.icon}>{<ShoppingBasketOutlinedIcon/>}</i>    
            <input className = {styles.input}
                // value = {input.Stock}
                type="number"
                placeholder="Stock"
                 onChange = {handleInputChange}
              />
            </div>
            <div className = {styles.buttons}>
            <Button
                onClick = {setRenderUpdate}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<InputIcon />}
                
              >
                Agregar
              </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  endIcon={<CancelPresentationRoundedIcon />}
                  href = "/table"
                  
                >
                Cancelar
                </Button>
            </div>
            </div>
        </form>
    );
}   
