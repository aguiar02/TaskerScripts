//{santander}Santander Informa: Transacao Cartao Mastercard final 9554 de R$ 150,00 aprovada em 03/01/17 as 18:13 POSTO TITAN
//BB: Compra DROGARIA TAMOIO. Cartao final 8029. RS 93,76. 10/01. 15:10. Responda BL8029 se quiser bloquear cartao Lim disp RS 5.700 
//Seguranca Santander: DOC R$ 83,00 em conta corrente 10/01/17 07:09
(function(){
	//doc pagamento piscina
	var reg = /Seguranca Santander: DOC R\$ (\d+,\d+) em conta corrente (\d+\/\d+\/\d+ \d+:\d+)/;
	var match = reg.exec(global('SMSRB'));
	if (match && match[1] == '83,00'){
		setLocal('acao', 'DOCFRED');
		setLocal('valor', match[1]);
		setLocal('data', match[2]);
	}	
	else if (match && match[1] == '50,00'){
		setLocal('acao', 'DOCLEO');
		setLocal('valor', match[1]);
		setLocal('data', match[2]);
	}
	
	//outros docs
	else if (match){
		setLocal('acao', 'DOC');
		setLocal('valor', match[1]);
		setLocal('data', match[2]);
	}
	
	//uso do cartão master
	reg = /{santander}Santander Informa: Transacao Cartao Mastercard final 9554 de R\$ (\d+,\d+) aprovada em (\d+)\/(\d+)\/(\d+) as (\d+:\d+) (.*)/
	match = reg.exec(global('SMSRB'));
	if (match){
		setLocal('acao', 'USOCARTAOSANTANDER');
		setLocal('valor', match[1]);
		setLocal('data', match[4] + '-' + match[3] + '-' + match[2] + ' ' + match[5]);
		setLocal('loja', match[6]);
	}
	
	//compra com o cartão master
	reg = /Seguranca Santander: Compra cartao final 9554 R\$ (\d+,\d+) (\d+)\/(\d+)\/(\d+) (.*) \./
	match = reg.exec(global('SMSRB'));
	if (match){
		setLocal('acao', 'USOCARTAOSANTANDER');
		setLocal('valor', match[1]);
		setLocal('data', match[4] + '-' + match[3] + '-' + match[2] + ' 00:00');
		setLocal('loja', match[5]);
	}
	
	//uso do cartão petrobras
	reg = /BB: Compra (.*)\. Cartao final 8029\. RS (\d+,\d+). (\d+)\/(\d+)\. (\d+:\d+)\. Responda BL8029 se quiser bloquear cartao Lim disp RS (\d+\.\d+) /
	match = reg.exec(global('SMSRB'));
	if (match){
		setLocal('acao', 'USOCARTAOPETROBRAS');
		setLocal('valor', match[2]);
		setLocal('data', '2017-' + match[4] + '-' + match[3] + ' ' + match[5]);
		setLocal('loja', match[1]);
	}
})()
