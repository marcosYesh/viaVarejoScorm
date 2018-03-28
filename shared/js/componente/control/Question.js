/**
 * 
 */
var Question = function(id, text, type, answers, correctAnswer, objectiveId) {
	this.Id = id;
	this.Text = text;
	this.Type = type;
	this.Answers = answers;
	this.CorrectAnswer = correctAnswer;
	this.ObjectiveId = objectiveId;
};