/**
 * Created by Saniac on 2016/6/23.
 */
var WINDOW_WIDTH = 1366;
var WINDOW_HEIGHT = 600;
var RADIUS = 8;
var SPACE = 1;
var MARGIN_LEFT = 60;
var MARGIN_TOP = 30;
var DIGIT_SIZE = [digit[0].length,digit[0][0].length];
var COLON_SIZE = [digit[10].length,digit[10][0].length];
var DIGIT_SPACE = 30;

var END_TIME = new Date(2016,5,26,18,47,10);
var curShowTimeSeconds = getCurShowTimeSeconds();

var colorList=["#1abc9c","#2ecc71","#16a085",
    "#f1c40f","#e67e22","#f39c12","#2980b9",
    "#8e44ad","#34495e","#c0392b","#7f8c8d","#ee0004"];

var ballList =[];




function getCurShowTimeSeconds() {
    var curTime = new Date();
    var ret = END_TIME.getTime() - curTime.getTime();
    ret = Math.round(ret/1000);
    return ret;
}

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    // render(context);

    setInterval(
        function () {
            render(context);
            update(context);
        },50
    );


    // console.log(END_TIME.getTime());
}

function renderBall(cxt,x,y,color) {
    cxt.beginPath();
    cxt.arc(x,y,RADIUS,0,2*Math.PI);
    cxt.fillStyle = color;

    cxt.closePath();

    cxt.fill();
}


function render(cxt) {
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    // console.log(curShowTimeSeconds);
    var hours = parseInt(curShowTimeSeconds/3600);
    var minutes = parseInt(curShowTimeSeconds%3600/60);
    var seconds = curShowTimeSeconds%60;


    renderDigit(MARGIN_LEFT, MARGIN_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT+ DIGIT_SIZE[1]*2*(RADIUS+SPACE)+DIGIT_SPACE, MARGIN_TOP,hours%10,cxt);
    renderDigit(MARGIN_LEFT+ (DIGIT_SIZE[1]*2)*2*(RADIUS+SPACE)+DIGIT_SPACE*2, MARGIN_TOP,10,cxt);

    renderDigit(MARGIN_LEFT+ (COLON_SIZE[1]+DIGIT_SIZE[1]*2)*2*(RADIUS+SPACE)+DIGIT_SPACE*3, MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+ (COLON_SIZE[1]+DIGIT_SIZE[1]*3)*2*(RADIUS+SPACE)+DIGIT_SPACE*4, MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT+ (COLON_SIZE[1]+DIGIT_SIZE[1]*4)*2*(RADIUS+SPACE)+DIGIT_SPACE*5, MARGIN_TOP,10,cxt);

    renderDigit(MARGIN_LEFT+ (COLON_SIZE[1]*2+DIGIT_SIZE[1]*4)*2*(RADIUS+SPACE)+DIGIT_SPACE*6, MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+ (COLON_SIZE[1]*2+DIGIT_SIZE[1]*5)*2*(RADIUS+SPACE)+DIGIT_SPACE*7, MARGIN_TOP,parseInt(seconds%10),cxt);
    for(var i=0;i<ballList.length;i++){
        renderBall(cxt,ballList[i].x,ballList[i].y,ballList[i].color);
    }
}

function renderDigit(startX, startY, curDigit, cxt) {

    cxt.fillStyle = 'rgb(0, 102, 153)';

    var arr = digit[curDigit];
    for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr[i].length;j++){
            if(arr[i][j]){
                cxt.beginPath();
                cxt.arc(startX+(RADIUS+SPACE)+2*j*(RADIUS+SPACE), startY+(RADIUS+SPACE)+2*i*(RADIUS+SPACE), RADIUS, 0, 2*Math.PI);
                cxt.closePath();

                cxt.fill();
            }
        }
    }
}

