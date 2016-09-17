var DATAVOTES_SESPROY = {};

var ResultSesionProyectedsVar = function(){
	return{
		updateBody: function(){
			$("body").addClass("page-proyecteds");
			$(".page-content").css("height", $(".page-content").height());
		},

		clean: function(){
			$("body").removeClass("page-proyecteds");
		},

		init: function(){
			this.updateBody();
			$('.carousel').carousel();
		}
	}
}();