$(document).ready(function(){
//instrucciones que se ejecutan cuando carga la página!
    traerInformacion();
});
function traerInformacion(){
    $.ajax({
        url:"http://193.123.98.240/api/Category/all",
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
                        <h5 class="card-title">${items[i].name}</h5>
                        <p class="card-text">  ${items[i].description}</p>
                        <button class="btn btn-primary" onclick='editarRegistro(${items[i].id})'>Editar</button>
                        <button class="btn btn-danger" onclick='borrarElemento(${items[i].id})'>Borrar</button>
                    </div>
                </div>`
    }
    myTable+='</div></div>';
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
        'http://193.123.98.240/api/Category/save',
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
        url:'http://193.123.98.240/api/Category/'+id,
        type:'GET',
        datatype:'JSON',
        contentType: "application/json; charset=utf-8",

        success:function(respuesta){
            console.log(respuesta+ "url" + "http://193.123.98.240/api/Category/"+id);
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
        'http://193.123.98.240/api/Category/update',
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
        url:'http://193.123.98.240/api/Category/'+id,
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