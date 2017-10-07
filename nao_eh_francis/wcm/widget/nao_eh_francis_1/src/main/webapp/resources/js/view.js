$(document).ready(function(){
	$("#must_1").append(modelCentralTask());
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

modelStatus = function(){
	var template = {
			'texto': 'texto AQUI'
	}

	var painel = '<section class="container-fluid" id="status">'
			   + '	<div class="row">'
			   + '		<div class="col-md-6">'
			   + '			<div style="background-color:red;height:80px!important">'
			   + '				<label>{{texto}}</label>'
			   + '			</div>'
			   + '		</div>'
			   + '	</div>'
			   + '</section>';

	Mustache.render(painel,template);
}

modelCentralTask = function(){
	var template = {
			'texto': 'texto AQUI',
			'solicitar': 'initModalSolicitacao()'
	}

	var painel = '<section class="container-fluid" id="centralTask">'
	 		   + '	<div class="row">'
			   + '		<div class="col-md-6">'
			   + '			<div id="notify">'
			   + '				<ul class="list-group">'
			   + '				    <li class="list-group-item">'
			   + '					        <span class="badge badge-warning">14</span>'
			   + '				        Cras justo odio'
			   + '					    </li>'
			   + '					    <li class="list-group-item">'
			   + '					        <span class="badge badge-danger">2</span>'
			   + '					        Dapibus ac facilisis in'
			   + '					    </li>'
			   + '					    <li class="list-group-item">'
			   + '					        <span class="badge badge-info">1</span>'
			   + '					        Morbi leo risus'
			   + '					    </li>'
			   + '					    <li class="list-group-item">'
			   + '					        <span class="badge badge-success">4</span>'
			   + '					        Amet veritum statum'
			   + '					    </li>'
			   + '					</ul>'
			   + '			</div>'
			   + '		</div>'
			   + '	</div>'
			   + '	<div class="row">'
			   + '		<div class="col-md-6">'
			   + '			<div id="actions">'
			   + '				<button class="btn btn-success btn-sm" onclick="{{solicitar}}">Iniciar solicitação</button>'
			   + '			</div>'
			   + '		</div>'
			   + '	</div>'
			   + '</section>';

	return Mustache.render(painel,template);
}

initModalSolicitacao = function(){
	FLUIGC.modal({
	    title: 'Title',
	    content: modelCamposModal,
	    id: 'fluig-modal',
	    actions: [{
	        'label': 'Save',
	        'bind': 'data-open-modal',
	    },{
	        'label': 'Close',
	        'autoClose': true
	    }]
	}, function(err, data) {
	    if(err) {
	        // do error handling
	    } else {
	        // do something with data
	    }
	});
}

modelCamposModal = function(){
	var consulta = DatasetFactory.getDataset('tipoDeArquivo',null,null,null);
	var options = '<option value="default">Selecione</option>';
		for(i = 0; i < consulta.values.length; i++){
			options += '<option value="'+consulta.values[i]['tipoDocumento']+'">'+consulta.values[i]['tipoDocumento']+'</option>';
		}
			
	var template = {
			'input-class': 'form-control input-sm',
			'options': options
	}

	var painel = '<section class="container-fluid" id="modalSolicitacao">'
			   + '	<div class="row">'
			   + '		<div class="col-md-6">'
			   + '			<label>Tipo do contrato</label>'
			   + '			<select class="{{input-class}}" id="tipoContrato" >'
			   +  options
			   + '			</select>'
			   + '		</div>'
			   + '		<div class="col-md-6">'
			   + '			<label>Inicio Previsto</label>'
			   + '			<input type="text" class="{{input-class}}" id="inicioPrevisto"/>'
			   + '		</div>'
			   + '	</div>'
			   + '	<div class="row">'
			   + '		<div class="col-md-6">'
			   + '			<label>Area do processo</label>'
			   + '			<input type="text" class="{{input-class}}" id="areaProcesso"/>'
			   + '		</div>'
			   + '		<div class="col-md-6">'
			   + '			<label>Vigência</label>'
			   + '			<input type="text" class="{{input-class}}" id="vigencia"/>'
			   + '		</div>'
			   + '	</div>'			   
			   + '	<div class="row">'
			   + '		<div class="col-md-6">'
			   + '			<label>Fornecedor</label>'
			   + '			<input type="text" class="{{input-class}}" id="fornecedor"/>'
			   + '		</div>'
			   + '		<div class="col-md-6">'
			   + '			<label>Contato Fornecedor</label>'
			   + '			<input type="text" class="{{input-class}}" id="contatoFornecedor"/>'
			   + '		</div>'
			   + '	</div>'
			   + '	<div class="row">'
			   + '		<div class="col-md-6">'
			   + '			<label>Mediador</label>'
			   + '			<input type="text" class="{{input-class}}" id="mediador"/>'
			   + '		</div>'
			   + '	</div>'
			   + '</section>';

	return Mustache.render(painel,template);
}
