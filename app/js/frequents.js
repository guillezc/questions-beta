var FrequentJS = function(){
	return{
		init: function(){
			window.setTimeout(function(){
				if ( $.fn.dataTable.isDataTable( '#datatable_frequents' ) ) {
				    table = $('#datatable_frequents').DataTable();
				}
				else {
				    table = $('#datatable_frequents').DataTable( {
				        pagingType: 'simple_numbers',
					    language: {
					    	lengthMenu: "Mostrar _MENU_ preguntas",
					    	info: "Mostrando página _PAGE_ de _PAGES_",
					    	infoFiltered: " - filtrado de _MAX_ preguntas",
					    	search: "Filtrar preguntas:",
					    	loadingRecords: "Porfavor espere - cargando...",
					    	infoEmpty: " ",
					    	emptyTable: "No se han encontrado preguntas",
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
			}, 100)
		}
	}
}();