$(document).ready(function(){
//instrucciones que se ejecutan cuando carga la página!
    traerInformacion();
});
function traerInformacion(){
    $.ajax({
        url:"http://localhost/api/Admin/all",
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
                        <h5 class="card-title">${items[i].idAdmin}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${items[i].name}</h6>
                        <p class="card-text"> ${items[i].email}</p>
                        <button class="btn btn-primary" onclick='editarRegistro(${items[i].idAdmin})'>Editar</button>
                        <button class="btn btn-danger" onclick='borrarElemento(${items[i].idAdmin})'>Borrar</button>
                    </div>
                </div>`
    }
    myTable+='</div></div>';
    $("#resultado").append(myTable);
}

function guardarInformacion(){
    let myData={
        idAdmin:$("#idAdmin").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
    };
    let datosJson=JSON.stringify(myData);
    $.ajax(
        'http://localhost/api/Admin/save',
        {data:datosJson,
        type:"POST",
        datatype:"json",
        contentType: "application/json; charset=utf-8",

        statusCode : {
            201 :  function() {
                alert("Se ha guardado.");
                $("#idAdmin").val(""),
                $("#name").val(""),
                $("#email").val(""),
                $("#password").val(""),
                traerInformacion();
            }
        }
        });
}

function editarRegistro(dato){
    $.ajax({
        url:'http://localhost/api/Admin/'+dato,
        type:'GET',
        datatype:'JSON',
        contentType: "application/json; charset=utf-8",

        success:function(respuesta){
            console.log(respuesta+ "url" + "http://localhost/api/Admin/"+dato);
            let myTable = '<table>';
                $("#idAdmin").val(respuesta.idAdmin);
                $("#name").val(respuesta.name);
                $("#password").val(respuesta.password);
                $("#idAdmin").attr("readonly", true);
	    },
        error : function(xhr, status) {
            alert('ha sucedido un problema:'+ status);
        }
        });
}

function actualizarInformacion(){
    let myData={
        idAdmin:$("#idAdmin").val(),
        name:$("#name").val(),
        password:$("#password").val(),
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax(
        'http://localhost/api/Admin/update',
        {data: dataToSend,
        type:'PUT',
        datatype:'JSON',
        contentType: "application/json; charset=utf-8",

        statusCode : {
            201 :  function() {
                alert("Se ha Actualizado.");
                $("#idAdmin").val(""),
                $("#name").val(""),
                $("#email").val(""),
                $("#password").val(""),
                $("#idAdmin").attr("readonly", false);
                traerInformacion();
                }
            }
        });
}

function borrarElemento(registro){
    $.ajax({
        url:'http://localhost/api/Admin/'+registro,
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