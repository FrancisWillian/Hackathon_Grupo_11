function validateForm(form){
	if ((form.getValue("tipoContrato") == null || form.getValue("tipoContrato") == "")
			&& (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
		throw "Favor preencher o campo: Tipo do contrato";
	}
	
	if ((form.getValue("areaProcesso") == null || form.getValue("areaProcesso") == "")
			&& (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
		throw "Favor preencher o campo: Area do Processo";
	}
	
	if ((form.getValue("mediador") == null || form.getValue("mediador") == "")
			&& (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
		throw "Favor preencher o campo: Mediador";
	}
	
	if ((form.getValue("fornecedor") == null || form.getValue("fornecedor") == "")
			&& (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
		throw "Favor preencher o campo: Fornecedor";
	}
	
	if ((form.getValue("contatoFornecedor") == null || form.getValue("contatoFornecedor") == "")
			&& (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
		throw "Favor preencher o campo: Contato Fornecedor";
	}
	
	if ((form.getValue("inicioPrevisto") == null || form.getValue("inicioPrevisto") == "")
			&& (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
		throw "Favor preencher o campo: Inicio Previsto";
	}
	
	if ((form.getValue("vigencia") == null || form.getValue("vigencia") == "")
			&& (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
		throw "Favor preencher o campo: Vigência";
	}
	
	if ((form.getValue("observacoes") == null || form.getValue("observacoes") == "")
			&& (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
		throw "Favor preencher o campo: Observações";
	}
}