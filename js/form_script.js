var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var grd,
    keys_down = [],
	  letters = [];

var symbols=[{k:81,s:"q",x:5},{k:87,s:"w",x:15},{k:69,s:"e",x:25},{k:82,s:"r",x:35},{k:84,s:"t",x:45},{k:89,s:"y",x:55},{k:85,s:"u",x:65},{k:73,s:"i",x:75},{k:79,s:"o",x:85},{k:80,s:"p",x:95},{k:65,s:"a",x:10},{k:83,s:"s",x:20},{k:68,s:"d",x:30},{k:70,s:"f",x:40},{k:71,s:"g",x:50},{k:72,s:"h",x:60},{k:74,s:"j",x:70},{k:75,s:"k",x:80},{k:76,s:"l",x:90},{k:90,s:"z",x:20},{k:88,s:"x",x:30},{k:67,s:"c",x:40},{k:86,s:"v",x:50},{k:66,s:"b",x:60},{k:78,s:"n",x:70},{k:77,s:"m",x:80},{k:48,s:"0",x:90},{k:49,s:"1",x:0},{k:50,s:"2",x:10},{k:51,s:"3",x:20},{k:52,s:"4",x:30},{k:53,s:"5",x:40},{k:54,s:"6",x:50},{k:55,s:"7",x:60},{k:56,s:"8",x:70},{k:57,s:"9",x:80}];

function Letter (key) {
	this.x = findX(key);
	this.symbol = findS(key);
	this.color = "rgba(255, 255, 255, "+Math.random()+")";
	this.size = Math.floor((Math.random() * 40) + 12);
	this.path = getRandomPath(this.x);
	this.rotate = Math.floor((Math.random() * Math.PI) + 1);
	this.percent = 0;
}

Letter.prototype.draw = function() {
	var percent= this.percent/100;
	var xy = getQuadraticBezierXYatPercent(this.path[0],this.path[1],this.path[2],percent);
	ctx.save();
	ctx.translate(xy.x, xy.y);
	ctx.rotate(this.rotate);
	ctx.font = this.size+"px Arial";
	ctx.fillStyle = this.color;
	ctx.fillText(this.symbol, -15, -15);
	ctx.restore();
};

Letter.prototype.drawPath = function(){
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(this.path[0].x, this.path[0].y);
	ctx.quadraticCurveTo(this.path[1].x, this.path[1].y, this.path[2].x, this.path[2].y);
	ctx.stroke();
}

function findX(key){
	for (var i = 0; i < symbols.length; i++) {
		if(symbols[i].k == key){
			return (symbols[i].x * canvas.width / 100);
		}
	};
	return false;
}

function findS(key){
	for (var i = 0; i < symbols.length; i++) {
		if(symbols[i].k == key){
			return symbols[i].s;
		}
	};
	return false;
}

function getRandomPath(x){
	var x_start = x;
	var x_end = x_start + Math.floor((Math.random() * 400) - 199);

	return [{
		x: x_start,
		y: canvas.height
	},{
		x: (x_start + x_end)/2,
		y: Math.floor((Math.random() * canvas.height) - canvas.height)
	},{
		x: x_end,
		y: canvas.height 
	}];
}

