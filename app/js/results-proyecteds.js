var DATAVOTES_PROY = [];

var ResultsProyectedsVar = function(){
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
		}
	}
}();