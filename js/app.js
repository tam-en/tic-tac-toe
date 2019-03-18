// global variables------------------------------------------

const startButtonText = 'start game!'
let currentPlayer = '';
const ticTacState = 'neutral';
const toeState = 'neutral';
let allTheCellsArray = [];
let scoreCard = [];



//function to randomly assign initial player-----------------

const getPlayer = function() {
	if (Math.random() > .5) {
		currentPlayer = 'ticTac';
	} else {
		currentPlayer = 'toe';
	};
	let avatarImage = "img/" + currentPlayer +"_turn.png";
	let avatarImageId = currentPlayer + "Avatar";
	document.getElementById(avatarImageId).src = avatarImage;

}

getPlayer();

function setUpArrays() {
	// starting values for all of the cells----------------------
	// (the string "ticTac" or "toe" will occupy index 1 in each sub array once the cell has been occupied)
	allTheCellsArray = [
		['A1n',	'', 'A', '1', 'n', '0'],
		['A2',	'', 'A', '2', '0', '0'],
		['A3p',	'', 'A', '3', '0', 'p'],
		['B1',	'', 'B', '1', '0', '0'],
		['B2np', '', 'B', '2', 'n', 'p'],
		['B3',	'', 'B', '3', '0', '0'],
		['C1p',	'', 'C', '1', '0', 'p'],
		['C2',	'', 'C', '2', '0', '0'],
		['C3n', '', 'C', '3', 'n', '0']
	];

	//scoreCard array . . . ticTac=index 0, toe=index 1 ---------
	scoreCard = [[
		0, //index 0 = ticTac's A row score
		0, //index 1 = ticTac's B row score
		0, //index 2 = ticTac's C row score
		0, //index 3 = ticTac's 1 column score
		0, //index 4 = ticTac's 2 column score
		0, //index 5 = ticTac's 3 column score
		0, //index 6 = ticTac's n-slope score (negative slope)
		0, //index 7 = ticTac's p-slope score (positive slope)
		], [
		0, //index 0 = toe's A row score
		0, //index 1 = toe's B row score
		0, //index 2 = toe's C row score
		0, //index 3 = toe's 1 column score
		0, //index 4 = toe's 2 column score
		0, //index 5 = toe's 3 column score
		0, //index 6 = toe's n-slope score
		0, //index 7 = toe's p-slope score
	]];
}

setUpArrays();


//all the things that gotta happen when a cell gets clicked -----

let clickedCell = function(event) {

	var currentCellArrayLocation;

	// first, locate correct cell in allTheCellsArray

	var cellObject = this.id.toString();
	for (i = 0; i < allTheCellsArray.length; i++) {
		if (allTheCellsArray[i][0] === cellObject) {
			currentCellArrayLocation = i;
		};
	};

	// next, determine if that cell has already been occupied

	if(allTheCellsArray[currentCellArrayLocation][1] === 'ticTac'|| allTheCellsArray[currentCellArrayLocation][1] === 'toe') {
		console.log('that tickles! cell occupied by', allTheCellsArray[currentCellArrayLocation][1]);
	}
	else {
		allTheCellsArray[currentCellArrayLocation][1] = currentPlayer;
		if (currentPlayer === 'ticTac') {
			var avatarSrc = "img/ticTac_neutral.png";
		} else {
			var avatarSrc = "img/toe_neutral.png";
		};

		var imageId = allTheCellsArray[currentCellArrayLocation][0] + "_img";

		document.getElementById(imageId).src = avatarSrc;


		//establish a numeric value for the current player for use in scoreCard index navigation
		if (currentPlayer === 'ticTac') {
			var playerIndex = 0;
		} else {
			var playerIndex = 1;
		};

		// increment  ABC123np numbers in scoreCard array ------- 

		switch (allTheCellsArray[currentCellArrayLocation][2]) {
			case 'A':
				scoreCard[playerIndex][0]++;
				break;
			case 'B':
				scoreCard[playerIndex][1]++;
				break;
			case 'C':
				scoreCard[playerIndex][2]++;
				break;
			default:
			};

		switch (allTheCellsArray[currentCellArrayLocation][3]) {
			case '1':
				scoreCard[playerIndex][3]++;
				break;
			case '2':
				scoreCard[playerIndex][4]++;
				break;
			case '3':
				scoreCard[playerIndex][5]++;
				break;
			default:
			};

		switch (allTheCellsArray[currentCellArrayLocation][4]) {
			case 'n':
				scoreCard[playerIndex][6]++;
				break;
			default:
			};

		switch (allTheCellsArray[currentCellArrayLocation][5]) {
			case 'p':
				scoreCard[playerIndex][7]++;
				break;
			default:
			};	

		//check for a winner

		var nextSteps = 'finish turn';

		for(q = 0; q < 8; q++) {
			if(scoreCard[0][q] === 3) {
				nextSteps = 'ticTac wins';
				gameOver('ticTac');
			}
		};
		for(q = 0; q < 8; q++) {
			if(scoreCard[1][q] === 3) {
				nextSteps = 'toe wins';
				gameOver('toe');
			}
		};

		//check for a tie 

		if(nextSteps === 'finish turn') { 
			let emptyCellCount = 0;
			for (z = 0; z < allTheCellsArray.length; z++) {
				if (allTheCellsArray[z][1] === '') {
					emptyCellCount++;
				};
			};
			if (emptyCellCount === 0) {
				tiedGame();
				nextSteps = 'tied game';
			};
		};

		// finish the turn 

		if(nextSteps === 'finish turn') {
			var avatarImage = "img/" + currentPlayer +"_blank.png";
			var avatarImageId = currentPlayer + "Avatar";
			document.getElementById(avatarImageId).src = avatarImage;

			//switch current player

			if (currentPlayer === 'ticTac') {
				currentPlayer = 'toe';
			} else {
				currentPlayer = 'ticTac';
			};

			//change the avatar for the new currrent player

			var avatarImage = "img/" + currentPlayer +"_turn.png";
			var avatarImageId = currentPlayer + "Avatar";

			document.getElementById(avatarImageId).src = avatarImage;
		}

	}; //end of else statement tasks

}; //end of clickedCell function


