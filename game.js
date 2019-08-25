
      
document.getElementById("play").addEventListener("click", startGame);
document.getElementById("content").addEventListener("click", sendScore);
document.getElementById("instruction").addEventListener("click", setInstruction);
document.getElementById("reset").addEventListener("click", resetGame);
var retrievedPlayers= JSON.parse(localStorage.getItem('players'));
var contentElement= document.querySelector("#records"); 
var contentName= document.querySelector("#name");
var instructionElement= document.querySelector("#instructionText");
var scoreElement= document.querySelector("#scoree");
var wonElement= document.querySelector("#won");


var playerName;
var scoreVisibility=1;
var instructionVisibility=1;
var setPlay;      

function sendScore(){
    var myAudio = document.createElement("audio");
    myAudio.src = "sounds/click.mp3";
    myAudio.play();
    if(scoreVisibility==1){
         retrievedPlayers.forEach(function(player){
            contentName.innerHTML += player.name +"<br>";
            scoreElement.innerHTML += player.score +"<br>";
            contentName.style.fontFamily = "Rock Salt, cursive";
            scoreElement.style.fontFamily = "Rock Salt, cursive";

		});
    }else{
        contentName.innerHTML="";   
        scoreElement.innerHTML="";   

     }
    scoreVisibility= -scoreVisibility; 
}

function setInstruction(){
    var myAudio = document.createElement("audio");
    myAudio.src = "sounds/click.mp3";
    myAudio.play();
    if(instructionVisibility==1){
        instructionElement.innerHTML="In Breakout game, a layer of bricks lines, the top third of the screen and the"+
         "goal is to destroy them all. A ball moves straight around the screen, bouncing off the top and two sides of the screen."+
          "When a brick is hit, the ball bounces back and the brick is destroyed. The player loses a turn when the ball touches"+
           "the bottom of the screen; to prevent this from happening, the player has a horizontally movable paddle to bounce"+ 
           "the ball upward, keeping it in play. ";   
           instructionElement.style.fontFamily = "Rock Salt, cursive";

    }else{
        instructionElement.innerHTML="";   
     }
     instructionVisibility= -instructionVisibility; 
}
function resetGame(){
    clearInterval(setPlay);
    document.location.reload();
}

