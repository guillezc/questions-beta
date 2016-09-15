var VoteSessionJS = function(){
	return{
		init: function(){
			window.setTimeout(function(){
				if ( $.fn.dataTable.isDataTable( '#datatable_votes_session' ) ) {
				    table = $('#datatable_participants').DataTable();
				}
				else {
				    table = $('#datatable_votes_session').DataTable( {
				        pagingType: 'simple_numbers',
					    language: {
					    	lengthMenu: "Mostrar _MENU_ encuestas",
					    	info: "Mostrando página _PAGE_ de _PAGES_",
					    	infoFiltered: " - filtrado de _MAX_ encuestas",
					    	search: "Filtrar encuestas:",
					    	loadingRecords: "Porfavor espere - cargando...",
					    	infoEmpty: " ",
					    	emptyTable: "No se han encontrado encuestas",
					        paginate: {
					            first:    '«',
					            previous: '‹',
					            next:     '›',
					            last:     '»'
					        },
					        aria: {
					            paginate: {
					                first:    'Primero',
					                previous: 'Anterior',
					                next:     'Siguiente',
					                last:     'Último'
					            }
					        }
					    }
				    } );
				}
			}, 100);

			window.setTimeout(function(){
			    function fullscreenChanged() {
			        if (document.webkitFullscreenElement == null) {
			            mf = document.getElementById("results_proyecteds_frame");
			            mf.style.display="none";
			        }
			    }
			    document.onwebkitfullscreenchange = fullscreenChanged;
			    $("#go-to-rsproyecteds").on("click", function(){
			    	mf = document.getElementById("results_proyecteds_frame");
			        mf.webkitRequestFullscreen();
			        mf.style.display="";
			    }) ;
			}, 1000);

		}
	}
}();