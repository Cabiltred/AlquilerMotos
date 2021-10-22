function traerInformacion(){
    $.ajax({
        url:"http://localhost/api/Client/all",
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
    myTable += '<th>' + "NOMBRE" + '</th>';
    myTable += '<th>' + "CORREO ELECTRONICO" + '</th>';
    myTable += '<th>' + "EDAD" + '</th>';
    myTable += '<th>' + "EDITAR" + '</th>';
    myTable += '<th>' + "BORRAR" + '</th>';
    for (i = 0; i < items.length; i++) {
        myTable+="<tr>";
        myTable+="<td>"+items[i].idClient+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].age+"</td>";
        myTable+= "<td> <button onclick='editarRegistro("+items[i].idClient+")'>Editar</button>";
        myTable+= "<td> <button onclick='borrarElemento("+items[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}

function guardarInformacion(){
    let myData={
        idClient:$("#idClient").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#password").val(),
    };
    let datosJson=JSON.stringify(myData);
    $.ajax(
        'http://localhost/api/Client/save',
        {data:datosJson,
        type:"POST",
        datatype:"json",
        contentType: "application/json; charset=utf-8",

        statusCode : {
			201 :  function() {
                alert("Se ha guardado.");
                $("#idClient").val(""),
                $("#name").val(""),
                $("#email").val(""),
                $("#age").val(""),
                $("#password").val(""),
                traerInformacion();
            }
        }
        });
}

function editarRegistro(dato){
    $.ajax({
        url:'http://localhost/api/Client/'+dato,
        type:'GET',
        datatype:'JSON',
        contentType: "application/json; charset=utf-8",

        success:function(respuesta){
            console.log(respuesta+ "url" + "http://localhost/api/Client/"+dato);
            let myTable = '<table>';
                $("#idClient").val(respuesta.idClient);
                $("#name").val(respuesta.name);
                $("#age").val(respuesta.age);
                $("#password").val(respuesta.password);
                $("#idClient").attr("readonly", true);
	    },
        error : function(xhr, status) {
            alert('ha sucedido un problema:'+ status);
        }
        });
}

function editarInformacion(){
    let myData={
        idClient:$("#idClient").val(),
        name:$("#name").val(),
        age:$("#age").val(),
        password:$("#password").val(),
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax(
        'http://localhost/api/Client/update',
        {data: dataToSend,
        type:'PUT',
        datatype:'JSON',
        contentType: "application/json; charset=utf-8",

        statusCode : {
            201 :  function() {
                alert("Se ha Actualizado.");
                $("#idClient").val(""),
                $("#name").val(""),
                $("#email").val(""),
                $("#age").val(""),
                $("#password").val(""),
                $("#idClient").attr("readonly", false);
                traerInformacion();
                }
            }
        });
}

function borrarElemento(id){
    $.ajax({
        url:'http://localhost/api/Client/'+id,
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