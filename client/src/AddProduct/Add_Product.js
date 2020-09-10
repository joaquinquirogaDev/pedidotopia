import React from "react";
import styles from "./Add_Product.module.css"
//Material-ui
import DescriptionIcon from '@material-ui/icons/Description';
import LabelIcon from '@material-ui/icons/Label';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Button from "@material-ui/core/Button";
import InputIcon from "@material-ui/icons/Input";
import CancelPresentationRoundedIcon from "@material-ui/icons/CancelPresentationRounded";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(0.7),
    },
  }));
export default function Add_Product (){
    const classes = useStyles();
    return(
        <form className = {styles.form}>
            <div className = {styles.contenedor}>
                
            <div className={styles.inputcontenedor}>
            <i className={styles.icon}>{<LabelIcon />}</i>    
            <input 
                type="text"
                placeholder="Titulo"
                
              />
            </div>
            <div className={styles.inputcontenedor}>
            <i className={styles.icon}>{<DescriptionIcon />}</i>    
            <input className = {styles.input}
                type="text"
                placeholder="Descripcion"
              />
            </div>
            <div className={styles.inputcontenedor}>
            <i className={styles.icon}>{<AttachMoneyIcon/>}</i>    
            <input className = {styles.input}
                type="number"
                placeholder="Precio"
              />
            </div>
            <div className = {styles.buttons}>
            <Button
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
                >
                Cancelar
                </Button>
            </div>
            </div>
        </form>
    )
}   
