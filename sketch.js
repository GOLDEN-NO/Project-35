var ball1;
var database1,position;
var backgrounds, balloonImage
function preload(){
  backgrounds = loadImage("Hot Air Ballon-01.png")
  balloonImage = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png")
}
function setup(){
    database1 =firebase.database();
    createCanvas(1500,700);
    ball1 = createSprite(250,250,10,10);
    ball1.shapeColor = "red";
    ball1.addAnimation("HotAirBalloon", balloonImage)
    ball1.scale = 0.5
    
var ball1Ref= database1.ref('balloon/position');
ball1Ref.on("value",readPosition,showError)
}

function draw(){
    background(backgrounds);
    if(keyDown(LEFT_ARROW)){
        changePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+10);
    }
    drawSprites();
}

function changePosition(x,y){
    database1.ref('balloon/position').set({
    'x':position.x + x,
    'y':position.y + y
    })
}

function readPosition(data){
    position = data.val();
    ball1.x = position.x;
    ball1.y = position.y;
}

function showError(){
    console.log("GET OUT OF THERE, THERE'S AN ERROR")
}
