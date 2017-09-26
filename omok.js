var context = null;
var flagTurn = 0;
var flagOver = false;
var os = {};
var stoneArr = [
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],

[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],

[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0]];

function init(){
    var pan = document.getElementById('pan');
    context = pan.getContext('2d');
    os.t = pan.offsetTop;
    os.l = pan.offsetLeft;

    document.getElementById('restart').addEventListener('click',function(){
        for(var i=0;i<15;i++){
            for(var j=0;j<15;j++) stoneArr[i][j]=0;
        }
        context.clearRect(0,0,640,640);
        flagTurn=0;
        flagOver=false;
        paint();
    });
    paint();
}

function canvasClick(evt){
    var i = parseInt((evt.y-os.t-22)/40);
    var j = parseInt((evt.x-os.l-22)/40);
    console.log((evt.y-os.t-22)+" "+(evt.x-os.l-22));

    if(flagOver) return;
    if(i<0 || i>=15 || j<0 || j>=15) return;
    if(stoneArr[i][j]>0) return;
    
    stoneArr[i][j]=flagTurn+1;
    paint();
    check(i,j);
}

function check(i,j){
    var count1 = getCount(i,j,"up") + getCount(i,j,"down") + 1;
    var count2 = getCount(i,j,"left") + getCount(i,j,"right") + 1;
    var count3 = getCount(i,j,"upright") + getCount(i,j,"downleft") + 1;
    var count4 = getCount(i,j,"upleft") + getCount(i,j,"downright") + 1;

    if(count1 == 5) flagOver = true;
    if(count2 == 5) flagOver = true;
    if(count3 == 5) flagOver = true;
    if(count4 == 5) flagOver = true;

    if(flagOver) alert("Game Over\nPlayer "+(flagTurn+1)+" is winner!");
    flagTurn = (flagTurn+1)%2;
}
        
function getCount(i,j,direction) {
    var ret = 0;
    while (true) {
        if(direction == "up") i--;
        if(direction == "down") i++;
        if(direction == "left") j--;
        if(direction == "right") j++;
        if(direction == "upleft") i--,j--;
        if(direction == "upright") i--,j++;
        if(direction == "downleft") i++,j--;
        if(direction == "downright") i++,j++;
        if(i<0 || i>=15 || j<0 || j>=15) break;

        if (stoneArr[i][j] == flagTurn+1) ret++;
        else break;
    }
    return ret;
}
        
function paint() {
    context.lineWidth = 2;
    context.beginPath();
    for (var i = 0; i < 15; i++) {
        context.moveTo(40 + 40 * i, 40 + 0);
        context.lineTo(40 + 40 * i, 40 + 560);
    }
    for (var i = 0; i < 15; i++) {
        context.moveTo(40, 40 + 40 * i);
        context.lineTo(40 + 560, 40 + 40 * i);
    }  
    context.strokeStyle = '#000000';
    context.stroke();
    
    for(var i=0;i<stoneArr.length;i++) {
        for(var j=0;j<stoneArr[i].length;j++) {
            if(stoneArr[i][j]==1) {
                context.fillStyle = "#000000";
                context.beginPath();
                context.arc(40+40*j, 40+40*i,15,0,Math.PI*2,true);
                context.closePath();
                context.fill();
            }
            
            if(stoneArr[i][j]==2){
                context.fillStyle = "#ffffff";
                context.beginPath();
                context.arc(40+40*j, 40+40*i,15,0,Math.PI*2,true);
                context.closePath();
                context.fill();
            }
        }
    }
}
