
$(document).ready(function(){
	$("#must_1").append(modelCentralTask());
	$('#anexo').change( function(event) {
		var anexo = URL.createObjectURL(event.target.files[0]);
		startProcess();
	});
	modelList(WCMAPI.getUserCode());
	statusProcesso();
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
				+ '<div class="col-md-12 rw-head">'
				+ '<label><h2>Solicitações</h2></label>'
				+ '</div>'
				+ '</div>'
	 		   + '	<div class="row" id="musta">'
	 		    + '		<div class="col-md-4 ">'
	 		     +'			<div id="waiting" div class="col-md-8 pn"></div>'
			   + '		</div>'
			    + '		<div class="col-md-4 " >'
			    + '			<div id="started" class="col-md-8 pn"></div>'
			   + '		</div>'
			    + '		<div class="col-md-4">'
			   + '			<div id="actions" class="col-md-8 pn" style="padding:15px;" onclick="{{solicitar}}">'
			   + '				<span class="fluigicon fluigicon-process fluigicon-lg"></span><label><h2>Iniciar Solicitações</h2></label>'
			   + '			</div>'
			   + '		</div>'
			   + '	</div>'
			   + '	<div class="row">'
			   + '	</div>'
			    + '	<div class="row">'
			   + '		<div class="col-md-12">'
			   + '			<div id="grafico">'
			   + '			</div>'
			   + '		</div>'
			   + '	</div>'
			   + '</section>';

	return Mustache.render(painel,template);
}

var dadosArquivo = [];
initModalSolicitacao = function(){
	FLUIGC.modal({
	    title: 'Title',
	    content: modelCamposModal,
	    id: 'fluig-modal',
	    actions: [{
	        'label': 'Save',
	        'bind': 'onclick="validaCampos();"',
	        'autoClose': true
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

	$("#anexo").change(function(evt){
		var f = evt.target.files[0];
	 
	 //captura a extensao do arquivo
	    var value = $(this).val();
	    var values = value.split('.');
	    var extensao, hash;
	    var z = values[0].split("\\");
		var nomeArquivo = z[2];
	    
	    if (values.length > 0){
	     extensao = (values[values.length - 1]);
	     //console.log(extensao);
	     dadosArquivo.push(extensao);
	    } else {
	    
	    }
	    
	    //gera o base64 do arquivo
	    var reader = new FileReader();
	    reader.readAsDataURL(f);
	    reader.onload = function () {
	     var base64 = (reader.result);
	     var base64encode = base64.split(','); 
	  hash = (base64encode[base64encode.length - 1]);
	  
	  dadosArquivo.push(hash);
	    };
	    reader.onerror = function (error) {
	  
	    };
	    dadosArquivo.push(nomeArquivo);
	    console.log(dadosArquivo);
	   
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
			   + '		<div class="col-md-6">'
			   + '			<label>Vai para cartório?</label>'
			   + '			<select class="{{input-class}}" id="cartorio">'
			   + '				<option value="default">Selecione</option>'
			   + '				<option value="sim">Sim</option>'
			   + '				<option value="nao">Não</option>'
			   + '			</select>'
			   + '		</div>'
			   + '	</div>'
			    + '	<div class="row">'
			   + '		<div class="col-md-12">'
			   + '			<label>Anexar</label>'
			   + '			<input type="file" class="{{input-class}}" id="anexo" />'
			   + '		</div>'
			   + '	</div>'
			    + '	<div class="row">'
			   + '		<textarea class="hide" id="tx"></textarea>'
			   + '	</div>'
			   + '</section>';

	return Mustache.render(painel,template);
}


validaCampos = function(){
	//document.getElementById('anexo').addEventListener('change', lerarquivo, false);
	var evt = $('#anexo');
	var f = evt[0].files[0];
		//f = URL.createObjectURL(f);
		//console.log(f);
		//console.log(getBase64(f));
		//console.log(getBase64(evt));
		f = 'PGh0bWw+CjxoZWFkPgoJPGxpbmsgdHlwZT0idGV4dC9jc3MiIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iL3BvcnRhbC9yZXNvdXJjZXMvc3R5bGUtZ3VpZGUvY3NzL2ZsdWlnLXN0eWxlLWd1aWRlLm1pbi5jc3MiLz4KCTxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBzcmM9Ii9wb3J0YWwvcmVzb3VyY2VzL2pzL2pxdWVyeS9qcXVlcnkuanMiPjwvc2NyaXB0PgoJPHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiIHNyYz0iL3BvcnRhbC9yZXNvdXJjZXMvanMvanF1ZXJ5L2pxdWVyeS11aS5taW4uanMiPjwvc2NyaXB0PgoJPHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiIHNyYz0iL3BvcnRhbC9yZXNvdXJjZXMvanMvbXVzdGFjaGUvbXVzdGFjaGUtbWluLmpzIj48L3NjcmlwdD4KCTxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBzcmM9Ii9wb3J0YWwvcmVzb3VyY2VzL3N0eWxlLWd1aWRlL2pzL2ZsdWlnLXN0eWxlLWd1aWRlLm1pbi5qcyIgY2hhcnNldD0idXRmLTgiPjwvc2NyaXB0Pgo8L2hlYWQ+Cjxib2R5Pgo8ZGl2IGNsYXNzPSJmbHVpZy1zdHlsZS1ndWlkZSI+Cjxmb3JtIG5hbWU9ImZvcm0iIHJvbGU9ImZvcm0iPgoKPGRpdiBjbGFzcz0icm93Ij4KCTxkaXYgY2xhc3M9ImNvbC1tZC00Ij4KCQk8bGFiZWw+VGlwbyBkbyBjb250cmF0bzo8L2xhYmVsPgoJCTxkaXYgY2xhc3M9ImlucHV0LWdyb3VwIj4KCSAgICAJPGlucHV0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIHR5cGU9InRleHQiIG5hbWU9InRpcG9Db250cmF0byIgaWQ9InRpcG9Db250cmF0byIvPgoJCTwvZGl2PgoJCQoJCTxsYWJlbD7BcmVhIGRvIHByb2Nlc3NvPC9sYWJlbD4KCQk8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CgkgICAgCTxpbnB1dCBjbGFzcz0iZm9ybS1jb250cm9sIiB0eXBlPSJ0ZXh0IiBuYW1lPSJhcmVhUHJvY2Vzc28iIGlkPSJhcmVhUHJvY2Vzc28iLz4JICAgIAkKCQk8L2Rpdj4KCQkKCQk8bGFiZWw+TWVkaWFkb3I6PC9sYWJlbD4KCQk8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CgkgICAgCTxpbnB1dCBjbGFzcz0iZm9ybS1jb250cm9sIiB0eXBlPSJ0ZXh0IiBuYW1lPSJtZWRpYWRvciIgaWQ9Im1lZGlhZG9yIi8+CgkJPC9kaXY+CgkJCgkJPGxhYmVsPkZvcm5lY2Vkb3I6PC9sYWJlbD4KCQk8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CgkgICAgCTxpbnB1dCBjbGFzcz0iZm9ybS1jb250cm9sIiB0eXBlPSJ0ZXh0IiBuYW1lPSJmb3JuZWNlZG9yIiBpZD0iZm9ybmVjZWRvciIvPgoJCTwvZGl2PgkKCQkKCQk8bGFiZWw+Q29udGF0byBmb3JuZWNlZG9yOjwvbGFiZWw+CgkJPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgoJICAgIAk8aW5wdXQgY2xhc3M9ImZvcm0tY29udHJvbCIgdHlwZT0idGV4dCIgbmFtZT0iY29udGF0b0Zvcm5lY2Vkb3IiIGlkPSJjb250YXRvRm9ybmVjZWRvciIvPgoJCTwvZGl2PgoJCQoJCTxsYWJlbD5Jbu1jaW8gcHJldmlzdG86PC9sYWJlbD4KCQk8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CgkgICAgCTxpbnB1dCBjbGFzcz0iZm9ybS1jb250cm9sIiB0eXBlPSJ0ZXh0IiBuYW1lPSJpbmljaW9QcmV2aXN0byIgaWQ9ImluaWNpb1ByZXZpc3RvIi8+CgkJPC9kaXY+CgkJCgkJPGxhYmVsPlZpZ+puY2lhOjwvbGFiZWw+CgkJPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgoJICAgIAk8aW5wdXQgY2xhc3M9ImZvcm0tY29udHJvbCIgdHlwZT0idGV4dCIgbmFtZT0idmlnZW5jaWEiIGlkPSJ2aWdlbmNpYSIvPgoJCTwvZGl2PgoJCQoJCTxsYWJlbD5PYnNlcnZh5/Vlczo8L2xhYmVsPgoJCTxkaXYgY2xhc3M9ImlucHV0LWdyb3VwIj4KCSAgICAJPHRleHRhcmVhIGNsYXNzPSJmb3JtLWNvbnRyb2wiIHR5cGU9InRleHQiIG5hbWU9Im9ic2VydmFjb2VzIiBpZD0ib2JzZXJ2YWNvZXMiLz48L3RleHRhcmVhPgoJCTwvZGl2PgoJCQoJCTxsYWJlbD5BcHJvdmHn428gZ2VzdG9yOjwvbGFiZWw+CgkJPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgoJICAgIAk8aW5wdXQgY2xhc3M9ImZvcm0tY29udHJvbCIgdHlwZT0idGV4dCIgbmFtZT0iYXByb3ZHZXN0b3IiIGlkPSJhcHJvdkdlc3RvciIvPgoJCTwvZGl2PgoJCQoJCTxsYWJlbD5BcHJvdmHn428gYWRtOjwvbGFiZWw+CgkJPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgoJICAgIAk8aW5wdXQgY2xhc3M9ImZvcm0tY29udHJvbCIgdHlwZT0idGV4dCIgbmFtZT0iYXByb3ZBZG0iIGlkPSJhcHJvdkFkbSIvPgoJCTwvZGl2PgoJCTxsYWJlbD5BcHJvdmHn428ganVyaWRpY286PC9sYWJlbD4KCQk8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CgkgICAgCTxpbnB1dCBjbGFzcz0iZm9ybS1jb250cm9sIiB0eXBlPSJ0ZXh0IiBuYW1lPSJhcHJvdkp1cmlkaWNvIiBpZD0iYXByb3ZKdXJpZGljbyIvPgoJCTwvZGl2PgoJPC9kaXY+CjwvZGl2PgkKCjwvZm9ybT4KPC9kaXY+CjwvYm9keT4KPC9odG1sPg==';
	
		f = $('#tx').val();
		console.log(f);
	var anexo = [{
            		'item':[{ 
            			'attachmentsSequence':0,
            			'colleagueId':'fluig',	
		                 'colleagueName':'fluig',
		                 'companyId': 1,
		                 'description':'Teste Inicio',
		                 'fileName': 'TESTE',           			
            			'attachments':[{
            				/*'attach':true,
	            			'descriptor':'Anexo',
	            			'editing':true,*/
	            			'fileName':'teste.txt',
	            			'fileSize':0,
	            			'filecontent':''
	            			/*'principal':true,
			                'deleted': false,
			                'newAttach': true*/
		                 }]		                 	                
		               }]
	                }];

	var dados = {
		'tipoContrato': $('#tipoContrato option:selected').text(), 
		'inicioPrevisto': $("#inicioPrevisto").val(),
		'areaProcesso': $("#areaProcesso").val(),
		'vigencia': $("#vigencia").val(),
		'fornecedor': $("#fornecedor").val(),
		'contatoFornecedor': $("#contatoFornecedor").val(),
		'mediador': $("#mediador").val(),
		'cartorio': $("#cartorio option:selected").text()
	}

	startProcess(dados,f);
}

startProcess = function(dados,hash){

	var user = WCMAPI.getUserCode();
	var envelope = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.workflow.ecm.technology.totvs.com/">'
	+   '<soapenv:Header/>'
	+   '<soapenv:Body>'
	+      '<ws:simpleStartProcess>'
	+         '<username>fluig</username>'
	+         '<password>fluig</password>'
	+         '<companyId>1</companyId>'
	+         '<processId>naoEfrancis</processId>'
	+         '<comments>Aberto automaticamente via SOAPUI</comments>'
	+         '<attachments>'
	         
	+         ' <item>'
	+'<attachmentSequence>0</attachmentSequence>'
	          
	   +       '<attachments>'
	  + '<attach>true</attach>'
	     +             '<descriptor>true</descriptor>'
	                  
	    +              '<editing>true</editing>'
	                  
	     +             '<fileName>Meu arquivo.'+dadosArquivo[0]+'</fileName>'
	                  
	    +              '<fileSelected/>'
	    +              '<fileSize>0</fileSize>'
	                  
	    +              '<filecontent>'
	    +                dadosArquivo[2]// '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'
	    +              '</filecontent>'
	                  
	              
	    +              '<principal>true</principal>'

	    +      '</attachments>'
	    +      '<colleagueId>fluig</colleagueId>'
	    +           '<colleagueName>fluig</colleagueName>'
	    +           '<companyId>1</companyId>'
	    +           '<description>'+dadosArquivo[1]+'.'+dadosArquivo[0]+'</description>'
	    +           '<size>0</size>'
	    +      '</item>'
	    +     '</attachments>'
	   +      '<cardData>'
	     + '<item>'
	     + '	<item>mediador</item>'
	     + '	<item name="mediador">'+dados['mediador']+'</item>'
	     + '</item>'
	      + '<item>'
	     + '	<item>idUsuario</item>'
	     + '	<item name="idSolicitante">'+user+'</item>'
	     + '</item>'
	     + '<item>'
	     + '	<item>tipoContrato</item>'
	     + '	<item name="tipoContrato" >'+dados['tipoContrato']+'</item>'
	     + '</item>'
	     + '<item>'
	     + '	<item>areaProcesso</item>'
	     + '	<item name="areaProcesso">'+dados['areaProcesso']+'</item>'
	     + '</item>'
	     + '<item>'
	     + '	<item>fornecedor</item>'
	     + '	<item name="fornecedor">'+dados['fornecedor']+'</item>'
	     + '</item>'
	     + '<item>'
	     + '	<item>contatoFornecedor</item>'
	     + '	<item name="contatoFornecedor">'+dados['contatoFornecedor']+'</item>'
	     + '</item>'
	     + '<item>'
	     + '	<item>inicioPrevisto</item>'
	     + '	<item name="inicioPrevisto">'+dados['inicioPrevisto']+'</item>'
	     + '</item>'
	     + '<item>'
	     + '	<item>vigencia</item>'
	     + '	<item name="vigencia">'+dados['vigencia']+'</item>'
	     + '</item>'
	  +       '</cardData>'
	 +     '</ws:simpleStartProcess>'
	 +  '</soapenv:Body>'
	+'</soapenv:Envelope>​​';

 $.ajax({
      url : "http://fluig11.hackathon2017.fluig.io:8080/webdesk/ECMWorkflowEngineService?wsdl/simpleStartProcess",
          type : 'POST',
          data : envelope,
          success: function(data){
          	modelList(user); 
          }         
     })
     .done(function(msg){
          console.log(msg);
     })
     .fail(function(jqXHR, textStatus, msg){
          throw msg;
     }); 
}

consultaProcessos = function(user){
	var c1;
	var f = new Array();
	var c = DatasetFactory.createConstraint('idUsuario',user,user,ConstraintType.MUST);
		f.push(c);
	var consulta = DatasetFactory.getDataset('nao_eh_francis_process',null,f,null);

	return consulta;
}

modelList = function(user){
	var template = {
		'spn-aguardando':function(){
						var dados = consultaProcessos(user);	
						var spans = [];
						if(dados.values.length > 0){
							spans.push({
								'spn-class':'badge badge-warning badge-lg',
								'spn-value':dados.values.length
							});
						}else{
							spans.push({
								'spn-class':'badge badge-success badge-lg',
								'spn-value':dados.values.length
							});
						}						
						return spans;		
					},
		'iniciado':function(){
						var dados = consultaProcessos(user);
						var span = [];

						if(dados.values.length > 0){
							span.push({
								'spn-classI':'badge badge-success badge-lg',
								'spn-valueI':dados.values.length
							});
						}else{
							span.push({
								'spn-classI':'badge badge-success badge-lg',
								'spn-valueI':dados.values.length
							});
						}
						return span;
				}
	}

	var painel1 = '{{#spn-aguardando}}'
				 + '<span class="{{spn-class}}" style="margin-top:30px;">{{spn-value}}</span>'
				 + '<span style="margin-top:25px;"><h2>Atividades à fazer </h2></span>'
				 + '{{/spn-aguardando}}';
    var painel2 = '{{#iniciado}}'
			     + '<span class="{{spn-classI}}" style="margin-top:30px;">{{spn-valueI}}</span>'
			     + '<span style="margin-top:25px;"><h2>Minhas Solicitações</h2></span>'
			     + '{{/iniciado}}';
	$("#waiting").children().remove();
	$("#started").children().remove();		     
	$("#waiting").append(Mustache.render(painel1,template));
	$("#started").append(Mustache.render(painel2,template));
}


geraGraficos = function(obj){
	var user = WCMAPI.getUserCode();
	var tam;
		$.each(obj,function(k,v){
			console.log(v);
			tam = v.length;
		}); 
	var aL = [];
	var aL1 = 0;
	var aL2 = 0;
	var aL3 = 0;
	var aL4 = 0;
	var aL5 = 0;
	var aL6 = 0;

	var date = new Date();
	var ano = date.getFullYear();
	var mes = date.getMonth()+1;
	var dia = date.getDate();

	if(dia <= 9){
		dia = "0"+dia;
	}

	if(mes <= 9){
		mes = "0"+mes;
	}

		for(i = 0; i < tam;i++){
			if(i > 0){
				if(obj.item[i]['stateDescription'] == 'Juridico avalia o documento'){
					var arrObj = obj.item[i]['deadlineDate'].substr(0,10).split('-');
					var date1 = new Date(ano, mes, dia);
					var date2 = new Date(arrObj[0],arrObj[1],arrObj[2]);	

					if( date2 < date1 ){
						aL4++;
					}else{
						aL1++;
					}
				}
				if(obj.item[i]['stateDescription'] == 'Gestor do processo chancela todas as vias'){
					var arrObj = obj.item[i]['deadlineDate'].substr(0,10).split('-');
					var date1 = new Date(ano, mes, dia);
					var date2 = new Date(arrObj[0],arrObj[1],arrObj[2]);	

					if( date2 < date1 ){
						aL5++;
					}else{
						aL2++;
					}
				}
				if(obj.item[i]['stateDescription'] == 'Departamento administrativo avalia o documento'){
					var arrObj = obj.item[i]['deadlineDate'].substr(0,10).split('-');
					var date1 = new Date(ano, mes, dia);
					var date2 = new Date(arrObj[0],arrObj[1],arrObj[2]);	

					if( date2 < date1 ){
						aL6++
					}else{
						aL3++
					}
				}				
			}else{
				aL.push(obj.item[i]['stateDescription']);
			}			
		}
	var data ={
			labels: ['Juridico avalia o documento','Gestor do processo chancela todas as vias','Departamento administrativo avalia o documento'],
	    	datasets: [
	        {
	            label: "My First dataset",
	            fillColor: "rgba(220,220,220,0.5)",
	            strokeColor: "rgba(220,220,220,0.8)",
	            highlightFill: "rgba(220,220,220,0.75)",
	            highlightStroke: "rgba(220,220,220,1)",
	            data: [aL1,aL2,aL3]
	        },
	        {
	            label: "My Second dataset",
	            fillColor: "rgba(151,187,205,0.5)",
	            strokeColor: "rgba(151,187,205,0.8)",
	            highlightFill: "rgba(151,187,205,0.75)",
	            highlightStroke: "rgba(151,187,205,1)",
	            data: [aL4,aL5,aL6]
	        }
	    ]
	};

var chart = FLUIGC.chart('#grafico', {
	    id: 'set_an_id_for_my_chart',
	    width: '700',
	    height: '200',
	    /* See the list of options */
	});
	// call the bar function
	var barChart = chart.bar(data);
}

showObject = function(obj){
	var newObj;
	if(obj != undefined){
		$.each(obj,function(i,c){
			$.each(c,function(i2,c2){
				$.each(c2,function(i3,c3){
					newObj = c3.WorkflowTasks;
				});
			});
		});
		geraGraficos(newObj);
	}
}

statusProcesso = function(){
	var envelope = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'
   				 + '<soapenv:Header/>'
                 +'<soapenv:Body>'
      			 +'<ws:findMyRequests>'
                 +'<username>fluig</username>'
         		 +'<password>fluig</password>'
         		 +'<companyId>1</companyId>'
         		 +'<colleagueId>fluig</colleagueId>'
                 +'</ws:findMyRequests>';

    $.ajax({
	      url : "http://fluig11.hackathon2017.fluig.io:8080/webdesk/ECMDashBoardService?wsdl/findMyRequests",
	          type : 'POST',
	          data : envelope,
	          success: function(data){
	          	showObject(xml2json(data));
	          }         
	     })
	     .done(function(msg){
	          console.log(msg);
	     })
	     .fail(function(jqXHR, textStatus, msg){
	          throw msg;
	     }); 
	}

function xml2json(xml) {
  try {
    var obj = {};
    if (xml.children.length > 0) {
      for (var i = 0; i < xml.children.length; i++) {
        var item = xml.children.item(i);
        var nodeName = item.nodeName;

        if (typeof (obj[nodeName]) == "undefined") {
          obj[nodeName] = xml2json(item);
        } else {
          if (typeof (obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];

            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xml2json(item));
        }
      }
    } else {
      obj = xml.textContent;
    }
    return obj;
  } catch (e) {
      console.log(e.message);
  }
}

