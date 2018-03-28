var Aluno = function(id,name,score){
	this.id = id;
	this.name = name;
	this.score = score;
    
	this.getID = function(){
		return this.id;
	}

	this.getName = function(){
		return this.name;
	}
	
	this.getScore = function(){
		return this.score;
	}
	
	this.setScore = function(score){
		this.score = score;
	}
}