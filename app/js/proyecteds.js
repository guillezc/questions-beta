var ProyectedsVar = function(){
	return{
		updateBody: function(){
			$("body").addClass("page-proyecteds");
			$('.carousel').carousel({
				interval: false
			});
			$(".page-content").css("height", $(".page-content").height());
			window.setTimeout(function(){

				$(window).keyup(function(e){
					if(e.keyCode == 39)
						$("#next-qproyected").trigger('click');
					if(e.keyCode == 37)
						$("#prev-qproyected").trigger('click');
				});
				$("#carousel-proyecteds .carousel-control").show();
				
			}, 1500);		
		},
		clean: function(){
			$("body").removeClass("page-proyecteds");
		},
		init: function(){
			this.updateBody();
			$("#carousel-proyecteds .carousel-control").hide();
		}
	}
}();