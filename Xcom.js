// model functions
function Soldier(name){
	this.name = name;
	
}

function Game(sizeOfBoardX,sizeOfBoardY){
	this.board = new Array;
	this.viewport = new Array;
	this.soldier = new Soldier("bill");
}



// view functions
function BoardView(){}
function SoldierView(){}



// model
function Model(sizeOfBoardX,sizeOfBoardY){
	this.game = new Game(sizeOfBoardX,sizeOfBoardY)

}
// view
function View(sizeOfViewX,sizeOfViewY){
	this.canvas = document.getElementById("myCanvas");
	this.screenX = innerWidth;
	this.screenY = innerHeight;
	this.context = this.canvas.getContext("2d");
	this.squareSize = Math.floor(this.screenX / sizeOfViewX)
	this.soldierImage = new Image;
	
	this.loadImages = function(){
		this.soldierImage.src = "soldier.png";
	}
	this.loadImages();
	
	this.drawSoldier = function(){
		this.context.drawImage(this.soldierImage,0,0,this.squareSize,this.squareSize)
	}

}
// controller
function Controller(){
	this.m = new Model(24,24);
	this.v = new View(24,24);
}