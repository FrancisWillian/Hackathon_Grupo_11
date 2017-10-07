$(document).ready(function(){
	$("#must_2").append(modelListProcess());
});

getColleagues = function(param=''){
	try{
		if(typeof param == 'object'){
			var multi = param['multi'];
			var filtro = new Array();
			if(multi != true){
				for(i = 0; i < multi; i++){
					filtro.push(DatasetFactory.createConstraint(param[i]['campo'],param[i]['constraint'],param[i]['constraint'],param[i]['tipo']))
				}
			}else{
				filtro.push(DatasetFactory.createConstraint(param['campo'],param['constraint'],param['constraint'],param['tipo']));
			}			
		}else{
			filtro = null
		}
		var consulta = DatasetFactory.getDataset('colleague',null,filtro,null);
		return consulta;
	}catch(e){
		var objMsg = {
					'titulo': 'Ops!',
					'msg': 'Erro ao consultar registros',
					'tipo': 'danger'
				}
		messages(objMsg);
		throw e;
	}
}

messages = function(obj){
	FLUIGC.toast({
        title: obj['titulo'],
        message: obj['msg'],
        type: obj['tipo']
    });
}

modelListProcess = function(){
	var template = {
			'texto': 'texto AQUI'
	}

	var painel = '<section class="container-fluid" id="listProcess">'
	 		   + '	<div class="row">'
			   + '		<div class="col-md-6">'
			   + '			<div id="notify">'
			   + '				<div class="panel-group" id="accordion">'
			   + '						<div class="panel panel-default">'
			   + '								<div class="panel-heading">'
			   + '								<h4 class="panel-title">'
			   + '									<a class="collapse-icon up" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true">'
			   + '									Collapsible Group Item #1'
			   + '									</a>'
			   + '								</h4>'
			   + '							</div>'
			   + '							<div id="collapseOne" class="panel-collapse collapse in" aria-expanded="true" style="">'
			   + '								<div class="panel-body">'
			   + ' 									'
			   + '								</div>'
			   + '							</div>'
			   + '						</div>'
			   + '						<div class="panel panel-default">'
			   + '							<div class="panel-heading">'
			   + ' 								<h4 class="panel-title">'
			   + '									<a class="collapse-icon collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false">'
			   + '									Collapsible Group Item #2'
			   + '									</a>'
			   + ' 								</h4>'
			   + '							</div>'
			   + '							<div id="collapseTwo" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">'
			   + '								<div class="panel-body">'
			   + '									'
			   + '								</div>'
			   + '							</div>'
			   + '						</div>'
			   + '					</div>'
			   + '				</div>'
			   + '			</div>'
			   + '		</div>'
			   + '	</div>'
			   + '</section>';

	return Mustache.render(painel,template);
}