function startGame(){
    var iframe = document.getElementById('startAudio');
	iframe.setAttribute('src', '');
    // localStorage.clear();
    name();
    function name(){
        playerName= prompt("Please enter your name:");
        if (playerName == null || playerName == "") { 
            name();   
        } 
      }

    var seconds_left = 4;
    var interval = setInterval(function() {
        var myAudio = document.createElement("audio");
        myAudio.src = "sounds/countDown.mp3";
        myAudio.play();
        document.getElementById('timer_div').innerHTML = --seconds_left;    
        if (seconds_left <= 0) {
            var myAudio = document.createElement("audio");
            myAudio.src = "sounds/letsGo.mp3";
            myAudio.play();
            document.getElementById('timer_div').innerHTML = "";       
            retrievedPlayers= JSON.parse(localStorage.getItem('players'));
            var Players = retrievedPlayers || [];
            var person={};
            var level =1;
            var score=0;
            play();
            function play(){
                var life=3;
                var scoreElemet= document.querySelector("#score"); 
                var levelElemet= document.querySelector("#level");                         
                var lifeElemet= document.querySelector("#life");                         
                var canvas= document.getElementById("myCanvas");
                var ctx = canvas.getContext("2d");
                levelElemet.innerHTML="Level:  "+ level;
                var randomX=Math.floor(Math.random() * canvas.width);
                var circle={
                    x: randomX,
                    y:120,
                    r:5,
                    dx:2,
                    dy:-2
                }
                var paddel={
                    x:100,
                    y:canvas.height-4,
                    w:canvas.width/4,
                    h:4,
                    dx:15
                }            
                var brick={
                    row:3,
                    column:5,
                    b:[],
                    w:canvas.width/7,
                    h:8,
                    padding: 8,
                    paddingtop :7,
                    paddingLeft : 7,
                }
                
                //draw circle
                function drawCircle(){
                    ctx.beginPath();
                    ctx.arc(circle.x,circle.y,circle.r,0,Math.PI*2);
                    ctx.fillStyle = "#36bfff";
                    if(score>=15){
                        ctx.fillStyle= "#ffdb36";
                    }
                    if(score>=30){
                        ctx.fillStyle="#ff365b";
                    }
                    ctx.fill();
                    ctx.closePath();
                }
            
                //draw paddel
                function drawPaddel(){
                    ctx.beginPath();
                    ctx.rect(paddel.x, paddel.y, paddel.w,paddel.h);
                    ctx.fillStyle = "#36bfff";
                    if(score>=15){
                        ctx.fillStyle= "#ffdb36";
                    }
                    if(score>=30){
                        ctx.fillStyle="#ff365b";
                    }
                    ctx.fill();
                    ctx.closePath();
                }
                //detecting bricks
                function brickDetection(){
                    for(var i=0; i<brick.column; i++){
                        for(var j=0; j<brick.row; j++){
                                if( brick.b[i][j].detected==1){
                                    if(circle.x>brick.b[i][j].x && circle.x<brick.b[i][j].x+brick.w && circle.y>brick.b[i][j].y && circle.y<brick.b[i][j].y+brick.h){
                                        if(i==randomI && j==randomJ){
                                            paddel.w=paddel.w+20;
                                            setTimeout(
                                            () => {   
                                                        var myAudio = document.createElement("audio");
                                                        myAudio.src = "sounds/paddelsmall.mp3";
                                                        myAudio.play(); 
                                                        if(score<15 ){paddel.w=paddel.w-20}
                                                        if(score>=15){paddel.w=60} 
                                                        if(score>=30){paddel.w=40}
                                                  }, 5 * 1000);
                                            var myAudio = document.createElement("audio");
                                            myAudio.src = "sounds/PowerUUp.mp3";
                                            myAudio.play();
                                        }else{
                                            var myAudio = document.createElement("audio");
                                            myAudio.src = "sounds/detect.mp3";
                                            myAudio.play();
                                        }
                                        circle.dy=-circle.dy; 
                                        brick.b[i][j].detected=0;
                                        scoreCount();
                                    }
                                }
                        }
                    }
                }
                //counting scores
                function scoreCount(){
                    score+=1;
                    scoreElemet.innerHTML = "Your Score: " + score;
                    if(score==15){
                            randomI=Math.floor(Math.random() * 5);
                            randomJ= Math.floor(Math.random() * 3);
                            level=2; 
                            var myAudio = document.createElement("audio");
                            myAudio.src = "sounds/leveUUp.mp3";
                            myAudio.play();
                            setTimeout(function(){ alert("Great!! You Finished Level 1 "); }, 50); 
                            setTimeout(function(){ alert("Start level 2"); }, 60); 
                            setTimeout(function(){ 
                                for(var i=0; i<brick.column; i++){
                                    brick.b[i]={x:0};
                                    for(var j=0; j<brick.row; j++){ 
                                        brick.b[i][j]={x:0, y:0, detected:1};
                                    }
                                };
                                paddel.w= 60;
                            }, 70);
                            circle.x=randomX;
                            circle.y=130;
                            circle.dx= 2; 
                            circle.dy=-2;
                            levelElemet.innerHTML="Level:  "+ level;
                    }
                    if(score==30){
                        randomI=Math.floor(Math.random() * 5);
                        randomJ= Math.floor(Math.random() * 3);
                        var myAudio = document.createElement("audio");
                        myAudio.src = "sounds/leveUUp.mp3";
                        myAudio.play();
                        setTimeout(function(){ alert("Great!! You Finished Level 2"); }, 50); 
                        setTimeout(function(){ alert("Start level 3"); }, 60); 
                        setTimeout(function(){ 
                        for(var i=0; i<brick.column; i++){
                            brick.b[i]={x:0};
                            for(var j=0; j<brick.row; j++){ 
                                brick.b[i][j]={x:0, y:0, detected:1};
                            }      
                        };
                            paddel.w= 40;
                        }, 70);  
                        circle.x=randomX;
                        circle.y=130;
                        circle.dx= 2; 
                        circle.dy=-2;      
                        level=3;   
                        levelElemet.innerHTML="Level:  "+ level; 
                    } 
                
                    if(score==45){
                        var myAudio = document.createElement("audio");
                                    myAudio.src = "sounds/Firework.wav";
                                    myAudio.play();  
                                    wonElement.innerHTML="You Gained The Highest Score";
                                    var playAgain;
                                    clearInterval(setPlay);
                                    fireWork();
                        setTimeout(
                            () => {   
                                wonElement.innerHTML="";

                                setTimeout(function(){ alert("Congratulation You Gain The Highest Score"); }, 25);                                                       
                                person.name= playerName;
                                person.score=score; 
                                Players.unshift(person);
                                // Put the object into storage
                                localStorage.setItem('players', JSON.stringify(Players));
                                //   alert(localStorage.getItem('players'));
                                console.log(retrievedPlayers);
                                console.log(Players);
                                setTimeout(function(){ alert("Your Score Is : " + score); }, 35);
                                setTimeout(function(){ playAgain= confirm("Do You Want To Play Again?"); 
                                if(playAgain==true){
                                    clearInterval(setPlay);
                                    document.location.reload();
                                }else if(playAgain==false){
                                    clearInterval(setPlay);
                                    document.location.reload();
                                }
                            }, 50);  
                                  },15 * 1000);
                       
                    }                                           
                }
            
                //draw bricks
                for(var i=0; i<brick.column; i++){
                    brick.b[i]={x:0};
                    for(var j=0; j<brick.row; j++){ 
                        brick.b[i][j]={x:0, y:0, detected:1};
                    }
                };
                var randomI=Math.floor(Math.random() * 5);
                var randomJ= Math.floor(Math.random() * 3);
                function drawBricks(){
                    for(var i=0; i<brick.column; i++){       
                        for(var j=0; j<brick.row; j++){ 
                            if(brick.b[i][j].detected==1) {
                                brick.b[i][j].x=((i+0.3)*(brick.w+brick.padding))+brick.paddingLeft;     
                                brick.b[i][j].y=((j+0.7)*(brick.h+brick.padding))+brick.paddingtop;
                                ctx.beginPath();
                                ctx.rect(brick.b[i][j].x, brick.b[i][j].y, brick.w,brick.h );
                                if(i==randomI && j==randomJ){
                                    ctx.fillStyle="green";
                                    ctx.fill();
                                }else{
                                    ctx.fillStyle= "#8fcaff";
                                    ctx.fill();
                                    ctx.closePath();
                                }
                
                            }  
                        }
                    }
                }           
            
                // move the paddel
                document.addEventListener("keydown", function(event){
                    if(event.key == "ArrowRight"){
                        if(paddel.x<canvas.width-paddel.w){
                            paddel.x+=paddel.dx;
                        }
                    }
                    if(event.key == "ArrowLeft"){
                        if(paddel.x>0){
                            paddel.x-=paddel.dx;        }
                    }
                })           
            
                //move the ball
                function moveBall(){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawPaddel();
                    drawCircle();
                    drawBricks();
                    brickDetection();
                    if(circle.y>canvas.height-circle.r|| circle.y<circle.r ){
                        if(circle.y>canvas.height-circle.r){
                            if(circle.x>paddel.x && circle.x<paddel.x+paddel.w){
                                var myAudio = document.createElement("audio");
                                myAudio.src = "sounds/paddel.mp3";
                                myAudio.play();
                                circle.dy=-circle.dy;           
                            }else if(circle.y>canvas.height-circle.r){
                                var myAudio = document.createElement("audio");
                                myAudio.src = "sounds/loseLife.mp3";
                                life= life-1;
                                lifeElemet.innerHTML= "Life: " +life;
                                myAudio.play();
                                if(life==0){
                                    var myAudio = document.createElement("audio");
                                    myAudio.src = "sounds/gaameOver.mp3";
                                    myAudio.play();  
                                    var playAgain;
                                    setTimeout(function(){ alert("Game Over"); }, 25);                                                       
                                    person.name= playerName;
                                    person.score=score; 
                                    Players.unshift(person);
                                    // Put the object into storage
                                    localStorage.setItem('players', JSON.stringify(Players));
                                    //   alert(localStorage.getItem('players'));
                                    console.log(retrievedPlayers);
                                    console.log(Players);
                                    setTimeout(function(){ alert("Your Score Is : " + score); }, 35);
                                    setTimeout(function(){ playAgain= confirm("Do You Want To Play Again?"); 
                                    if(playAgain==true){
                                        clearInterval(setPlay);
                                        document.location.reload();
                                    }else if(playAgain==false){
                                        clearInterval(setPlay);
                                        document.location.reload();
                                    }
                                }, 50);
                                }
                                circle.dy=-circle.dy; 
                            }           
                        }else if(circle.y<circle.r){
                            var myAudio = document.createElement("audio");
                            myAudio.src = "sounds/wall.mp3";
                            myAudio.play();
                            circle.dy=-circle.dy;  
                        } 
                    }
                    if(circle.x>canvas.width-circle.r || circle.x<circle.r ){
                        var myAudio = document.createElement("audio");
                        myAudio.src = "sounds/wall.mp3";
                        myAudio.play();
                        circle.dx=-circle.dx;
                    }
                    circle.x+=circle.dx;
                    circle.y+=circle.dy;
                }
                setPlay= setInterval(moveBall,(17));       
            }
            clearInterval(interval);
        }
    }, 1000);
}








