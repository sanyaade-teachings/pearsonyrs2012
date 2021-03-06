var map;
var beachMarker;
jQuery(window).ready(function(){  
	$.ajax({
      url: "api/settings/",
      dataType: "json",
      success: function(response) { 
		//general
		$('body').css('background-color','#' + response.backcolour)
      },
      error: function(xhr,text,errort) {console.log(xhr);
              console.log("failed");
              console.log(text);
              console.log(errort);
            }
    });
    // jQuery("#btnInit").click(initiate_geolocation);
firstinitiate_geolocation()	
});  
function initiate_geolocation() {  
navigator.geolocation.getCurrentPosition(handle_geolocation_query);
} 

function handle_geolocation_query(position){  
    // alert('Lat: ' + position.coords.latitude + ' ' +  
      //    'Lon: ' + position.coords.longitude); 
			drawmap(position.coords.latitude, position.coords.longitude)
			placename(position.coords.latitude, position.coords.longitude)
			setTimeout(initiate_geolocation, 15000);
}

function firstinitiate_geolocation() {  
navigator.geolocation.getCurrentPosition(firsthandle_geolocation_query);
} 

function firsthandle_geolocation_query(position){  
    // alert('Lat: ' + position.coords.latitude + ' ' +  
      //    'Lon: ' + position.coords.longitude); 
	    var image = 'images/map-pointer.png';
        var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		    
	  	var mapOptions = {
          zoom: 17,
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
		map = new google.maps.Map(document.getElementById('map_canvas'),
                                      mapOptions);	
        beachMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });
			drawmap(position.coords.latitude, position.coords.longitude)
			placename(position.coords.latitude, position.coords.longitude)
			setTimeout(initiate_geolocation, 15000);
}

function drawmap(lat, longatude) {
	beachMarker.setPosition(new google.maps.LatLng(lat, longatude))

	$.ajax({
      url: "api/map/accidents/" + lat + "/" + longatude + "/",
      dataType: "json",
      success: function(response) { 
        console.log("success");
		$(response).each(function(index) {
          
            // get values from response
            var lat = $(this)[0]["lat"]
            var longatude = $(this)[0]["long"]
            
            //plotthem
			var image = 'images/icons/danger32.png';
			var myLatLng = new google.maps.LatLng(lat, longatude);
			var Marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });
        });
      },
      error: function(xhr,text,errort) {console.log(xhr);
              console.log("failed");
              console.log(text);
              console.log(errort);
			  var name = $(this)[0]["name"]
			  var imageid = '#' + name + 'levelimg'
			  		$(imageid).src = "images/icons/help.png";
					$(imageid).alt = "Error";
            }
    });
		
      }
	  
function placename(lat, long) {
		var geocoder;
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(lat, long);
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			// console.debug(results[0]["formatted_address"])
			$("#address").html(results[0]["formatted_address"])
		})
} 