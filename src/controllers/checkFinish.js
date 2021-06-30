export const checkFinish = (no_of_moves, max_no_of_moves) => {
	if(no_of_moves === max_no_of_moves){
		let confirm = window.confirm("Game Over. Do you want to restart?");
		if (confirm === true){
			window.location.reload();
		}
	}
	let check = document.getElementsByClassName('active')
	if(check.length === 0){
		let game_complete = window.confirm("hurray!!! You have finished the game in "+ no_of_moves + " moves.");
		if (game_complete === true){
			window.location.reload()
		}
	}
}