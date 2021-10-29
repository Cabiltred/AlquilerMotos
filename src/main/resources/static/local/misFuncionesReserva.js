$(document).ready(function(){
//instrucciones que se ejecutan cuando carga la página!
    traerInformacion();
});
function traerInformacion(){
    $.ajax({
        url:"http://localhost/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",

        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            pintarRespuesta(respuesta);
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema:'+ status);
        }
    });
}

function pintarRespuesta(items){
    let myTable='<div class="container"><div class= "row">';
    for (i = 0; i < items.length; i++) {
        myTable+=`
                    <div class="card m-2" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">${items[i].idReservation}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${items[i].status}</h6>
                        <p class="card-text">  ${items[i].startDate.slice(0, 10)}<br>
                                               ${items[i].devolutionDate.slice(0, 10)}<br>
                                               ${items[i].motorbike.name}<br>
                                               ${items[i].client.idClient} - ${items[i].client.name}<br>
                                               ${items[i].client.email}
                        </p>
                        <button class="btn btn-primary" onclick='editarRegistro(${items[i].idReservation})'>Editar</button>
                        <button class="btn btn-danger" onclick='borrarElemento(${items[i].idReservation})'>Borrar</button>
                    </div>
                </div>`
    }
    myTable+='</div></div>';
    $("#resultado").append(myTable);
    pintarSelect();
    pintarSelect2();
    fechaActual();
}

function fechaActual() {      
    var currentDate = new Date()
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var my_date = year+"-"+month+"-"+day;
    document.getElementById("startDate").value=my_date;    
}

function guardarInformacion(){
    let selectedmoto = $("#moto").children(":selected").attr("value");
    let selectedclient = $("#client").children(":selected").attr("value");
	if (selectedmoto.length && selectedclient > 0) {
    let myData={
        idReservation:$("#idReservation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        client:{
            idClient: selectedclient
        },
        motorbike:{
            id: selectedmoto
        }
    };
    let datosJson=JSON.stringify(myData);
    $.ajax(
        'http://localhost/api/Reservation/save',
        {data:datosJson,
        type:"POST",
        datatype:"json",
        contentType: "application/json; charset=utf-8",

        statusCode : {
			201 :  function() {
                alert("Se ha guardado.");
                $("#idReservation").val(""),
                $("#startDate").val(""),
                $("#devolutionDate").val(""),
                $("#client").val(),
                $("#moto").val(""),
                traerInformacion();
            }
        }
        });
    }
    else{
		alert('Debe escoger una Moto y/o Cliente');
    }
}

function pintarSelect(id){
	$.ajax({
    url : 'http://localhost/api/Motorbike/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",

    success : function(respuesta) {
		console.log(respuesta);
		$("#moto").empty();
		miSelect='<option id="" >Seleccione Cliente...</option>';
		for (i=0; i<respuesta.length; i++){
            if (respuesta[i].id == id){
				miSelect += '<option selected value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>';
			} else {
	        	miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>';
			}
	        //miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>';
		}
	    $("#moto").append(miSelect);
	    },
        error : function(xhr, status) {
            alert('ha sucedido un problema:'+ status);
        }
    });
}

function pintarSelect2(id){
	$.ajax({
    url : 'http://localhost/api/Client/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",

    success : function(respuesta) {
		console.log(respuesta);
		$("#client").empty();
		miSelect='<option id="" >Seleccione Moto...</option>';
		for (i=0; i<respuesta.length; i++){
            if (respuesta[i].idClient == id){
				miSelect += '<option selected value='+ respuesta[i].idClient+ '>'+respuesta[i].name+'</option>';
			} else {
	        	miSelect += '<option value='+ respuesta[i].idClient+ '>'+respuesta[i].name+'</option>';
			}
	        //miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>';
		}
	    $("#client").append(miSelect);
	    },
        error : function(xhr, status) {
            alert('ha sucedido un problema:'+ status);
        }
    });
}

function editarRegistro (id){
	$.ajax({
    url : 'http://localhost/api/Reservation/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",

    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://localhost/api/Reservation/"+id);
        let myTable = '<table>';
            $("#idReservation").val(respuesta.idReservation);
            const fecInicio = respuesta.startDate.slice(0, 10);
	    $("#startDate").val(fecInicio);
            //$("#startDate").val(respuesta.startDate);
            const fecfinal = respuesta.devolutionDate.slice(0, 10);
	    $("#devolutionDate").val(fecfinal);
            //$("#devolutionDate").val(respuesta.devolutionDate);
            $("#client").val(respuesta.client.name);
            $("#moto").val(respuesta.motorbike.name);
            pintarSelect(respuesta.motorbike.id);
            pintarSelect2(respuesta.client.idClient);
            pintarSelectStatus(respuesta.status);
            $("#idReservation").attr("readonly", true);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function editarInformacion(){
    let selectedStatus = $("#status").children(":selected").attr("value");
    let myData={
        idReservation:$("#idReservation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status: selectedStatus
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#idReservation").val(""),
            $("#startDate").val(""),
            $("#devolutionDate").val(""),
            $("#client").val(""),
            $("#moto").val(""),
            $("#status").empty(),
            $("#idReservation").attr("readonly", false);
            $("#status").attr("disabled", true);
            traerInformacion();
            alert("Se ha Actualizado.")
        }
        });
}

function pintarSelectStatus(status){
	$("#status").empty();
	statusSelect='<option id="" >Seleccione Estado...</option>';
	for (i=0; i<3; i++){
		if(i==0){
			if ("programmed" == status){
				statusSelect += '<option selected value="programmed">Programado</option>';
			} else {
				statusSelect += '<option value="programmed">Programado</option>';
			}
		} else if(i==1){
			if ("cancelled" == status){
				statusSelect += '<option selected value="cancelled">cancelado</option>';
			} else {
				statusSelect += '<option value="cancelled">cancelado</option>';
			}
		} else if(i==2){
			if ("realized" == status){
				statusSelect += '<option selected value="realized">Realizado</option>';
			} else {
				statusSelect += '<option value="realized">Realizado</option>';
			}
		}
	}

	$("#status").attr("disabled", false);
	$("#status").append(statusSelect);

}

function borrarElemento(id){
    $.ajax({
        url:'http://localhost/api/Reservation/'+id,
        type:'DELETE',
        datatype:'JSON',
        contentType:"application/json; charset=utf-8",

    statusCode : {
        204 :  function() {
            alert("Eliminado el registro No:"+id);
            traerInformacion();
        }
    }
    });
}