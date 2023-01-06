//importacion de elementos y constantes requeridas
import { data, PORCENTAJE } from "../constanst/constDataCarga.js";

let todoCorrecto = true,
    pTotal = 0,
    pBGeneral = 0,
    cantPaletas = 0,
    cantidadCest = 0,
    pesoFaltente = 0.0;

//reiniciamos los valores para nueva carga de vehículo
function ReinitLoadVirtual() {
    data.pesoPromedio.value = "";
    data.pesoGeneral.value = "";
    data.pesoNeto.value = "";
    data.cesta17.value = "";
    data.cesta19.value = "";
    data.cesta23.value = "";
    data.cesta25.value = "";

    todoCorrecto = true;
    pTotal = 0;
    pBGeneral = 0;
    cantPaletas = 0;
    cantidadCest = 0;
    pesoFaltente = 0.0;
}

function validad(dat) {
    let info = document.getElementById("cargas"),
        c1 = 0.0,
        c2 = 0.0,
        c3 = 0.0,
        c4 = 0.0,
        temp = 0.0,
        tara = 0.0,
        casos = {
            img: "/montacarga.png",
            type: "Sin Definir",
        },
        error = "";
    // console.log(dta);
    console.log(data);
    //requerimiento de ejecución
    if (parseInt(data.pesoNeto.value) > parseInt(data.pesoGeneral.value)) {
        todoCorrecto = false;
        error += ` Error "Peso Neto" no debe ser mayor a Peso General. `;
    } else {
        let datError = "";
        //validación de campos vacíos
        for (const key in dat) {
            if (Object.hasOwnProperty.call(dat, key)) {
                // dat[key].value = Number(dat[key].value);
                if (dat[key].requery) {
                    if (
                        dat[key].value == null ||
                        dat[key].value.length == 0 ||
                        /^\s*$/.test(dat[key].value)
                    ) {
                        todoCorrecto = false;
                        datError += ` ${key}, `;
                    } else {
                        dat[key] =
                            dat[key].value.length > 0
                                ? dat[key]
                                : { value: 0, requery: 0 };
                        todoCorrecto = true;
                    }
                } else {
                    dat[key] =
                        dat[key].value.length > 0
                            ? dat[key]
                            : { value: 0, requery: 0 };
                    todoCorrecto = true;
                }
            }
            //borrado de valor en los input
            if (key != "pesoGeneral" && key != "pesoPromedio")
                document.getElementById(`${key}`).value = " ";

            error = ` Error los Siguientes Campos Vacíos: ${datError} `;
            // document.getElementById(`${key}`).focus()
        }
    }
    // console.log(error.length)
    if (todoCorrecto == true) {
        //calculos de cestas
        c1 = 1.7 * dat.cesta17.value;

        c2 = 1.9 * dat.cesta19.value;

        c3 = 2.3 * dat.cesta23.value;

        c4 = 2.5 * dat.cesta25.value;

        cantidadCest +=
            dat.cesta17.value +
            dat.cesta19.value +
            dat.cesta23.value +
            dat.cesta25.value;

        //SUMATORIA DE LOS PESOS A RESTAS DEL PESO NETO
        tara = c1 + c2 + c3 + c4 + dat.pesoTara.value;
        // tara = tara.toFixed(1);

        //formula de calculo de peso
        //
        temp = dat.pesoNeto.value > 0 ? dat.pesoNeto.value - tara : tara;

        pTotal += temp;

        //calculo de peso general
        if (dat.pesoGeneral.value.length > 0 && dat.pesoGeneral.requery == 0) {
            //calculo de promedio de peso
            data.pesoPromedio.valuePromedio =
                (dat.pesoGeneral.value * dat.pesoPromedio.value) / PORCENTAJE;

            //carga del promedio en  carga general
            if (dat.pesoPromedio.value.length > 0) {
                if (dat.pesoPromedio.opPromedio == true) {
                    dat.pesoGeneral.value =
                        parseFloat(dat.pesoGeneral.value) +
                        parseFloat(data.pesoPromedio.valuePromedio);
                } else {
                    dat.pesoGeneral.value =
                        parseFloat(dat.pesoGeneral.value) -
                        parseFloat(data.pesoPromedio.valuePromedio);
                }
            }

            pesoFaltente = dat.pesoGeneral.value - pTotal;

            //seleccion de Imagen para la carga
            if (pesoFaltente < 0) {
                // pesoFaltente = pesoFaltente * -1;
                casos.img = "/montacargaError.png";
                casos.type = "Sobrante";
            } else {
                casos.img = "/montacarga.png";
                casos.type = "Faltante";
            }
            // pesoFaltente =
            //     dat.pesoGeneral.value > pTotal
            //         ? dat.pesoGeneral.value - pTotal
            //         : pTotal - dat.pesoGeneral.value;
        }

        //
        //render del resultado final de carga
        //
        info.innerHTML = `
            <div class="card d-flex flex-columns justify-content-center" >
                <img  src="${
                    casos.img
                }" class="img-carga card-img-top rounded mt-4"  alt="...">
                <div class="card-body">
                    <h5 class="card-title">
                        PRODUCTO CARGADO SIN ESPECIFICACION
                    </h5>
                    <p class="card-text">
                        Producto cargado sin el Seguimiento de Lista de carga .
                    </p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item ">
                        Pesos Bruto: <strong>${dat.pesoNeto.value}</strong>
                    </li>
                    <li class="list-group-item text-dark ">
                        Pesos Tara: <strong>${tara}</strong>
                    </li>
                    <li class="list-group-item  contentDesctiption">
                        <span class = "">
                            cesta 1.7: <strong>${dat.cesta17.value}</strong>
                        </span>
                        <span class = "">
                            cesta 1.9: <strong>${dat.cesta19.value}</strong>
                        </span>
                        <span class = "">
                            cesta 2.3: <strong>${dat.cesta23.value}</strong>
                        </span>
                        <span class = "">
                            cesta 2.9: <strong>${dat.cesta25.value}</strong>
                        </span>
                        
                    </li>               
                </ul>
                <div class="card-body  contentDesctiption justify-content-between">
                    <span class= "text-dark ">
                        Peso Total: <strong>  ${pTotal.toFixed(0)} </strong> 
                    </span>
                    <span class="pesoSobrante text-dark "> 
                        Peso  ${casos.type}: 
                        <strong>  ${pesoFaltente} </strong> 
                    </span>
                    <span class= "text-dark "  id="datFaltante"> 
                        
                    </span>
                    <span class="cestas text-dark ">
                        Num Cesta: 
                        <strong>  ${
                            isNaN(cantidadCest) ? 0 : cantidadCest
                        } </strong> 
                    </span>
                    <span> 
                        
                    </span>
                </div>
                <button type="button" class="btn btn-lg btn-outline-primary mt-2 text-wrap" data-action ="Eliminar"  id= "Eliminar"> Eliminar </button>
            </div>
        `;

        pBGeneral += pTotal;
        cantPaletas++;

        document.getElementById("pesoNeto").focus();
    } else
        notifyFront({
            color: "",
            title: "Error",
            message: error,
        });
}

//render de notificaciones sobre la pantalla
function notifyFront(dta) {
    document.getElementById("alertContent").innerHTML = `
        <div class="toast-container position-absolute top-0 end-0 p-3">
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-${dta.color}">
                <img src="/favicon.png" class="rounded me-2" alt="Gestión Empresa" width="30px">
                    <strong class="me-auto">${dta.title}</strong>
                    <small class="text-muted ">2 seconds ago</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body text-danger">
                    <p class="text-danger">	
                    ${dta.message}
                    </p>
                </div>
            </div>
        </div>
	`;
}

// salida de las funciones necesarias a otros módulos
export { validad, ReinitLoadVirtual, notifyFront };
