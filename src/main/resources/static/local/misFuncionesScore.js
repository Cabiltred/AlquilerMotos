$(document).ready(function(){
//instrucciones que se ejecutan cuando carga la página!
    traerInformacion();
});
function traerInformacion(){
    $.ajax({
        url:"http://localhost/api/Score/all",
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
                    <div class="card m-2" style="width: 14rem;">
                        <div class="card-body">
                        <h5 class="card-title">${items[i].stars}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Reservación: ${items[i].reservation.idReservation}</h6>
                        <p class="card-text"> ${items[i].messageText}
                        </p>
                        <button class="btn btn-primary" onclick='editarRegistro(${items[i].idScore})'>Editar</button>
                    </div>
                </div>`
    }
    myTable+='</div></div>';
    $("#resultado").append(myTable);
    pintarSelect();
}

function guardarInformacion(){
	if($('#messageText').val() !="" && $('#calificar').val() !="" && $('#idReservation').val() !="Seleccione..."){
            if($('#calificar').val().length == 1 && ($('#calificar').val()>= 0 && $('#calificar').val()<=5)){

                let selected = $("#idReservation").children(":selected").attr("value");

		$.ajax({
			url : 'http://localhost/api/Reservation/'+selected,
			type : 'GET',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",

			success : function(respuesta) {
				if(respuesta.score == null){
					if (selected.length > 0) {
						let misDatos = {
							stars: $("#calificar").val(),
							messageText: $("#messageText").val(),
							reservation : {
								idReservation: selected
							}
						};
						let datosJson = JSON.stringify(misDatos);
						$.ajax(
						'http://localhost/api/Score/save',
						{data: datosJson,
						type : 'POST',
						dataType : 'json',
						contentType: "application/json; charset=utf-8",

						statusCode : {
							201 :  function() {
								alert("Calificación guardada!");
								$("#idScore").val("");
								$("#calificar").val("");
								$("#messageText").val("");
								$("#idReservation").empty();
								traerInformacion();
								}
							}
						});
					}
				} else {
					alert("Ya existe calificación para esta reserva!");
				}
			},
			error : function(xhr, status) {
				alert('ha sucedido un problema:'+ status);
			}
		});
            } else {
                    alert("La calificación debe ser un valor entero entre 0 y 5!");
            }
	} else {
		alert("Se deben llenar todos los campos!");
	}
}

/*function guardarInformacion(){
    let selected = $("#idReservation").children(":selected").attr("value");
	if (selected.length > 0) {
    let myData={
        idScore:$("#idScore").val(),
        stars:$("#calificar").val(),
        messageText:$("#messageText").val(),
        reservation:{
            idReservation: selected
        }
    };
    let datosJson=JSON.stringify(myData);
    $.ajax(
        'http://localhost/api/Score/save',
        {data:datosJson,
        type:"POST",
        datatype:"json",
        contentType: "application/json; charset=utf-8",

        statusCode : {
			201 :  function() {
                alert("Se ha guardado.");
                $("#idScore").val(""),
                $("#calificar").val(""),
                $("#messageText").val(""),
                $("#idReservation").val(""),
                traerInformacion();
            }
        }
        });
    }
    else{
		alert('Debe escoger Reservación');
    }
}*/

function pintarSelect(id){
	$.ajax({
    url : 'http://localhost/api/Reservation/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",

    success : function(respuesta) {
		console.log(respuesta);
		$("#idReservation").empty();
		miSelect='<option id="" >Seleccione...</option>';
		for (i=0; i<respuesta.length; i++){
            if (respuesta[i].idReservation == id){
				miSelect += '<option selected value='+ respuesta[i].idReservation+ '>'+respuesta[i].idReservation+'</option>';
			} else {
	        	miSelect += '<option value='+ respuesta[i].idReservation+ '>'+respuesta[i].idReservation+'</option>';
			}
	        //miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>';
		}
	    $("#idReservation").append(miSelect);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function editarRegistro(id){
    $.ajax({
        url:'http://localhost/api/Score/'+id,
        type:'GET',
        datatype:'JSON',
        contentType: "application/json; charset=utf-8",

        success:function(respuesta){
            console.log(respuesta+ "url" + "http://localhost/api/Score/"+id);
            let myTable = '<table>';
            $("#idScore").val(respuesta.idScore);
            $("#calificar").val(respuesta.stars);
            $("#messageText").val(respuesta.messageText);
            //$("#idReservation").val(respuesta.idReservation);
            $("#idScore").attr("readonly", true);
            pintarSelect(respuesta.reservation.idReservation);
	    },
        error : function(xhr, status) {
            alert('ha sucedido un problema:'+ status);
        }
        });
}

function editarInformacion(){
    let myData={
        idScore:$("#idScore").val(),
        stars:$("#calificar").val(),
        messageText:$("#messageText").val(),
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost/api/Score/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idScore").val(""),
            $("#calificar").val(""),
            $("#messageText").val(""),
            $("#idReservation").val(""),
            $("#idScore").attr("readonly", false);
            traerInformacion();
            alert("Se ha Actualizado.")
        }
        });
}