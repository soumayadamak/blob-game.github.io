var minDiameter = 5;                   // random size >= this
var maxDiameter = window.innerWidth/4; // random size <= this
var enemyDuration = 5000;             // time to cross the document
var thePlayer; 
class Enemy extends Blob{
    constructor(testingMode){
        var color = random.color(); 
        var diameter = Math.floor(Math.random() * (maxDiameter-4)+5);
        var direction = ["left", "right","up", "down"][Math.floor(Math.random()*4)]; 
        super(color, diameter);
        this.direction = direction; 
        this.hasCollided = false; 
        this.setCoords(testingMode);
    }
    collide(){
        this.hasCollided = true; 
        thePlayer.collide(this);
        
    }
    maybeCollide(){
        if (this.hasCollided == false){
            if (super.intersects(thePlayer)){
                this.collide();
            }
        }
    }
    setCoords(testingMode){
        if (this.direction == "right" || this.direction == "left" ){
            if (testingMode !== "start"){
                var yCor = window.innerHeight/2;
            }else{
                 var yCor = random.intBetween(0, window.innerHeight);
             }
            super.setY(yCor); 
            if(this.direction == "right"){
                super.setX(-this.radius);
            }
            super.setX(window.innerWidth + this.radius);
        }
        else if (this.direction == "up" || this.direction == "down" ){
            if (testingMode !== "start"){
                var xCor = window.innerWidth/2;}
             else{
                 var xCor = random.intBetween(0, window.innerWidth);
             }
            super.setX(xCor); 
            if(this.direction == "up"){
                super.setY(window.innerHeight + this.radius);
            }
            super.setY(-this.radius);
        }
    }
    remove(){
        this.elt.remove(); 
    }
    start(){
        if (this.direction == "right"){
            var leftCondition = window.innerWidth;
            var topCondition = "+=0";

        }
        else if (this.direction == "left"){
            var leftCondition = -this.diameter; 
            var topCondition = "+=0";
        }
        else if (this.direction == "up"){
            var topCondition = -this.diameter; 
            var leftCondition = "+=0";

        }
        else{
            var topCondition = window.innerHeight; 
            var leftCondition = "+=0";
        }
        this.elt.animate({left: leftCondition, top : topCondition},{duration : enemyDuration, progress: function(){
            if (thePlayer.diameter <= losingDiameter || thePlayer.diameter >= winningDiameter){
                this.elt.stop(); 
                if(thePlayer.diameter <= losingDiameter){
                    $("#winOrLose").text("You lost!");
                }
                else{
                    $("#winOrLose").text("You won!");
                }
            }
            else{
            var $DOM = $(this.elt);
            var left = parseInt($DOM.css("left"),10);
            var top = parseInt($DOM.css("top"),10);
            this.left = left; 
            this.top = top; 
            var x = left + this.radius;
            var y = top + this.radius;
            this.x = x; 
            this.y = y; 
            this.maybeCollide()
        }}.bind(this) , complete: function(){
            this.remove()
        }.bind(this) });
        
    }
}