// Event listeners for each cell!-------------------------------------------

function getListeners() {
	allTheCellsArray.forEach(cell => {
		document.getElementById(cell[0]).addEventListener('click', clickedCell);
	});
	document.getElementById("reStart").addEventListener('click', clearTheBoard);
};

getListeners();

function tiedGame() {
	var ticTacAvatarImage = "img/ticTac_tie.png";
	var avatarImage = 'ticTacAvatar';
	document.getElementById(avatarImage).src = ticTacAvatarImage;

	var toeAvatarImage = "img/toe_tie.png";
	var avatarImage = 'toeAvatar';
	document.getElementById(avatarImage).src = toeAvatarImage;
}


function gameOver(winner) {
	// turn off listeners so players can't occupy additional cells after someone has won.
	allTheCellsArray.forEach(cell => {
		document.getElementById(cell[0]).removeEventListener('click', clickedCell);
	});

	if(winner === 'toe') {
		var ticTacAvatarImage = "img/ticTac_blank.png";
		var avatarImage = 'ticTacAvatar';
		document.getElementById(avatarImage).src = ticTacAvatarImage;

		var toeAvatarImage = "img/toe_wins.png";
		var avatarImage = 'toeAvatar';
		document.getElementById(avatarImage).src = toeAvatarImage;

	} else {
		var ticTacAvatarImage = "img/ticTac_wins.png";
		var avatarImage = 'ticTacAvatar';
		document.getElementById(avatarImage).src = ticTacAvatarImage;

		var toeAvatarImage = "img/toe_blank.png";
		var avatarImage = 'toeAvatar';
		document.getElementById(avatarImage).src = toeAvatarImage;

	};

	// And now we make the cells occupied by the winner happy, and the loser's cells rather sad.

	let loser = ''
	if (winner === "ticTac"){
		loser = 'toe'; 
	} else {
		loser = 'ticTac';
	}

	let winnerImg = "img/" + winner + "_happy.png";
	let loserImg = "img/" + loser + "_sad.png";


	allTheCellsArray.forEach(cell => {
		let targetId = cell[0] + "_img"
		console.log("heya!", targetId, "yo!", document.getElementById(targetId).src)
		if(cell[1] == winner) {
			document.getElementById(targetId).src = winnerImg;
		} else if(cell[1] == loser) {
			document.getElementById(targetId).src = loserImg;
		}
	});


	// 	if(cell[1] == winner)




	// 	if(cell[1] === winner) {
	// 		var avatarSrc = "img/ticTac_neutral.png";
	// 	if (cell[1] === 'ticTac') {
			
	// 	} else {
	// 		var avatarSrc = "img/toe_neutral.png";
	// 	};


	// 	} else if(cell[1] != '') {
	// 		console.log(cell[0], "is a losing cell");
	// 	}
	// })


};

function clearTheBoard() {
	let toeAvatarImage = "img/toe_blank.png";
	let avatarImage = 'toeAvatar';
	document.getElementById(avatarImage).src = toeAvatarImage;

	ticTacAvatarImage = "img/ticTac_blank.png";
	avatarImage = 'ticTacAvatar';
	document.getElementById(avatarImage).src = ticTacAvatarImage;

	setUpArrays();

	let imageVar = "img/T.png";
	let targetId = "A1n_img";
	document.getElementById(targetId).src = imageVar;

	imageVar = "img/i_lc.png";
	targetId = 'A2_img';
	document.getElementById(targetId).src = imageVar;

	imageVar = "img/C.png";
	targetId = 'A3p_img';
	document.getElementById(targetId).src = imageVar;

	imageVar = "img/t_lc.png";
	targetId = 'B1_img';
	document.getElementById(targetId).src = imageVar;

	imageVar = "img/A.png";
	targetId = 'B2np_img';
	document.getElementById(targetId).src = imageVar;

	imageVar = "img/c_lc.png";
	targetId = 'B3_img';
	document.getElementById(targetId).src = imageVar;

	imageVar = "img/T.png";
	targetId = 'C1p_img';
	document.getElementById(targetId).src = imageVar;

	imageVar = "img/o_lc.png";
	targetId = 'C2_img';
	document.getElementById(targetId).src = imageVar;

	imageVar = "img/E.png";
	targetId = 'C3n_img';
	document.getElementById(targetId).src = imageVar;

getPlayer();

getListeners();

}
