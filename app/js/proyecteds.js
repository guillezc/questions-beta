var ProyectedsVar = function(){
	return{
		updateBody: function(){
			$("body").addClass("page-proyecteds");
			$('.carousel').carousel();
			$('.carousel').carousel(0);
			$(".page-content").css("height", $(".page-content").height());
			window.setTimeout(function(){
				$("#carousel-proyecteds .carousel-control").fadeIn();
			}, 1000);
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