function update(cxt) {

    var nextShowTimeSeconds = getCurShowTimeSeconds();
    var nextHours = parseInt(nextShowTimeSeconds/3600);
    var nextMinutes = parseInt(nextShowTimeSeconds%3600/60);
    var nextSeconds = nextShowTimeSeconds%60;

    var hours = parseInt(curShowTimeSeconds/3600);
    var minutes = parseInt(curShowTimeSeconds%3600/60);
    var seconds = curShowTimeSeconds%60;

    if(hours!=nextHours){
        if(parseInt(hours/10)!=parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT, MARGIN_TOP,(nextHours/10),cxt);
            addBalls(MARGIN_LEFT+ DIGIT_SIZE[1]*2*(RADIUS+SPACE)+DIGIT_SPACE, MARGIN_TOP,(nextHours%10),cxt);
        }
        else {
            addBalls(MARGIN_LEFT+ DIGIT_SIZE[1]*2*(RADIUS+SPACE)+DIGIT_SPACE, MARGIN_TOP,(nextHours%10),cxt);
        }
    }
    if(minutes!=nextMinutes){
        if(parseInt(minutes/10)!=parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT+ (COLON_SIZE[1]+DIGIT_SIZE[1]*2)*2*(RADIUS+SPACE)+DIGIT_SPACE*3, MARGIN_TOP,parseInt(nextMinutes/10),cxt);
            addBalls(MARGIN_LEFT+ (COLON_SIZE[1]+DIGIT_SIZE[1]*3)*2*(RADIUS+SPACE)+DIGIT_SPACE*4, MARGIN_TOP,nextMinutes%10,cxt);
        }
        else {
            addBalls(MARGIN_LEFT+ (COLON_SIZE[1]+DIGIT_SIZE[1]*3)*2*(RADIUS+SPACE)+DIGIT_SPACE*4, MARGIN_TOP,nextMinutes%10,cxt);
        }
    }
    if(seconds!=nextSeconds){
        if(parseInt(seconds/10)!=parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT+ (COLON_SIZE[1]*2+DIGIT_SIZE[1]*5)*2*(RADIUS+SPACE)+DIGIT_SPACE*6, MARGIN_TOP,parseInt(nextSeconds/10),cxt);
            addBalls(MARGIN_LEFT+ (COLON_SIZE[1]*2+DIGIT_SIZE[1]*5)*2*(RADIUS+SPACE)+DIGIT_SPACE*7, MARGIN_TOP,nextSeconds%10,cxt);
        }
        else {
            addBalls(MARGIN_LEFT+ (COLON_SIZE[1]*2+DIGIT_SIZE[1]*5)*2*(RADIUS+SPACE)+DIGIT_SPACE*7, MARGIN_TOP,nextSeconds%10,cxt);
        }
        console.log(ballList.length);
    }

    curShowTimeSeconds = nextShowTimeSeconds;

    for(var i=0;i<ballList.length;i++){
        ballList[i].x += ballList[i].vx;
        ballList[i].y += ballList[i].vy;
        ballList[i].vy += ballList[i].g;
        if(ballList[i].y>WINDOW_HEIGHT-RADIUS){
            ballList[i].vy = Math.floor(-0.5*ballList[i].vy);
        }
        if(ballList[i].x>WINDOW_WIDTH||ballList[i].x<0){
            ballList.splice(i,1);
        }
        if(ballList[i].y<3){
            ballList[i].y = 0;
        }
    }
}

function addBalls(startX,startY,num) {
    var arr = digit[num];
    for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr[i].length;j++){
            if(arr[i][j]){
                var aBall = {
                    color:colorList[Math.floor(Math.random()*colorList.length)],
                    vx: 6*Math.pow(-1,Math.ceil(Math.random()*10)),
                    vy:-4,
                    x:startX+(RADIUS+SPACE)+2*j*(RADIUS+SPACE),
                    y:startY+(RADIUS+SPACE)+2*i*(RADIUS+SPACE),
                    g:10
                }
                ballList.push(aBall);
            }
        }
    }

}





























