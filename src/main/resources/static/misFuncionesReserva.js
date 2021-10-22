function traerInformacion(){
    $.ajax({
        url:"http://193.123.98.240/api/Reservation/all",
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
    let myTable="<table>";
    myTable += '<th>' + "ID" + '</th>';
    myTable += '<th>' + "FECHA DE INICIO" + '</th>';
    myTable += '<th>' + "FECHA DE ENTREGA" + '</th>';
    myTable += '<th>' + "STATUS" + '</th>';
    myTable += '<th>' + "MOTO" + '</th>';
    myTable += '<th>' + "ID CLIENTE" + '</th>';
    myTable += '<th>' + "CLIENTE" + '</th>';
    myTable += '<th>' + "EMAIL CLIENTE" + '</th>';
    myTable += '<th>' + "EDITAR" + '</th>';
    myTable += '<th>' + "BORRAR" + '</th>';
    for (i = 0; i < items.length; i++) {
        myTable+="<tr>";
        myTable+="<td>"+items[i].idReservation+"</td>";
        myTable+="<td>"+items[i].startDate+"</td>";
        myTable+="<td>"+items[i].devolutionDate+"</td>";
        myTable+="<td>"+items[i].status+"</td>";
        myTable+="<td>"+items[i].motorbike.name+"</td>";
        myTable+="<td>"+items[i].client.idClient+"</td>";
        myTable+="<td>"+items[i].client.name+"</td>";
        myTable+="<td>"+items[i].client.email+"</td>";
        myTable+= "<td> <button onclick='editarRegistro("+items[i].idReservation+")'>Editar</button>";
        myTable+= "<td> <button onclick='borrarElemento("+items[i].idReservation+")'>Borrar</button>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
    pintarSelect();
    pintarSelect2();
}

function guardarInformacion(){
    let selected = $("#moto").children(":selected").attr("value");
	if (selected.length > 0) {
    let myData={
        idReservation:$("#idReservation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        client:{
            idClient: selected
        },
        motorbike:{
            id: selected
        }
    };
    let datosJson=JSON.stringify(myData);
    $.ajax(
        'http://193.123.98.240/api/Reservation/save',
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
    url : 'http://193.123.98.240/api/Motorbike/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",

    success : function(respuesta) {
		console.log(respuesta);
		$("#moto").empty();
		miSelect='<option id="" >Seleccione...</option>';
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
    url : 'http://193.123.98.240/api/Client/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",

    success : function(respuesta) {
		console.log(respuesta);
		$("#client").empty();
		miSelect='<option id="" >Seleccione...</option>';
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
    url : 'http://193.123.98.240/api/Reservation/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",

    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://193.123.98.240/api/Reservation/"+id);
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
        url:"http://193.123.98.240/api/Reservation/update",
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
	statusSelect='<option id="" >Seleccione...</option>';
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
        url:'http://193.123.98.240/api/Reservation/'+id,
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