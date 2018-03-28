var conteudo = "";
var navegador = "";
var tela = "";
var scorm = "";
var scormIsFinalized = false;
var scormIsRegistred = false;
SetupIFrame("contentFrame");

$(function() {
	init();
});

$(window).on('beforeunload',doUnload(false));

$(window).on('unload', doUnload());

function init() {
	setContent();
	navegador = new Navegador();
	navegador.setValorInativo(0, 0);
	tela = new Tela("contentFrame");
	var url = conteudo.getUrlAtual();
	try {
		tela.setSRC(url);
		navegador.ativaBtnNext(false);
		navegador.ativaBtnPrev(false);
		scorm = new  Scorm();
		scorm.setStartTime(new Date());
		scorm.processInitialize(getAPI());
		verificaStatus();
		var bookmark = getBookmark();
		bookmark = testaBookmark(bookmark);
		scorm.processSetValue("cmi.core.lesson_location", bookmark);
	} catch (e) {
		alert(e);
	}
}

function setContent(){
	conteudo = new Content();
	conteudo.addModulo("Playing");
	conteudo.addPage("Playing/video.html");
	conteudo.addPage("Playing/video1.html");
	conteudo.addPage("Playing/video2.html");
	conteudo.addPage("Playing/video3.html");
}

function doUnload(pressedExit) {
	try {
		if (processedUnload == true) {
			return;
		}
		processedUnload = true;
		var endTimeStamp = new Date();
		var totalMilliseconds = (endTimeStamp.getTime() - startTimeStamp
				.getTime());
		var scormTime = ConvertMilliSecondsToSCORMTime(totalMilliseconds, false);
		scorm.setStartTime = (scormTime);
		scorm.processSetValue("cmi.core.session_time", scormTime);
		if (pressedExit == false && reachedEnd == false) {
			scorm.processSetValue("cmi.core.exit", "suspend");
		}
		scorm.processFinish();
	} catch (e) {
		// TODO: handle exception
	}
}

function doExit() {
	try {
		if (reachedEnd == false
				&& confirm("Would you like to save your progress  to resume later?")) {
			scorm.processSetValue("cmi.core.exit", "suspend");
		} else {
			scorm.processSetValue("cmi.core.exit", "");
		}
		doUnload(true);
	} catch (e) {
		// TODO: handle exception
	}
}

function funcaoNext() {
	conteudo.nextPage();
	teste = conteudo.isUltimaPagina();
	verificaStatus();
	var bookmark = getBookmark();
	scorm.processSetValue("cmi.core.lesson_location", bookmark);
	if (teste == true) {
		scorm.processSetValue("cmi.core.lesson_status", "completed");
	} 
	testeButons();
	tela.setSRC(conteudo.getUrlAtual());
};


function testeButons() {
	var testePrev = $("#btnPrev").is(":visible");
	var testeNext = $("#btnNext").is(":visible");
	if (testePrev && testeNext) {
		$("#navDiv").css("margin-top", "-59px");
	} else {
		$("#navDiv").css("margin-top", "-56px");
	}
}

function exibiPrev(value) {
	navegador.ativaBtnPrev(value);
	testeButons();
}

function exibiNext(value) {
	navegador.ativaBtnNext(value);
	testeButons();
}





