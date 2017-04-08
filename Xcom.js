// model
const SOLDIERSPEED = 6;
const SOLDIERSIGHT = 10;
const SOLDIERHITPOINTS = 30;
const SOLDIERHALFCOVER = 10;
const SOLDIERFULLCOVER = 15;
const SOLDIERTAKECOVERBONUS = 5;
const SOLDIERXPFORKILL = 500

const PLAYERSQUADSIZE = 4;
const PLAYERSCOREFORKILL = 10;


/*
		
*/
function slope(aCoor,bCoor){
	var rise = aCoor[1] - bCoor[1];
	var run = aCoor[0] - bCoor[0];
	return rise/run;
}

/*
direction: 0 = n, 1 = ne, 2 = e, 3 = se, 4 = s, 5 = sw, 6 = w, 7 = nw;
*/
function direction(aCoor,bCoor){
	var s = slope(aCoor,bCoor);
	var rise = aCoor[1] - bCoor[1];
	var run = aCoor[0] - bCoor[0];

	
	if(s == Infinity && aCoor[1] - bCoor[1] < 0){
		console.log("north");
		return 0; 
	}
	else if(s == Infinity && aCoor[1] + bCoor[1] < 0){
		console.log("south");
		return 4; 
	}
	else if(s == 0 && aCoor[0] + bCoor[0] < 0){
		console.log("east");
		return 2; 
	}
	else if(s == 0 && aCoor[0] - bCoor[0] < 0){
		console.log("west");
		return 6; 
	}
	else if(s > 0 && rise < 0){
		console.log("north east");
		return 1; 
	}
	else if(s > 0 && rise > 0){
		console.log("south west");
		return 5; 
	}
	else if(s < 0 && rise > 0){
		console.log("south east");
		return 3; 
	}
	else {
		console.log("north west");
		return 7; 
	}
	
}

/*
		
*/
function distanceBetween(aCoor,bCoor){
	var rise = aCoor[1] - bCoor[1];
	var run = aCoor[0] - bCoor[0];
	
	return pythagorean(rise,run);
}

/*
		
*/
function pythagorean(sideA, sideB){  
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));  
}  

function rollDice(){
		var a = Math.ceil(Math.random()*6);
		var b = Math.ceil(Math.random()*6);
		var c = Math.ceil(Math.random()*6);
		var d = Math.ceil(Math.random()*6);
		
		var temp = a;
		if(temp > b)
			temp=b;
		if(temp > c)
			temp=c
		if(temp>d)
			temp=d;
		
		if(temp == a)
			return b+c+d;
		else if(temp == b)
			return a+c+d;
		else if(temp == c)
			return a+b+d;
		else
			return a+b+c;
	}
	
	/*
	status 0 = dead, 1 = inactive, 2 = active
	*/
	function soldier(name){
		this.str;
		this.dex;
		this.con;
		this.int;
		this.wis;
		this.cha;
		
		this.cover = 0;
		this.hitpoints;
		this.xp = 0;
		this.level = 0;
		
		this.name = name;
		this.coor = [0,0];
		
		this.speed;
		this.meleeMod;
		this.rangeMod;
		this.coverMod;
		this.hitpointMod;
		this.xpMod;
		
		this.status = 2;
		
		this.team = 0;
		this. killCount = 0;
		this.xpRequiredLevelUp = [500,1000,2000,4000,8000,16000,32000,64000]
		
		/*
		
		*/
		this.generate = function(){
			this.str = rollDice();
			this.dex = rollDice();
			this.con = rollDice();
			this.int = rollDice();
			this.wis = rollDice();
			this.cha = rollDice();
			

			this.meleeMod = Math.floor((this.str - 10)/2);
			
			this.rangeMod = Math.floor((this.dex - 10)/2);
			this.speed = SOLDIERSPEED+((this.dex - 10)/4);

			this.hitpointMod = (this.con - 10)*2;
			this.hitpoints = SOLDIERHITPOINTS + this.hitpointMod;
			
			this.xpMod = ((this.int - 10)/64)+1;
			
			this.coverMod = Math.floor(this.wis - 10)/2;
		}
		this.generate();
		
		/*
		
		*/
		this.levelUp = function(){
			var stat = Math.floor(Math.random()*4)
			
			this.level++;
			
			if(stat == 0){
				this.str++;
				this.meleeMod = Math.floor((this.str - 10)/2);
				console.log("Strength increased");
			}
			else if(stat == 1){
				this.dex++;
				this.rangeMod = Math.floor((this.dex - 10)/2);
				this.speed = SOLDIERSPEED+Math.floor((this.dex - 10)/4);
				console.log("Dexterity increased");
			}
			else if(stat == 2){
				this.con++;
				this.hitpointMod = (this.con - 10)*2;
				this.hitpoints = SOLDIERHITPOINTS + this.hitpointMod;
				console.log("Constitution increased");
			}
			else{
				this.wis++;
				this.coverMod = (this.wis - 10)/2;
				console.log("Wisdom increased");
			}
				
		}
		
		/*
		
		*/
		this.gainXp = function(amountOfXp){
			var xpNeeded = this.xpRequiredLevelUp[this.level]
			
			this.xp += amountOfXp*this.xpMod;
			if(this.xp > xpNeeded){
				this.levelUp();
				console.log(this.name+" level up");
			}
		}
		
		/*

		*/
		this.kill = function(coverType){
			this.killCount++;
			this.gainXp(SOLDIERXPFORKILL)
		}
		
		/*
		
		*/
		this.takeDamage = function(damage){
			this.hitpoints -= damage;
			if(this.hitpoints < 0){
				this.status = 0;
				console.log("soldier died");
			}
		}
		
		/*
		
		*/
		this.reset = function(){
			if(this.status == 1)
				this.status = 2;
		}
		
		this.getSpeed = function(){return this.speed;)
		this.getSight = function(){return this.sight;}
	}
