function traerInformacion(){
    $.ajax({
        url:"http://localhost/api/Message/all",
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
    myTable += '<th>' + "MENSAJE" + '</th>';
    myTable += '<th>' + "MOTO" + '</th>';
    myTable += '<th>' + "CLIENTE" + '</th>';
    myTable += '<th>' + "EDITAR" + '</th>';
    myTable += '<th>' + "BORRAR" + '</th>';
    for (i = 0; i < items.length; i++) {
        myTable+="<tr>";
        myTable+="<td>"+items[i].messageText+"</td>";
        myTable+="<td>"+items[i].motorbike.name+"</td>";
        myTable+="<td>"+items[i].client.name+"</td>";
        myTable+= "<td> <button onclick='editarRegistro("+items[i].idMessage+")'>Editar</button>";
        myTable+= "<td> <button onclick='borrarElemento("+items[i].idMessage+")'>Borrar</button>";
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
        id:$("#id").val(),
        messageText:$("#messageText").val(),
        client:{
            idClient: selected
        },
        motorbike:{
            id: selected
        }
    };
    let datosJson=JSON.stringify(myData);
    $.ajax(
        'http://localhost/api/Message/save',
        {data:datosJson,
        type:"POST",
        datatype:"json",
        contentType: "application/json; charset=utf-8",

        statusCode : {
			201 :  function() {
                alert("Se ha guardado.");
                $("#idMessage").val(""),
                $("#messageText").val(""),
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
    url : 'http://localhost/api/Client/all',
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
    url : 'http://localhost/api/Message/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",

    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://localhost/api/Message/"+id);
        let myTable = '<table>';
            $("#idMessage").val(respuesta.idMessage);
			$("#messageText").val(respuesta.messageText);
			$("#client").val(respuesta.client.name);
			$("#moto").val(respuesta.motorbike.name);
            pintarSelect(respuesta.motorbike.id);
            pintarSelect2(respuesta.client.idClient);
            $("#idMessage").attr("readonly", true);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function editarInformacion(){
    let myData={
        idMessage:$("#idMessage").val(),
        messageText:$("#messageText").val()
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idMessage").val(""),
            $("#messageText").val(""),
            $("#client").val(""),
            $("#moto").val(""),
            $("#idMessage").attr("readonly", false);
            traerInformacion();
            alert("Se ha Actualizado.")
        }
        });
}

function borrarElemento(registro){
    $.ajax({
        url:'http://localhost/api/Message/'+registro,
        type:'DELETE',
        datatype:'JSON',
        contentType:"application/json; charset=utf-8",

    statusCode : {
        204 :  function() {
            alert("Eliminado el registro No:"+registro);
            traerInformacion();
        }
    }
    });
}