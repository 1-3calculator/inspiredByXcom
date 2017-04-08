// model functions
function Soldier(name){
	this.name = name;
	this.coor = [0,0];
	this.speed = 6;
	
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
				
				this.board[i].push(Math.floor(Math.random()*100));
				
			}
		}
	}
	this.createBoard();
	
	this.moveSoldier = function(coorArray){
		var x = coorArray[0];
		var y = coorArray[1];
		
		if(this.board[x][y] < 94){
			if(distance(this.soldier.coor,coorArray)<this.soldier.speed){
				this.soldier.setCoor(coorArray);
				return true;
			}	
		}
		else
			return false;
	}
}
function distance(pos1,pos2){
	var xDistance = pos1[0]-pos2[0];
	var yDistance = pos1[1]-pos2[1];
	return Math.hypot(xDistance,yDistance)
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
	this.boxImage = new Image;
	this.wallImage = new Image;
	
	this.loadImages = function(){
		this.soldierImage.src = "soldier.png";
		this.grassImage.src = "grass.png";
		this.boxImage.src = "box.png";
		this.wallImage.src = "wall.png";
	}
	this.loadImages();
	
	this.drawSoldier = function(x,y){
		this.context.drawImage(this.soldierImage,x*this.squareSize,y*this.squareSize,this.squareSize,this.squareSize)
	}
	
	this.drawViewport = function(){
		for(var i = 0;i<viewport.length;i++){
			for(var j = 0;j<viewport[i].length;j++){
				
				if(viewport[i][j] > 94)
					this.context.drawImage(this.wallImage,i*this.squareSize,j*this.squareSize,this.squareSize,this.squareSize)
				else if(viewport[i][j] == 94)
					this.context.drawImage(this.boxImage,i*this.squareSize,j*this.squareSize,this.squareSize,this.squareSize)
				else
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
		
		this.v.canvas.addEventListener("click", function(evt) {
        var mousePos = getMousePos(c.v.canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
		var XClickSquare = Math.floor(mousePos.x / c.v.squareSize)
		var YClickSquare = Math.floor(mousePos.y / c.v.squareSize)
		message += " ; "+XClickSquare+","+YClickSquare+" square clicked"
        console.log(message);
		
		c.moveSoldier([XClickSquare,YClickSquare])
      }, false);
	}
	
	this.moveSoldier = function(coorArray){
		if(this.m.game.moveSoldier(coorArray))
			this.v.moveSoldier(coorArray);
		else
			console.log("cant go there")
	}
	
	function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
}