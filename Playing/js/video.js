var player;
var count = 0;
var countWindowOpen = 0;
$(function() {
	$("#btn1").fadeTo("fast", 0);
	try {
		if(typeof exibiNext == "function"){
			exibiNext(false) ;	
		}else{
			parent.exibiNext(false);
		}
	} catch (e) {
		parent.exibiNext(false);
	}
	player = new Video("video");
	player.addSource(new SourceVideo("video/Scorm_OLED_part01.mp4"));
	player.addListener(new ListenerVideo("btn1"));
	player.addActionListener("btn1", "exibe1");
	player.intiVideo();
});

function acopanhaVideo(currentTime, duration) {
	player.onTrackedVideoFrame(currentTime, duration);
	$('#duracao').val(duration);
	$('#time').val(currentTime);
}

function exibe1() {
   parent.funcaoNext();
}

function encerraVideo() {
	var nameID = "#btn1";
	$(nameID).fadeTo("slow", 1);
}