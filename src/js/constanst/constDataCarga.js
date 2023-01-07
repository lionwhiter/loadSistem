//configuracion Basica de pre_configuracion de elementos
var ElementApp = `

    <h4 class="fs-1 mb-4 textColorFondo fw-light"> 
        <i class="fa fa-truck textColorPrimary" aria-hidden="true"></i>
        Carga de Vehículo
    <h4>
    <div class="input-group mb-3">
        <span class="input-group-text text-light" >
            <i class="fa fa-area-chart mx-2" aria-hidden="true"></i>
                Peso Neto
        </span>
        <input type="number" class="form-control text-muted" id="pesoNeto" data-req= "1" placeholder="Peso Total del Producto" 
            aria-label="Peso Total del Producto" aria-describedby="pesoNeto">
    </div>

    <div class="input-group mb-3">
        <input type="number" id="pesoTara" data-req= "1" class="form-control text-muted" placeholder="Peso que se Resta del embace" 
            aria-label="Peso que se Resta del embace" aria-describedby="pesoTara">
        <span class="input-group-text text-light" >
            <i class="fa fa-bar-chart mx-2" aria-hidden="true"></i>
            Peso Tara
        </span>
    </div>

    <label for="basic-url" class="form-label cesta">Cesta:</label>
    <div class="input-group mb-3 cesta">
        <span class="input-group-text text-light" >
            <i class="fa fa-line-chart mx-2" aria-hidden="true"></i>
            1.7
        </span>
        <input type="number" placeholder= "Numero de Cestas 1.7" id="cesta17" 
            class="form-control text-small" id="basic-url" aria-describedby="cesta17">
    </div>

    <div class="input-group mb-3 cesta">
        <span class="input-group-text text-light">
            <i class="fa fa-line-chart mx-2" aria-hidden="true"></i>
            1.9
        </span>
        <input type="number" placeholder= "Numero de Cestas 1.9"  id="cesta19"  
            class="form-control" id="basic-url" aria-describedby="cesta19">
    </div>

    <div class="input-group mb-3 cesta">
        <span class="input-group-text text-light" >
            <i class="fa fa-line-chart mx-2" aria-hidden="true"></i>
            2.3
        </span>
        <input type="number" placeholder= "Numero de Cestas 2.3" id="cesta23" 
            class="form-control" id="basic-url" aria-describedby="cesta23">
    </div>

    <div class="input-group mb-3 cesta">
        <span class="input-group-text text-light" >
            <i class="fa fa-line-chart mx-2" aria-hidden="true"></i>
            2.5
        </span> 
        <input type="number" placeholder= "Numero de Cestas 2.5" id="cesta25" 
            class="form-control" id="basic-url" aria-describedby="cesta25">
    </div>


    <div class="input-group mb-3">
        <input type="number" class="form-control" placeholder="Peso General" aria-label="pesoGeneral" id="pesoGeneral">
        <span class="input-group-text text-light">
            <i class="fa fa-pie-chart " aria-hidden="true"></i>
        </span>
        <input type="number" class="form-control" placeholder="Peso Promedio" aria-label="pesoPromedio" id="pesoPromedio" data-bs-container="body" data-action="valorPromedio" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Por defecto estará definida, por Encima ">
    </div>

    <span class="d-flex d-none position-relative" id= "operacionPromedio" >

        <div class="form-check form-switch mx-4">
            <input class="form-check-input" type="checkbox" role="switch" id="predeterminado"  name = "operacionPromedio" data-action ="operacionPromedio"  value="porEncima" checked>
            <label class="form-check-label fs-6 fw-lighter" for="flexSwitchCheckChecked">
            por encima 
                <button type="button" class="btn btn-primary btn-sm rounded-circle  ayudad1" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Esto permite calcular la carga por Encima  de lo especificado según el valor dado en promedio">
                    ?
                </button>
            </label>
        </div>


        <div class="form-check form-switch mx-4">
            <input class="form-check-input" type="checkbox" role="switch" id="predeterminado"  name = "operacionPromedio" data-action ="operacionPromedio"  value="porDebajo" >
            <label class="form-check-label fw-lighter fs-6" for="flexSwitchCheckChecked">
            por debajo  
                <button type="button" class="btn btn-primary btn-sm rounded-circle  ayudad1" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Esto permite calcular la carga por debajo de lo especificado según el valor dado en promedio">
                    ?
                </button>
            </label>
        </div>
    </span>
    <button type="button" class="btn btn-lg btn-outline-primary mt-4" data-action ="cargar"  id= "carga"> Cargar </button>
`,
    configLoadVehiculo = {
        //render de elementos de configuración
        render: `
        <p class="fs-4">Realiza la configuración inicial para tener un mayor control  de carga sobre tu Vehículo </p>
        <p>Indica si tu carga tendrá, el uso de Cesta, tara o valor de merma Final.</p>
        <span class="px-3 cargas">
            <!-- init de los input para configuracion -->
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="predeterminado"  name = "configuracionCarga" data-action ="configuracionCarga"  value="autoGestion" >
                <label class="form-check-label" for="flexSwitchCheckChecked">
                Valores Automáticos
                <button type="button" class="btn btn-primary rounded-circle  ayudad" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="al finalizar el dato ">
                    ?
                </button>
                </label>
            </div>

            <div class="form-check form-switch mt-2">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name = "configuracionCarga" data-action ="configuracionCarga" value= "sinTara">
                <label class="form-check-label" for="flexSwitchCheckDefault">Sin Petición de Tara</label>
                <span  class="btn btn-primary rounded-circle ayudad " data-bs-toggle="popover" title="Configuración Libre Tara" data-bs-content="Se retira las retenciones de para el Peso tara  (Que es tara: 'Peso a restar de la Carga') ">?</span>
            </div>

            <div class="form-check form-switch mt-2">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name = "configuracionCarga" data-action ="configuracionCarga" value= "sinCesta">
                <label class="form-check-label" for="flexSwitchCheckDefault">Sin cestas</label>
                <span  class="btn btn-primary rounded-circle ayudad " data-bs-toggle="popover" title="Configuración Libre Cesta " data-bs-content="Se retira las retenciones de para el Peso Cestas  (Que son las Cesta: 'Son por lo general los elementos de carga individual de un PRODUCTO') ">?</span>
            </div>
            <div class="form-check form-switch mt-2">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name = "configuracionCarga" data-action ="configuracionCarga" value="gestionCarga">
                <label class="form-check-label" for="flexSwitchCheckDefault">Sin Gestión de Carga</label>
                <span  class="btn btn-primary rounded-circle ayudad " data-bs-toggle="popover" title="Configuración Libre Gestión de Pesos " data-bs-content="Al seleccionar esta esta opción se retira la posibilidad de controlar la carga al inhabilitar el botón de peso general  ">?</span>
            </div>

            <div class="form-check form-switch mt-2">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name = "configuracionCarga" data-action ="configuracionCarga" value="gestionPromedio">
                <label class="form-check-label" for="flexSwitchCheckDefault">Sin gestión de promedio </label>
                <span  class="btn btn-primary rounded-circle ayudad " data-bs-toggle="popover" title="Configuración Libre Promedio" data-bs-content=" inhabilitar el botón de Promedio ">?</span>
            </div>
            <!-- init de los input para configuracion -->
        </span>
    `,
        autoGestion: {
            action() {
                let $pesoNeto = $DOM.querySelector("#pesoNeto"),
                    $pesoTara = $DOM.querySelector("#pesoTara");

                $pesoNeto.dataset["req"] = 1;
                $pesoTara.dataset["req"] = 1;
                configLoadVehiculo.sinCesta.action(false);
                configLoadVehiculo.sinCesta.action(false);
                configLoadVehiculo.gestionCarga.action(false);
                configLoadVehiculo.gestionPromedio.action(false);
                configLoadVehiculo.sinTara.action(false);
            },
            actionExec: false,
        },
        sinTara: {
            action(op = true) {
                if (op) $DOM.querySelector("#pesoTara").dataset["req"] = 0;
                else $DOM.querySelector("#pesoTara").dataset["req"] = 1;
            },
            actionExec: false,
        },
        sinCesta: {
            action(op = true) {
                let $cestas = $DOM.querySelectorAll(".cesta");
                $cestas.forEach((value) => {
                    if (op) value.style.display = "none";
                    else value.style.display = "flex";
                });
            },
            actionExec: false,
        },
        gestionCarga: {
            action(op = true) {
                if (op){
                    $DOM.querySelector("#pesoGeneral").setAttribute(
                        "disabled",
                        "disabled",
                    );
                    data.pesoGeneral.requery = 1;
                }else {
                    $DOM.querySelector("#pesoGeneral").removeAttribute(
                        "disabled",
                    );
                    data.pesoGeneral.requery = 0;
                }
            },
            actionExec: false,
        },
        gestionPromedio: {
            action(op = true) {
                if (op)
                    $DOM.querySelector("#pesoPromedio").setAttribute(
                        "disabled",
                        "disabled",
                    );
                else
                    $DOM.querySelector("#pesoPromedio").removeAttribute(
                        "disabled",
                    );
            },
            actionExec: false,
        },
    },
    data = {
        pesoNeto: {
            value: "",
            requery: "",
        },
        pesoTara: {
            value: "",
            requery: "",
        },
        cesta17: {
            value: "",
            requery: "",
        },
        cesta19: {
            value: "",
            requery: "",
        },
        cesta23: {
            value: "",
            requery: "",
        },
        cesta25: {
            value: "",
            requery: "",
        },
        pesoGeneral: {
            value: "",
            requery: "",
        },
        pesoPromedio: {
            value: "",
            requery: "",
            valuePromedio: 0,
            opPromedio: true,
        },
    },
    PORCENTAJE = 100,
    //Carga de Funcionalidades
    $DOM = document.querySelector("body");

export { data, $DOM, configLoadVehiculo, PORCENTAJE, ElementApp };
