import React, { Component } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import { movement } from './controllers/movement';
import { checkFinish } from './controllers/checkFinish';
import { shuffleArray } from './controllers/shuffleArray';
import { scoreCard } from './controllers/scoreCard';

let createReactClass = require('create-react-class');
let items = []
let no_of_moves;
const max_no_of_moves = 60;
let mario_jump;
let max_mashroom;
let width = prompt("Enter width of game: ", "e.g. 10,20,30");
let height = prompt("Enter height of  game: ", "e.g. 10,20,30");


let Score = createReactClass({
	getInitialState: function() {
		return {score: 0}

	},
	render: function() {
		return (
		<div id="score">
			<div>
				<p>Score</p>
				<p id="score_achived">0</p>
			</div>
			<div>
				<p>Steps Used</p>
				<p id="no_of_moves">0</p>
			</div>
			<div >
				<p>Steps Remaining</p>
				<p id="steps_remaining">0</p>
			</div>
			<div >
				<p>Mashroom Remaining</p>
				<p id="mashrooms_remaining">0</p>
			</div>
		</div>
		)
	}
})

let Cell = createReactClass({
	getInitialState: function() {
		return {selected: false}

	},
	render: function() {
		return (
		<div className={this.state.selected?"cell active":"cell"}
			id={this.props.id}>
		</div>
		)
	}
})


let Box = createReactClass({
	getInitialState: function() {
		// build an array to hold all the cells
		//
		let c = []  
		for(let i=1; i<=this.props.matrix; i++){ 
			c.push( <Cell key={i} id={i} cells={c} /> )
			items.push(i)
		}
		return {cells: c} 
	},
	render: function() {
		return (
		  <div> { this.state.cells } </div>
		)    
	}
})


class App extends Component {
 	constructor(props){
		super(props);
		
		if(height == null || width == null || isNaN(width) === true || isNaN(height) === true){
			height = 10
			width = 10
		}
		let matrix_size = height * width
		mario_jump = width
		this.state = {
			matrix_size:matrix_size,
			width:width,
			height:height
		}
	}
	componentDidMount() {
		window.addEventListener('load', this.handleLoad(this.state.width,this.state.height));
	}

	handleLoad(width,height){
		let matrix = document.getElementById('root')
		matrix.style.height = 40 * height + "px"
		matrix.style.width = 40 * width + "px"
		let shuffled_data = shuffleArray(items)
		let truncated_data = shuffled_data.slice(0,parseInt(this.state.matrix_size/3,10))

		for (let i = 0; i < truncated_data.length; i++) {
			let elem_position = document.getElementById(truncated_data[i])
			elem_position.innerHTML="<img src='food.png' alt='mario' class='maze-image'/>";
			elem_position.classList.toggle('active')
		}

		let unique_data = shuffled_data.filter(function(obj) { return truncated_data.indexOf(obj) === -1; });
		let item = unique_data[Math.floor(Math.random()*unique_data.length)];
		let marioposition=document.getElementById(item)
		marioposition.classList.toggle('mario')
		marioposition.innerHTML="<img src='mario.png' alt='mario' class='maze-image'/>";
		max_mashroom = document.getElementsByClassName('active').length
	}
	
	onKeyPress(event){
		if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
			if (no_of_moves === undefined){
			  	no_of_moves = 0
			}
			no_of_moves = no_of_moves + 1;

		}
		movement(event, no_of_moves, mario_jump) 
		checkFinish(no_of_moves, max_no_of_moves)
		scoreCard(no_of_moves, max_no_of_moves, max_mashroom)
	}

	componentWillMount() {
		document.addEventListener("keydown", this.onKeyPress);
	}
	render() {
		return (
			<div className="App">
				<Welcome/>
				<Box matrix={this.state.matrix_size}/>
				<Score/>
			</div>
		);
	}
}

export default App;