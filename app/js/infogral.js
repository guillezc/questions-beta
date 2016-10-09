var InfoJS = function(){
	return{
		init: function(){
			window.setTimeout(function(){
				if ( $.fn.dataTable.isDataTable( '#datatable_infogral' ) ) {
				    table = $('#datatable_infogral').DataTable();
				}
				else {
				    table = $('#datatable_infogral').DataTable( {
				        pagingType: 'simple_numbers',
					    language: {
					    	lengthMenu: "Mostrar _MENU_ preguntas",
					    	info: "Mostrando página _PAGE_ de _PAGES_",
					    	infoFiltered: " - filtrado de _MAX_ información",
					    	search: "Filtrar información:",
					    	loadingRecords: "Porfavor espere - cargando...",
					    	infoEmpty: " ",
					    	emptyTable: "No se han encontrado información",
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