/*
properties:
score
squad
activeSoldier
activePlayer

methods:
actions	
	move active soldier
	melee attack active soldier
	range attack active soldier
	take cover active soldier - needs work
mainatance
	create
	cycle active soldier
	active soldier kill
	reset
*/	
function player(name){
	this.squad = new Array;
	this.score = 0;
	this.activeSoldier = 0;
	this.status = 2;
	this.killCount = 0;
	this.name = name;
	
	this.create = function(){
		for(i=0;i<PLAYERSQUADSIZE;i++){
			this.squad.push(new soldier("soldier"+i));
		}
	}
	this.create();
	
	
}

/*
inputs
	board size
	board density
	number of players
properties
	board size
	board density
		light = 10 pecent cover
		meduim = 20 percent cover
		heavy = 30 percent cover
	number of players
	board
	playerArray
	activePlayer
	
methods
actions
	player move
		space empty
	player range attack
		inputs	
			attackingCoor
		within sight range
		oppenet cover
	player melee attack
		inputs	
			attackingCoor
	player take cover
maintinance
	create
	cycleActivePlayer
	resetPlayers
	

*/
function game(boardSizeArray,boardDensity,numberOfPlayers){
	this.boardSizeArray = boardSizeArray;
	this.boardDensity = boardDensity;
	this.numberOfPlayers = numberOfPlayers;
	this.board = new Array;
	this.playerArray = new Array;
	this.activePlayer = 0;
	
	this.create = function(){
		// create board
		for(i=0;i<this.boardSizeArray[0];i++){
			
			this.board.push(new Array)
			
			for(j=0;j<this.boardSizeArray[1];j++){
				this.board[i].push(Math.floor(Math.random()*20));
			}
		}
		
		// create player array
		for(z=0;z<this.numberOfPlayers;z++){
			this.playerArray.push(new player("player"+z));
		}
	}
	this.create();
	
	this.playerReset = function(){
		for(x=0;x<this.playerArray.length;x++){
			this.playerArray[x].reset();
		}
	}
	
	

}
			/*
				this.surroundingCoverArray = function(d){
			var myCoor = this.coor;
			
			if(d == 0){
				
			}	
			else if(d == 1){
				
			}
			else if(d == 2){
				
			}
			else if(d == 3){
				
			}
			else if(d == 4){
				
			}
			else if(d == 5){
				
			}
			else if(d == 6){
				
			}
			else{
				
			}
		*/
	
function model(){

}
// view
function view(sizeArray,boardTable){
	
}
// controller
function controller(){

}

/*
game
	turnOrder
	player
		active
		score
		squard
			soldierArray
				soldier
					str
					dex
					con
					int
					wis
					cha
					move speed
					range attack
					melee attack
					cover rating
					xp
					hp
					
		actions
			cycle through active soldiers
			command soldier
				shoot
				move
				cover
		
	board
*/