import React from "react";
import s from "./Footer.module.css";

function Footer() {
  return (
    <div className={s.footer}>
      <div className={s.authors}>
        <h4>Autores:</h4>
        <ul>
          <li>Julian Lucero</li>
          <li>Joaquin Quiroga</li>
          <li>Franco Silva</li>
          <li>German Moreno</li>
          
        </ul>
      </div>
      
    </div>
  );
}

export default Footer;