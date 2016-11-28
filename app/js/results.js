var DATAVOTES = [];

var ResultsVar = function(){
	return{
		init: function(){
			window.setTimeout(function(){
			    function fullscreenChanged() {
			        if (document.webkitFullscreenElement == null) {
			            mf = document.getElementById("proyecteds_frame");
			            if(mf) mf.style.display="none";
			        }
			    }
			    document.onwebkitfullscreenchange = fullscreenChanged;
			    $("#go-to-rproyecteds").on("click", function(){
			    	mf = document.getElementById("proyecteds_frame");
			        if(mf){
			        	mf.webkitRequestFullscreen();
			        	mf.style.display="";
			        } 
			        $('.carousel').carousel({
						interval: false
					});
			    }) ;
			}, 1000)
		}
	}
}();