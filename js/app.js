// GLOBAL VARIABLES ------------------------------------------
let currentPlayer = '';
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

const setUpArrays = function() {
	// starting values for all of the cells----------------------
	// (the string "ticTac" or "toe" will occupy index 1 in each subarray once the cell has been occupied)
	allTheCellsArray = [
		['A1n',	'', 'A', '1', 'n', '0', 'T.png'],
		['A2',	'', 'A', '2', '0', '0', 'i_lc.png'],
		['A3p',	'', 'A', '3', '0', 'p', 'C.png'],
		['B1',	'', 'B', '1', '0', '0', 't_lc.png'],
		['B2np', '', 'B', '2', 'n', 'p', 'A.png'],
		['B3',	'', 'B', '3', '0', '0', 'c_lc.png'],
		['C1p',	'', 'C', '1', '0', 'p', 'T.png'],
		['C2',	'', 'C', '2', '0', '0', 'o_lc.png'],
		['C3n', '', 'C', '3', 'n', '0', 'E.png']
	];

	// scoreCard array . . . ticTac=index 0, toe=index 1 ---------
	// after each turn, each row, column, and positive/negative slope will be checked to see if it's full
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

// "clickedCell" function = the things that gotta happen when a cell gets clicked -----
const clickedCell = function(event) {

	let currentCellArrayLocation;

	// first, locate correct cell in allTheCellsArray
	let cellObject = this.id.toString();
	for (i = 0; i < allTheCellsArray.length; i++) {
		if (allTheCellsArray[i][0] === cellObject) {
			currentCellArrayLocation = i;
		};
	};	

	// next, determine if that cell has already been occupied; 
	// if not, assign player to that cell, display correct image in it, and update scoreCard array

	if(allTheCellsArray[currentCellArrayLocation][1] !== 'ticTac' && allTheCellsArray[currentCellArrayLocation][1] !== 'toe') {		
		allTheCellsArray[currentCellArrayLocation][1] = currentPlayer;
		let avatarSrc = '';
		if (currentPlayer === 'ticTac') {
			avatarSrc = "img/ticTac_neutral.png";
		} else {
			avatarSrc = "img/toe_neutral.png";
		};
		let imageId = allTheCellsArray[currentCellArrayLocation][0] + "_img";
		document.getElementById(imageId).src = avatarSrc;

		//establish a numeric value for the current player for use in scoreCard index navigation
		let playerIndex = '';
		currentPlayer === 'ticTac' ? playerIndex = 0 : playerIndex = 1;
		
		// increment row, cell, and slope values in scoreCard array ------- 
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
		for(i = 0; i < 8; i++) {
			if(scoreCard[0][i] === 3) {
				nextSteps = 'ticTac wins';
				gameOver('ticTac');
			}
		};
		for(i = 0; i < 8; i++) {
			if(scoreCard[1][i] === 3) {
				nextSteps = 'toe wins';
				gameOver('toe');
			}
		};

		// check to see if there are any empty cells left: if there are, finish turn; if not, game's a tie.
		if(nextSteps === 'finish turn') { 
			let emptyCellCount = 0;
			for (i = 0; i < allTheCellsArray.length; i++) {
				if (allTheCellsArray[i][1] === '') {
					emptyCellCount++;
				};
			};
			if (emptyCellCount === 0) {
				tiedGame();
				nextSteps = 'tied game';
			};
		};

		// finish the turn by switching current player and the avatars
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

	}; 

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

	let winnerImg = "img/" + winner + "_happy.png";
	let loser = '';
	let loserImg = '';

	if(winner === 'toe') {
		loser = 'ticTac';
		document.getElementById('ticTacAvatar').src = "img/ticTac_loses.png";
		document.getElementById('toeAvatar').src = 'img/toe_wins.png';
	} else {
		loser = 'toe';
		document.getElementById('ticTacAvatar').src = "img/ticTac_wins.png";
		document.getElementById('toeAvatar').src = "img/toe_loses.png";
	};

	loserImg = "img/" + loser + "_sad.png"

	// And now we make the cells occupied by the winner happy, and the loser's cells rather sad.
	allTheCellsArray.forEach(cell => {
		let targetId = cell[0] + "_img"
		if(cell[1] == winner) {
			document.getElementById(targetId).src = winnerImg;
		} else if(cell[1] == loser) {
			document.getElementById(targetId).src = loserImg;
		}
	});
};

function clearTheBoard() {
	document.getElementById('toeAvatar').src = "img/toe_blank.png";
	document.getElementById('ticTacAvatar').src = "img/ticTac_blank.png";

	setUpArrays();

	allTheCellsArray.forEach(cell => {
		let imageVar = "img/" + cell[6];
		let targetId = cell[0] + "_img";
		document.getElementById(targetId).src = imageVar;
	})

	getPlayer();
	getListeners();
}
