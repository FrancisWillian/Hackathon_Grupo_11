
$(document).ready(function(){
	$("#must_4").append(modelViewDoc());
	requestViewDocs(consultaProcessos3(WCMAPI.getUserCode()));	
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

requestViewDocs = function(docID){
	var user = WCMAPI.getUserCode();
	var envelope = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'
				   +'<soapenv:Header/>'
				   +'<soapenv:Body>'
				    +  '<ws:getAttachmentsList>'
				     +    '<username>'+user+'</username>'
				      +   '<password>fluig</password>'
				       +  '<companyId>1</companyId>'
				       +  '<documentId>'+docID+'</documentId>'
				      +'</ws:getAttachmentsList>'
				   +'</soapenv:Body>'
				+'</soapenv:Envelope>';

	$.ajax({
      url : "http://fluig11.hackathon2017.fluig.io:8080/webdesk/ECMCardIndexService/getAttachmentsList",
          type : 'POST',
          data : envelope,
          success: function(data){
          	//modelViewDoc(); 
          }         
     })
     .done(function(msg){
          console.log(msg);
     })
     .fail(function(jqXHR, textStatus, msg){
          throw msg;
     }); 
}

modelViewDoc = function(docID){
	var template = {
			'solicitar': ''
	}

	var painel = '<section class="container-fluid" id="centralTask">'
				+ '	<div class="row">'
				+ '<div class="col-md-6 rw-head">'
				+ '<label>Titulo</label>'
				+ '</div>'
				+ '</div>'
	 		   + '	<div class="row">'
			   + '		<div class="col-md-6">'
			   + '		<mustc></mustc>'
			   + '		</div>'
			   + '	</div>'
			   + '	<div class="row">'
			   + '		<div class="col-md-6">'
			   + '			<div id="actions" class="col-md-4 pn" onclick="{{solicitar}}">'
			   + '				<span class="fluigicon fluigicon-process fluigicon-lg"></span>'
			   + '			</div>'
			   + '		</div>'
			   + '	</div>'
			   + '</section>';

	return Mustache.render(painel,template);
}

consultaProcessos3 = function(user){
	var f = new Array();
	var c = DatasetFactory.createConstraint('idUsuario',user,user,ConstraintType.MUST);
		f.push(c);
	var consulta = DatasetFactory.getDataset('nao_eh_francis_process',null,f,null);

	return consulta;
}
