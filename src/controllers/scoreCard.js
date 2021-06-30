export const scoreCard = (no_of_moves, max_no_of_moves, max_mashroom) => {
	let score_achived  = document.getElementById('score_achived')
	
	let no_of_moves_score = document.getElementById('no_of_moves')
	let steps_remaining = document.getElementById('steps_remaining')
	let mashrooms_remaining = document.getElementById('mashrooms_remaining')
	steps_remaining.innerHTML = max_no_of_moves -  no_of_moves;
	no_of_moves_score.innerHTML = no_of_moves
	mashrooms_remaining.innerHTML = document.getElementsByClassName('active').length
	score_achived.innerHTML = max_mashroom - document.getElementsByClassName('active').length
}