/**
 * Created by Saniac on 2016/6/23.
 */
var WINDOW_WIDTH = 1366;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var SPACE = 1;
var MARGIN_LEFT = 60;
var MARGIN_TOP = 30;
var DIGIT_SIZE = [digit[0].length,digit[0][0].length];
var COLON_SIZE = [digit[10].length,digit[10][0].length];
var DIGIT_SPACE = 30;

var END_TIME = new Date(2016,5,25,18,47,10);
var curShowTimeSeconds = getCurShowTimeSeconds();

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

    render(context);
    // console.log(END_TIME.getTime());
}

function render(cxt) {
    // console.log(curShowTimeSeconds);
    var hours = parseInt(curShowTimeSeconds/3600);
    // console.log(hours);
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





















