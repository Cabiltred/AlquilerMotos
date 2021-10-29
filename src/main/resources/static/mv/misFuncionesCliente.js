$(document).ready(function(){
//instrucciones que se ejecutan cuando carga la página!
    traerInformacion();
});
function traerInformacion(){
    $.ajax({
        url:"http://193.123.98.240/api/Client/all",
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
                        <h5 class="card-title">${items[i].idClient}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${items[i].name}</h6>
                        <p class="card-text"> ${items[i].email}<br>
                                               ${items[i].age}
                        </p>
                        <button class="btn btn-primary" onclick='editarRegistro(${items[i].idClient})'>Editar</button>
                        <button class="btn btn-danger" onclick='borrarElemento(${items[i].idClient})'>Borrar</button>
                    </div>
                </div>`
    }
    myTable+='</div></div>';
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
        'http://193.123.98.240/api/Client/save',
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
        url:'http://193.123.98.240/api/Client/'+dato,
        type:'GET',
        datatype:'JSON',
        contentType: "application/json; charset=utf-8",

        success:function(respuesta){
            console.log(respuesta+ "url" + "http://193.123.98.240/api/Client/"+dato);
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
        'http://193.123.98.240/api/Client/update',
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
        url:'http://193.123.98.240/api/Client/'+id,
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