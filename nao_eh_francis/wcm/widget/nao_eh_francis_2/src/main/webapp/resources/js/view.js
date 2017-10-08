$(document).ready(function(){
	$("#must_2").append(modelListProcess());
	consultaProcessos2();
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

modelListProcess = function(obj){
	var newObj;
	if(obj != undefined){
		$.each(obj,function(i,c){
			$.each(c,function(i2,c2){
				$.each(c2,function(i3,c3){
					newObj = c3.WorkflowTasks;
				});
			});
		});
		mustacheTable(newObj);
	}
}

mustacheTable = function(newObj){
	console.log(newObj.item[0]);
	
	var template = {
			'linha':function(){
					var ret = [];
					for(var i = 0; i < 39; i++){
						var d = [];
							d.push({
								'prazo':newObj.item[i]['deadlineText'],
								'requisitante':newObj.item[i]['requesterName'],
								'descricaoAtividade':newObj.item[i]['stateDescription']
							});
						ret.push({

							'solicitante': newObj.item[i]['processInstanceId'],
							'data': newObj.item[i]['startupHour'],
							'idLinha': 'rw_'+i,
							'idLinhaCollapse': 'rwc_'+i,
							'sub': d,
							'atividade':newObj.item[i]['stateDescription']
						});
					}
					return ret;
			}
	}

	var painel = '<section class="container-fluid" id="listProcess" >'
				+ '	<div class="row">'
				+ '<div class="col-md-12 rw-head">'
				+ '<label><h2>Acompanhamento</h2></label>'
				+ '</div>'
				+ '</div>'
	 		   + '	<div class="row">'
			   + '		<div class="col-md-12" style="height:300px!important;overflow-x:hidden;overflow-y:scroll;">'
			   + '			<table class="table table-stripped">'
			   + '				<thead>'
			   + '					<tr>'
			   + '						<th>Solicitação</th>'			   
			   + '						<th>Atividade corrente</th>'
			   + '						<th>Data</th>'
			   + '					</tr>'	
			   + '				</thead>'
			   + '				<tbody>'
			   + '					{{#linha}}'
			   + '					<tr id="{{idLinha}}">'
			   + '						<td>{{solicitante}}</td>'
			   + '						<td>{{atividade}}</td>'
			   + '						<td>{{data}} <span class="fluigicon fluigicon-pointer-down fluigicon-sm pull-right" data-toggle="collapse" data-target="#{{idLinhaCollapse}}" style="color:#009bfb;cursor:pointer;"></span></td>'
			   + '					</tr>'
			   + '					<tr id="{{idLinhaCollapse}}" class="collapse">'
			   + '						<td colspan="3">'
			   + '							{{#sub}}'
			   +'							<div class="container-fluid">'
				+ '								<div class="row">'
				+ '									<div class="col-md-6">'
				+ '										<label>Expiração</label>'
				+ '									</div>'
				+ '								<div class="col-md-6">'
				+ '									<label>{{prazo}}</label>'
				+ '								</div>'
				+ '							</div>'
				+ '						<div class="row">'
				 + '						<div class="col-md-6">'
				+ '								<label>Solicitante</label>'
				 + '								</div>'
				 + '									<div class="col-md-6">'
				 + '										<label>{{requisitante}}</label>'
				 + '									</div>'
				 + '								</div>'
				 + '								<div class="row">'
				 + '								<div class="col-md-6">'
				 + '									<label>Atividade atual</label>'
				 + '								</div>'
				 + '								<div class="col-md-6">'
				 + '									<label>{{descricaoAtividade}}</label>'
				 + '								</div>'
				 + '							</div>'
				 + '						</div>'
			   + '							{{/sub}}'
			   + '						</td>'
			   + '					</tr>'	
			   + '					{{/linha}}'
			   + '				</tbody>'
			   + '		</div>'
			   + '	</div>'
			   + '</section>';

	$("#must_2").html(Mustache.render(painel,template));
}

consultaProcessos2 = function(){
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
	          	modelListProcess(xml2json(data));
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

