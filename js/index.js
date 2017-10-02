/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();


//Asignación de eventos a los botones
function mostrarTodos(event){
  //event.preventDefault();
  $.ajax({
    url: 'php/leeData.php',
    dataType: "text",
    cache: false,
    contentType: false,
    processData: false,
    data: {},
    type: 'post',
    success: function(data){
      if (data=="true") {
        window.location.href = 'index.html';

      }else {
        //alert(typeof data)
        //alert(data)
        var json = JSON.parse(data)
        //alert(typeof json);
        console.log(json);
        console.log(json[0]);
        console.log(json[0].Direccion);
        var myData = "";
        var myCities = ["<option value='' selected>Elige una ciudad</option>"];
        var myTypes = ["<option value='' selected>Elige un tipo</option>"];
        var contadorFiltro = 0;
        for(var contador = 0; contador < json.length; contador++){
          //"Id": 1,
          //if(contador < 30)
          myData +=
              "<img class='card-stacked' src='img/home.jpg' style='width:210px;height:210px'/>" +
              "<div class='card card-stacked tituloContenido'>"+
              "<div class='card-stacked'><b>Dirección:" + "</b><span>" + json[contador].Direccion+ "</span></div>" +
              "<div class='card-stacked'><b>Ciudad:" + "</b><span>" + json[contador].Ciudad+ "</span></div>" +
              "<div class='card-stacked'><b>Telefono:" + "</b><span>" + json[contador].Telefono+ "</span></div>" +
              "<div class='card-stacked'><b>Código postal:" + "</b><span>" + json[contador].Codigo_Postal+ "</span></div>" +
              "<div class='card-stacked'><b>Tipo:" + "</b><span>" + json[contador].Tipo+ "</span></div>" +
              "<div class='card-stacked'><b>Precio:" + "</b><span class='precioTexto'>" + json[contador].Precio+  "</span></div>" +
              "<div class='card-stacked card-action'>"+
              "VER MAS</div>"+
              "</div>";

          myCities.push('<option>' + json[contador].Ciudad + '</option>');
          myTypes.push('<option>' + json[contador].Tipo + '</option>');

          contador++;
          contadorFiltro++;
        }


        var uniqueCities = myCities.filter(function(itm, i, a) {
            return i == a.indexOf(itm);
        });
        var uniqueTypes = myTypes.filter(function(itm, i, a) {
            return i == a.indexOf(itm);
        });

        //at the end, add mydata
        $(".colContenido").append( myData );
        $("#selectCiudad").empty().append(uniqueCities.join(" "));
        $("#selectTipo").empty().append(uniqueTypes.join(" ")) ;

        $("#selectCiudad").show();
        $("#selectTipo").show();


        console.log("cuenta todos : " + contador)
      }
    },
    error: function(){
      alert("error al enviar los datos");
    }
  });
}

$('#formulario').submit(function(event){
    event.preventDefault();
    var selectCiudad = $('#selectCiudad').val();
    var selectTipo = $('#selectTipo').val();
    var rangoPrecio = $('#rangoPrecio').val();
    var form_data = new FormData();
    form_data.append('selectCiudad', selectCiudad);
    form_data.append('selectTipo', selectTipo);
    form_data.append('rangoPrecio', rangoPrecio);
    $.ajax({
      url: 'php/leeData.php',
      dataType: "text",
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'post'
  }).done(function(data){
      if (data=="true") {
        window.location.href = 'index.html';
      }else {
        //alert(typeof data)
        //alert(data)
        var json = JSON.parse(data)
        //alert(typeof json);
        //console.log(json);
        //console.log(json[0]);
        console.log(json[0].Ciudad);
        console.log(selectCiudad);
        var myData = "";
        var contadorFiltro = 0;
        for(var contador = 0; contador < json.length; contador++){
          //"Id": 1,
          var procesar = true;
          if(selectCiudad !== "" && json[contador].Ciudad !== selectCiudad){
            procesar = false;
          }
          if(selectTipo !== "" && json[contador].Tipo !== selectTipo){
            procesar = false;
          }
          /*if(rangoPrecio && json[contador].Precio !== selectTipo){
            procesar = false
          }*/
          if(procesar){
            myData +=
                "<img class='card-stacked' src='img/home.jpg' style='width:210px;height:210px'/>" +
                "<div class='card card-stacked tituloContenido'>"+
                "<div class='card-stacked'><b>Dirección:" + "</b><span>" + json[contador].Direccion+ "</span></div>" +
                "<div class='card-stacked'><b>Ciudad:" + "</b><span>" + json[contador].Ciudad+ "</span></div>" +
                "<div class='card-stacked'><b>Telefono:" + "</b><span>" + json[contador].Telefono+ "</span></div>" +
                "<div class='card-stacked'><b>Código postal:" + "</b><span>" + json[contador].Codigo_Postal+ "</span></div>" +
                "<div class='card-stacked'><b>Tipo:" + "</b><span>" + json[contador].Tipo+ "</span></div>" +
                "<div class='card-stacked'><b>Precio:" + "</b><span class='precioTexto'>" + json[contador].Precio+  "</span></div>" +
                "<div class='card-stacked card-action'>"+
                "VER MAS</div>"+
                "</div>";

                contadorFiltro++;
          }


          contador++;

        }

        //at the end, add mydata
        $(".colContenido").html( myData );

        $("#selectCiudad").show();
        $("#selectTipo").show();

        console.log("cuenta formulario : " + contador);
        console.log("cuenta formulario proc : " + contadorFiltro);
      }

  })
});

$("#mostrarTodos").click(function() {
  mostrarTodos();
});
