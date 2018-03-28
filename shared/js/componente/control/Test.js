/**
 * 
 */
var Test = function(){
	this.questions = [];
	
	this.getQuestions = function(){
		return this.questions;
	};
	
	this.add = function( id,text, type, answers, correctAnswer, objectiveId){
		this.questions.push(new Question(id,text, type, answers, correctAnswer, objectiveId));
	};
	
	this.questionCount = function(){
		return this.questions.length;
	};
};