function drawBackground(){
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getLineXYatPercent(startPt,endPt,percent) {
	var dx = endPt.x-startPt.x;
	var dy = endPt.y-startPt.y;
	var X = startPt.x + dx*percent;
	var Y = startPt.y + dy*percent;
	return( {x:X,y:Y} );
}

function getQuadraticBezierXYatPercent(startPt,controlPt,endPt,percent) {
	var x = Math.pow(1-percent,2) * startPt.x + 2 * (1-percent) * percent * controlPt.x + Math.pow(percent,2) * endPt.x; 
	var y = Math.pow(1-percent,2) * startPt.y + 2 * (1-percent) * percent * controlPt.y + Math.pow(percent,2) * endPt.y; 
	return( {x:x,y:y} );
}

function getCubicBezierXYatPercent(startPt,controlPt1,controlPt2,endPt,percent){
	var x=CubicN(percent,startPt.x,controlPt1.x,controlPt2.x,endPt.x);
	var y=CubicN(percent,startPt.y,controlPt1.y,controlPt2.y,endPt.y);
	return({x:x,y:y});
}

function CubicN(pct, a,b,c,d) {
	var t2 = pct * pct;
	var t3 = t2 * pct;
	return a + (-a * 3 + pct * (3 * a - a * pct)) * pct
	+ (3 * b + pct * (-6 * b + b * 3 * pct)) * pct
	+ (c * 3 - c * 3 * pct) * t2
	+ d * t3;
}

function resize() {
	var box = canvas.getBoundingClientRect();
	canvas.width = box.width;
	canvas.height = box.height;
	grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.height);
	//grd.addColorStop(0,"#821e69");
	//grd.addColorStop(1,"#4f2556");
}

function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBackground();

	for (var i = 0; i < letters.length; i++) {
		letters[i].percent += 1;
		letters[i].draw();
		// letters[i].drawPath();
		if(letters[i].percent > 100){
			letters.splice(i, 1);
		}
	};

	for (var i = 0; i < keys_down.length; i++) {
		if(keys_down[i]){
			letters.push(new Letter(i));
		}
	};
	requestAnimationFrame(draw);
}
var start_keys = [81,87,69,82,84,89,85,73,79,80];

function startAnimation(){
	setTimeout(function(){
		var key = start_keys.pop();
		keys_down[key] = true;
		setTimeout(function(){
			keys_down[key] = false;
		},180);
		if(start_keys.length > 0){
			startAnimation();
		}
	}, 180);
}
resize();
draw();
//startAnimation();

window.onresize = resize;

/*document.getElementById("frmContact").onkeyup = function(event){
	keys_down[event.keyCode] = false;
}*/

var alreadyInputed = [];

jQuery( "#frmContact input, #frmContact textarea" ).on('keydown touchend', function(e) { //console.log('up');
	var myString = jQuery( this ).val().toLowerCase();
	
	if (myString.length>0){
		var symbol = myString[myString.length - 1];
		var keyCode = symbol.charCodeAt(0)-32;
		//console.log(findS(keyCode)+444);
		//console.log(findS(keyCode));
		if (findS(keyCode)){ 
			keys_down[keyCode] = false;
		}
	}
});

jQuery( "#frmContact input, #frmContact textarea" ).on('keyup', function(e) {

	var myString = jQuery( this ).val().toLowerCase();
	
	//console.log(myString.length+"down");
	if (myString.length>0){
		var symbol = myString[myString.length - 1];
	
		//console.log(symbol);
		var keyCode = symbol.charCodeAt(0)-32;
		//console.log(keyCode);
		if(keyCode == 91 && keyCode == 224){
			keys_down = [];
		}
		else if(keyCode >= 65 && keyCode <= 90 || keyCode >= 48 && keyCode <= 57){
			//if (findS(keyCode))
				keys_down[keyCode] = true;
			setTimeout(function(){
			  keys_down[keyCode] = false;
			}, 500);
		}
	}
	
});


/*document.getElementById("frmContact").onkeydown = function(event){ //alert(event.which);
  if(event.keyCode == 91 && event.keyCode == 224){
    keys_down = [];
  }
	else if(event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode >= 48 && event.keyCode <= 57){
		keys_down[event.keyCode] = true;
	}
}*/

document.getElementById("frmContact").focus();

/** in viewport **/
var watched = 0;
$(window).scroll(function(){
    if ($('#frmContact').isOnScreen() && watched == 0) {
        // The element is visible, do something
        startAnimation();
        //console.log("in viewport!");
        watched = 1;
    } else {
        // The element is NOT visible, do something else
    }
});
$.fn.isOnScreen = function(){

    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};
/** in viewport **/

window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
})();



