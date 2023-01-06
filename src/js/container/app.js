//carga de constantes
import { $DOM, ElementApp, configLoadVehiculo, data } from "../constanst/constDataCarga.js";
// carga de Modulos
import { validad, ReinitLoadVirtual, notifyFront } from "../pure/carga.js";

// function de captura de dataGlobalALL
function AllData(evalueNeto = true) {
    let pesoNeto = $DOM.querySelector("#pesoNeto"),
        pesoTara = $DOM.querySelector("#pesoTara"),
        cesta17 = $DOM.querySelector("#cesta17"),
        cesta19 = $DOM.querySelector("#cesta19"),
        cesta23 = $DOM.querySelector("#cesta23"),
        cesta25 = $DOM.querySelector("#cesta25"),
        pesoGeneral = $DOM.querySelector("#pesoGeneral"),
        pesoPromedio = $DOM.querySelector("#pesoPromedio");

    data.pesoNeto = {
        value:
            evalueNeto == true && pesoNeto.value.length > 0
                ? pesoNeto.value
                : 0,
        requery: pesoNeto.dataset["req"] == 1 ? 1 : 0,
    };

    data.pesoTara = {
        value: pesoTara.value.length > 0 ? pesoTara.value : 0,
        requery: pesoTara.dataset["req"] == true ? 1 : 0,
    };

    data.cesta17 = {
        value: cesta17.value.length > 0 ? cesta17.value : 0,
        requery: cesta17.dataset["req"] == true ? 1 : 0,
    };

    data.cesta19 = {
        value: cesta19.value.length > 0 ? cesta19.value : 0,
        requery: cesta19.dataset["req"] == true ? 1 : 0,
    };

    data.cesta23 = {
        value: cesta23.value.length > 0 ? cesta23.value : 0,
        requery: cesta23.dataset["req"] == true ? 1 : 0,
    };

    data.cesta25 = {
        value: cesta25.value.length > 0 ? cesta25.value : 0,
        requery: cesta25.dataset["req"] == true ? 1 : 0,
    };

    data.pesoGeneral = {
        value: pesoGeneral.value.length > 0 ? pesoGeneral.value : 0,
        requery: pesoGeneral.dataset["req"] == true ? 1 : 0,
    };

    data.pesoPromedio.value =
        pesoPromedio.value.length > 0 ? pesoPromedio.value : 0;

    data.pesoPromedio.requery = pesoPromedio.dataset["req"] == true ? 1 : 0;

    validad(data); /* envio de la data para ser calculada  */
}

function ExecConfig(Element) {
    for (const key in configLoadVehiculo) {
        if (key == Element) {
            configLoadVehiculo[key].action(true);
            configLoadVehiculo[key].actionExec = true;
        }
    }
}

export function configLoad() {
    ReinitLoadVirtual();
    let checkboxes = document.getElementsByName("configuracionCarga");
    checkboxes.forEach((element) => {
        if (element.checked == true) ExecConfig(element.value);
    });
    
}

//render de los elementos  de carga
$DOM.querySelector("#app").innerHTML = ElementApp;

//control de funciones y events
$DOM.addEventListener("click", (element) => {
    let op =
        element.target.attributes["data-action"] == undefined
            ? ""
            : element.target.attributes["data-action"].value;
    // console.log(op);
    switch (op) {
        case "cargar":
            console.log(" Ejecución de Carga ");
            AllData(); /* captura de datos ingresado por el usuario y envio de Fondo  */
            break;
        case "Eliminar":
            let check = document.getElementsByName("configuracionCarga");
            $DOM.querySelector("#cargas").innerHTML = configLoadVehiculo.render;
            //dibujamos el checkun
            for (const key in configLoadVehiculo) {
                if (configLoadVehiculo[key].actionExec == true) {
                    check.forEach((value) => {
                        if (value.value == key) {
                            value.checked = true;
                            configLoadVehiculo[key].action();
                        }
                    });
                }
            }
            $DOM.querySelector("#pesoGeneral").value = '',
            $DOM.querySelector("#pesoPromedio").value = '';
            ReinitLoadVirtual();
            break;
        case "configuracionCarga":
            console.log("Ejecutando Configuración");
            // restablecer a false los elementos checked sin seleccionar
            let checkboxes = document.getElementsByName("configuracionCarga");
            checkboxes.forEach((value) => {
                configLoadVehiculo[value.value].actionExec = false;
                if (value.checked == true) value.checked = false;
            });
            element.target.checked = true;
            // llamado a la funciones de parámetros de configuración
            ExecConfig(element.target.value);
            break;
        case "operacionPromedio":
            //control de operaciones promedio
            let checkPromedio = document.getElementsByName("operacionPromedio"),
                actPesoFaltante = $DOM.querySelector("#datFaltante");

            checkPromedio.forEach((value) => {
                if (
                    value.checked == true &&
                    value.value != element.target.value
                ) {
                    value.checked = false;
                }
            });

            data.pesoPromedio.opPromedio =
                element.target.value == "porEncima" ? true : false;
            console.log("ejecucion de  operacion promedio ");
            if (actPesoFaltante !== null) {
                if (data.pesoPromedio.value > 0) {
                    AllData(
                        false,
                    ); /* captura de datos ingresado por el usuario y envio de Fondo */
                }
            }

            break;
    }
});
//evento de actualizacion de botones
$DOM.addEventListener("change", (element) => {
    let op =
            element.target.attributes["data-action"] == undefined
                ? ""
                : element.target.attributes["data-action"].value,
        message = "",
        notify = false;

    switch (op) {
        //al actualizar el valor de Promedio
        case "valorPromedio":
            $DOM.querySelector("#operacionPromedio").classList.remove("d-none");
            if (element.target.value > 0)
                $DOM.querySelector("#operacionPromedio").classList.remove(
                    "d-none",
                );
            else
                $DOM.querySelector("#operacionPromedio").classList.add(
                    "d-none",
                );

            if (element.target.value >= 90) {
                message = `  El valor del "Porcentaje", se Encuentra Elevado en ${element.target.value}% Recomendarmos llevarlo a 50% o menor `;
                notify = true;
            }

            if (notify) {
                notifyFront({
                    color: "",
                    title: "Aviso",
                    message: message,
                });
            }

            break;
    }
});
