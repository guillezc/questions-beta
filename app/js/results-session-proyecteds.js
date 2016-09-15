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
			console.log("Init.....");
			this.updateBody();
			//google.setOnLoadCallback(drawProyecteds());
			$('.carousel').carousel();
		},

		setVote: function(index, data){
			DATAVOTES_SESPROY[index] = data;
		},

		reset: function(){
			DATAVOTES_SESPROY = [];
		}
	}
}();

function drawProyecteds() {
	console.log("drawProyecteds.....");
	window.setTimeout(function(){
		// PIE CHARTS
		var options = {
	        title: 'Votaciones',
	        sliceVisibilityThreshold: 0,
	        legend: {
	        	alignment: 'center'
	        }
	    };

		for(var i=0;i<DATAVOTES_SESPROY.length;i++){
			var data = google.visualization.arrayToDataTable(DATAVOTES_SESPROY[i]);
			console.log(DATAVOTES_SESPROY[i]);
			
		    var chart = new google.visualization.PieChart(document.getElementById('gchart_proyecteds_'+i));
		    chart.draw(data, options);
		}	    
	}, 100);
}