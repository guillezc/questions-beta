var LoginVar = function(){
	return{
		updateBody: function(){
			$("body").addClass("page-login");
			$(".page-content").css("height", $(".page-content").height());
		},
		clean: function(){
			$("body").removeClass("page-login");
		},
		init: function(){
			this.updateBody();
		}
	}
}();