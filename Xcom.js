// model functions
function Soldier(name){
	this.name = name;
	this.coor = [0,0];
	
	this.getCoor = function(){return this.coor;}
	this.setCoor = function(coorArray){this.coor = coorArray;}
}

function Game(sizeOfBoardX,sizeOfBoardY){
	this.board = new Array;
	this.viewport = new Array;
	this.soldier = new Soldier("bill");
	
	
	this.createBoard = function(){
		for(var i = 0;i<sizeOfBoardX;i++){
			
			this.board.push(new Array)
			
			for(var j = 0;j<sizeOfBoardY;j++){
				
				this.board[i].push(0);
				
			}
		}
	}
	this.createBoard();
	
	this.moveSoldier = function(coorArray){this.soldier.setCoor(coorArray);}
}



// view functions
function BoardView(){}
function SoldierView(){}



// model
function Model(sizeOfBoardX,sizeOfBoardY){
	this.game = new Game(sizeOfBoardX,sizeOfBoardY)

}
// view
function View(viewport){
	this.canvas = document.getElementById("myCanvas");
	this.screenX = innerWidth;
	this.screenY = innerHeight;
	this.canvas.width = this.screenX;
	this.canvas.height = this.screenY;
	this.context = this.canvas.getContext("2d");
	this.squareSize = Math.floor(this.screenX / viewport.length)
	this.soldierImage = new Image;
	this.grassImage = new Image;
	
	this.loadImages = function(){
		this.soldierImage.src = "soldier.png";
		this.grassImage.src = "grass.png";
	}
	this.loadImages();
	
	this.drawSoldier = function(x,y){
		this.context.drawImage(this.soldierImage,x*this.squareSize,y*this.squareSize,this.squareSize,this.squareSize)
	}
	
	this.drawViewport = function(){
		for(var i = 0;i<viewport.length;i++){
			for(var j = 0;j<viewport[i].length;j++){
				this.context.drawImage(this.grassImage,i*this.squareSize,j*this.squareSize,this.squareSize,this.squareSize)
			}
		}
	}
	
	this.moveSoldier = function(coorArray){
		var x = coorArray[0];
		var y = coorArray[1];
		this.drawViewport();
		this.drawSoldier(x,y);
	}
}
// controller
function Controller(){
	this.m = new Model(24,24);
	this.v = new View(this.m.game.board);
	
	this.start = function(){
		this.v.drawViewport();
		this.v.drawSoldier(1,1);
	}
	
	this.moveSoldier = function(coorArray){
		this.m.game.moveSoldier(coorArray);
		this.v.moveSoldier(coorArray);
	}
}