# inspiredByXcom

simplest form

player controls the soldier by moving the arrow keys. 
the player can make his soldier preform 12 actions. 
the actions are a combination of moving and shooting. 
moving one square takes one action.
shooting takes 6 actions.
a player can only shoot at a target that is within its sight range.
there are walls that a soldeir can hide behind.
enemies will be generated before hand and placed on the map
enemies will move randomly until player's soldier is spotted.
when player is spotted enemies will move and then shoot at the players soldeir
the player's soldeir as well as a enemy is killed when it runs out of hitpoints.
after so many kills the player will level up giving the soldier more hitpoints and greater accuracy

Objectives

this will be a Model, View, Controller game.
functions will have no more then 3 paramters.
this cause smaller more reuseable functions.


functions

distance - returns the distance between two coordinates

angle - returns the angle between two coordinates

move - moves given object a speed of your choosening to coordinates you choosening
until it arraves at the coordinates.

rotate - rotates a given object at the speed your choosening at the angle of your chooseing

resizeObject - resie objects width and height properies. if they dont exist before hand 
they are created and given a getter functions

drawImage - requires a context, and a width and height of the img. it will draw the image
provided or if there is none will draw a box where you want it, at what size and agle you provide

drawGrid - requires box size, and a double int array. you can provide images for grid or default 
will provide different colors to indicate different ints in grid. can prvide up to 8; if images
are provided they will match the int onthe order they are prodived.



objects

AnimationImgs - holds an array of images, and a name to identify them by.
this wil be used to store animation for one action of an object. 
example) you person object that you need to show him walking. you create
a new AnimationImgs object and load it full of the imgs created for a person walking
this gives you all the images needed for your animation to cycle through.

ObjectAnimation - holds an array of animationImgs objects. you can call the run function
and name the animation you want to cycle thorugh and each time you call the run function'
it will return the list of animations

soldier - single peice in th game, can preform actions like move and shoot, and is limited
by number of actions taken, speed of character, and sight range. his actions are animated by
the object animation object, he moves useing the move function, and shoots using the attack function

model - holds the board, the soldier, and has functions that trigger thier interaction between them

view - displays items that controller tells it to.

controller - interacts with the user. tells the model what the user wants to do. tells the view what
to display to the user to let them play the game.




