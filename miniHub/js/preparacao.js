var checkBoxGroup = [];
var respondido = false;
var complemeto = "";
var chkSelecionado = false;
var idquestao = 0;

$(function() {
	try {
		parent.testeButon();
		estilo = parent.getEstilo()
		if (estilo == "conteudo1") {
			parent.exibiPrev(false);
		}
		if (estilo == "pergunta1") {
			idquestao = 1;
		}
	} catch (e) {
		estilo = "conteudo"
	}
	$("#corpo").addClass(estilo);
	addCheckBox();
	addCheckBox();
	addCheckBox();
	$(document).on('click', "#btnAction", function() {
		responder()
	});
	exibirPerguntas()
	
});

function addCheckBox() {
	nome = "chkbox" + (checkBoxGroup.length + 1)
	checkBoxGroup.push(new CheckBox(nome));
	$(document).on('click', "#" + nome, function() {
		selectAtivo(this);
	});
}

function selectAtivo(me) {
	chkSelecionado = true;
	$("#btnAction").css("opacity", 1);
	if (respondido == false) {
		$.each(checkBoxGroup, function(index, item) {
			if (item.id == me.id) {
				item.ative(true);
			} else {
				item.ative(false);
			}
		})
	}
}

function responder() {
	if (respondido == false) {
		if (chkSelecionado) {
			respostas = parent.getRespostas(idquestao);
			$.each(checkBoxGroup, function(index, item) {
				teste = item.validar(respostas[index]);
				if(teste){
					parent.addScore();
				}
			});
			$('#btnAction').attr('src', '../shared/image/continuar.png');
			respondido = true;
		}
	} else {
		$('#btnAction').attr('src', '../shared/image/txtResponder.png');
		parent.funcaoNext();
	}
}

function exibirPerguntas() {
	var tipo = parent.getTipoSlide();
	var taxa = 0;
	var taxaButon = 0
	if (tipo == "pergunta") {
		taxa = 1;
		taxaButon =  0.5;
	}
	$.each(checkBoxGroup, function(index, item) {
		item.exibir(taxa);
	});
	$("#btnAction").css("opacity", taxaButon);

}
