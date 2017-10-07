$(document).ready(function(){
	//console.log('ok');
	$("#must_1").append(modelStatus());
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

	var painel = '<section class="container-fluid">'
			   + '	<div class="row">'
			   + '		<div class="col-md-6">'
			   + '			<div style="background-color:red;height:80px!important">'
			   + '				<label>{{texto}}</label>'
			   + '			</div>'
			   + '		</div>'
			   + '	</div>'
			   + '</section>';

	return Mustache.render(painel,template);
}