//fireWork
 function fireWork(){

            // helper functions
        const PI2 = Math.PI * 2
        const random = (min, max) => Math.random() * (max - min + 1) + min | 0
        const timestamp = _ => new Date().getTime()

        // container
        class Birthday {
        constructor() {
            this.resize()

            // create a lovely place to store the firework
            this.fireworks = []
            this.counter = 0

        }
        
        resize() {
            this.width = canvas.width = window.innerWidth
            let center = this.width / 2 | 0
            this.spawnA = center - center / 4 | 0
            this.spawnB = center + center / 4 | 0
            
            this.height = canvas.height = window.innerHeight
            this.spawnC = this.height * .1
            this.spawnD = this.height * .5
            
        }
        
        onClick(evt) {
            let x = evt.clientX || evt.touches && evt.touches[0].pageX
            let y = evt.clientY || evt.touches && evt.touches[0].pageY
            
            let count = random(3,5)
            for(let i = 0; i < count; i++) this.fireworks.push(new Firework(
                random(this.spawnA, this.spawnB),
                this.height,
                x,
                y,
                random(0, 260),
                random(30, 110)))
                
            this.counter = -1
            
        }
        
        update(delta) {
            ctx.globalCompositeOperation = 'hard-light'
            ctx.fillStyle = `rgba(20,20,20,${ 7 * delta })`
            ctx.fillRect(0, 0, this.width, this.height)

            ctx.globalCompositeOperation = 'lighter'
            for (let firework of this.fireworks) firework.update(delta)

            // if enough time passed... create new new firework
            this.counter += delta * 3 // each second
            if (this.counter >= 1) {
            this.fireworks.push(new Firework(
                random(this.spawnA, this.spawnB),
                this.height,
                random(0, this.width),
                random(this.spawnC, this.spawnD),
                random(0, 360),
                random(30, 110)))
            this.counter = 0
            }

            // remove the dead fireworks
            if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)

        }
        }

        class Firework {
        constructor(x, y, targetX, targetY, shade, offsprings) {
            this.dead = false
            this.offsprings = offsprings

            this.x = x
            this.y = y
            this.targetX = targetX
            this.targetY = targetY

            this.shade = shade
            this.history = []
        }
        update(delta) {
            if (this.dead) return

            let xDiff = this.targetX - this.x
            let yDiff = this.targetY - this.y
            if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
            this.x += xDiff * 2 * delta
            this.y += yDiff * 2 * delta

            this.history.push({
                x: this.x,
                y: this.y
            })

            if (this.history.length > 20) this.history.shift()

            } else {
            if (this.offsprings && !this.madeChilds) {
                
                let babies = this.offsprings / 2
                for (let i = 0; i < babies; i++) {
                let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
                let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0

                birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))

                }

            }
            this.madeChilds = true
            this.history.shift()
            }
            
            if (this.history.length === 0) this.dead = true
            else if (this.offsprings) { 
                for (let i = 0; this.history.length > i; i++) {
                let point = this.history[i]
                ctx.beginPath()
                ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)'
                ctx.arc(point.x, point.y, 1, 0, PI2, false)
                ctx.fill()
                } 
            } else {
            ctx.beginPath()
            ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)'
            ctx.arc(this.x, this.y, 1, 0, PI2, false)
            ctx.fill()
            }

        }
        }

        let canvas = document.getElementById('myCanvas')
        let ctx = canvas.getContext('2d')

        let then = timestamp()

        let birthday = new Birthday
        window.onresize = () => birthday.resize()
        document.onclick = evt => birthday.onClick(evt)
        document.ontouchstart = evt => birthday.onClick(evt)

        ;(function loop(){
            requestAnimationFrame(loop)

            let now = timestamp()
            let delta = now - then

            then = now
            birthday.update(delta / 1000)
            

        })()
}