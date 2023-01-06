// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

//Carga de Funcionalidades
import { configLoad } from "./container/app";
import { data } from "./constanst/constDataCarga.js";

//carga de las notificaciones
var toastElList = [].slice.call(document.querySelectorAll(".toast")),
    toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl);
    });
toastList.forEach((toast) => toast.show());

//carga de los informacion de ayudad
var popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]'),
    ),
    popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

window.onload = ()=>{
    //ejecucion de la precarga de la configuracion de parametros de carga
    configLoad();
}

/* 
C O D E W A R S
 R S I B X S K
  K B K Z Q D
   M M K Q U
    Z X B L
     X Z N
      X N
       L

 function triangle( row ) {
        
    let dataCompa = [
        'a','b','c','d','e','f','g','h','i','j','k',
        'l','m','n','o','p','q','r','s','t','u',
        'v','w','x','y','z'
    ], dataEnd = [], dtaCoor = row;

    for (let ind = 0; ind < row.length; ind++) {
        // console.log(row[ind])
        dataCompa.forEach((value,index)=>{
            if(row[ind] == value ){
                // console.log (value);
                console.log(index+1);
            } 
        })
    }
    
}triangle( 'C O D E W A R S' );
*/
