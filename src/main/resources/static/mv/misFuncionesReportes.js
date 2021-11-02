function reporteStatus(){
      $.ajax({
        url:"http://193.123.98.240/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",

        success:function(respuesta){
            console.log(respuesta);
            $("#resultadoStatus").empty();
            pintarRespuesta(respuesta);
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema:'+ status);
        }
    });
}
function pintarRespuesta(respuesta){
    let myTable='<div class="container"><div class= "row">';
        myTable+=`
                    <div class="card m-2" style="width: 18rem;">
                        <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Completas vs Canceladas</h6>                        
                        <p class="card-text">  ${respuesta.completed} vs ${respuesta.cancelled}
                        </p>
                    </div>
                </div>`
    myTable+='</div></div>';
    $("#resultadoStatus").html(myTable);
}

function reporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://193.123.98.240/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
    function pintarRespuestaDate(respuesta){
        let myTable='<div class="container"><div class= "row">';
        for (i = 0; i < respuesta.length; i++) {
        myTable+=`
                    <div class="card m-2" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">${respuesta[i].idReservation}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${respuesta[i].status}</h6>
                        <p class="card-text">  ${respuesta[i].startDate.slice(0, 10)}<br>
                                               ${respuesta[i].devolutionDate.slice(0, 10)}
                        </p>
                    </div>
                </div>`
    }
    myTable+='</div></div>';
    $("#resultadoDate").html(myTable);
    }

    function reporteClientes(){
        $.ajax({
            url:"http://193.123.98.240/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
    }
    function pintarRespuestaClientes(respuesta){
    let myTable='<div class="container"><div class= "row">';
    for (i = 0; i < respuesta.length; i++) {
    myTable+=`
                <div class="card m-2" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${respuesta[i].total}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${respuesta[i].client.name}</h6>
                    <p class="card-text">  ${respuesta[i].client.email}<br>
                                           ${respuesta[i].client.age}
                    </p>
                </div>
            </div>`
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
    }