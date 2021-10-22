function traerInformacion(){
    $.ajax({
        url:"http://localhost/api/Category/all",
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
    myTable += '<th>' + "NOMBRE" + '</th>';
    myTable += '<th>' + "DESCRIPCIÓN" + '</th>';
    myTable += '<th>' + "EDITAR" + '</th>';
    myTable += '<th>' + "BORRAR" + '</th>';
    for (i = 0; i < items.length; i++) {
        myTable+="<tr>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+= "<td> <button onclick='editarRegistro("+items[i].id+")'>Editar</button>";
        myTable+= "<td> <button onclick='borrarElemento("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}

function guardarInformacion(){
    let myData={
        id:$("#idCategory").val(),
        name:$("#name").val(),
        description:$("#description").val(),
    };
    let datosJson=JSON.stringify(myData);
    $.ajax(
        'http://localhost/api/Category/save',
        {data:datosJson,
        type:"POST",
        datatype:"json",
        contentType: "application/json; charset=utf-8",

        statusCode : {
			201 :  function() {
                alert("Se ha guardado.");
                $("#idCategory").val(""),
                $("#name").val(""),
                $("#description").val(""),
                traerInformacion();
            }
        }
        });
}

function editarRegistro(id){
    $.ajax({
        url:'http://localhost/api/Category/'+id,
        type:'GET',
        datatype:'JSON',
        contentType: "application/json; charset=utf-8",

        success:function(respuesta){
            console.log(respuesta+ "url" + "http://localhost/api/Category/"+id);
            let myTable = '<table>';
            $("#idCategory").val(respuesta.id);
			$("#name").val(respuesta.name);
            $("#description").val(respuesta.description);
            $("#idCategory").attr("readonly", true);
	    },
        error : function(xhr, status) {
            alert('ha sucedido un problema:'+ status);
        }
        });
}

function editarInformacion(){
    let myData={
        id: $("#idCategory").val(),
        name:$("#name").val(),
        description:$("#description").val()
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax(
        'http://localhost/api/Category/update',
        {data: dataToSend,
        type:'PUT',
        datatype:'JSON',
        contentType: "application/json; charset=utf-8",

        statusCode : {
            201 :  function() {
                alert("Se ha Actualizado.");
                $("#idCategory").val("");
                $("#name").val(""),
                $("#description").val(""),
                $("#idCategory").attr("readonly", false);
                traerInformacion();
                }
            }
        });
}

function borrarElemento(id){
    $.ajax({
        url:'http://localhost/api/Category/'+id,
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

/*
function pintarRespuesta(items){
    let myTable="<table>";
    myTable += '<th>' + "NOMBRE" + '</th>';
    myTable += '<th>' + "DESCRIPCIÓN" + '</th>';
    myTable += '<th>' + "MOTOCICLETA" + '</th>';
    myTable += '<th>' + "MARCA" + '</th>';
    myTable += '<th>' + "DESCRIPCIÓN" + '</th>';
    myTable += '<th>' + "EDITAR" + '</th>';
    myTable += '<th>' + "BORRAR" + '</th>';
    for (i = 0; i < items.length; i++) {
        myTable+="<tr>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        for (j=0; j<items[i].motorbikes.length; j++) {
            if(j>=1){
                myTable+="<tr>";
                myTable+="<td>"+items[i].name+"</td>";
                myTable+="<td>"+items[i].description+"</td>";
            }
            myTable+="<td>"+items[i].motorbikes[j].name+"</td>";
            myTable+="<td>"+items[i].motorbikes[j].brand+"</td>";
            myTable+="<td>"+items[i].motorbikes[j].description+"</td>";
        }
        myTable+= "<td> <button onclick='editarRegistro("+items[i].id+")'>Editar</button>";
        myTable+= "<td> <button onclick='borrarElemento("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}
*/