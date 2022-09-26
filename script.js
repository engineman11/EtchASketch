let times = 16;
let r 
let g 
let b 

const body = document.body; 
body.setAttribute("draggable", false);
body.style.cssText =
" background: rgb(255,80,80); background: linear-gradient(45deg, rgba(255,80,80,1) 0%, rgba(249,255,80,1) 26%, rgba(116,255,130,1) 51%, rgba(97,172,255,1) 77%, rgba(194,50,255,1) 100%); ; margin: 0; height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center"

const container =  document.createElement("div");
container.classList.add("container");
body.appendChild(container);
container.style.cssText =
"height: 90vh; width: 110vh; display: flex; justify-content: space-between; align-items: center; margin: 0 10vw 0 0"

const buttons = document.createElement("div");
buttons.classList.add("buttons");
container.appendChild(buttons);
buttons.style.cssText =
"height: 90vh; width: 10vw; display: flex; flex-direction: column; justify-content: space-evenly; "

const canvas = document.createElement("div"); 
canvas.classList.add("canvas");
container.appendChild(canvas);

function createBox() {
    const box = document.createElement("div");   
    box.classList.add("box");
    canvas.appendChild(box);
    colorBoxWhite(box);
    box.setAttribute("draggable", false)
    box.onselectstart = function () { return false; }
}

function colorBoxWhite(box) {
    r = 255
    g = 255
    b = 255
    box.style.backgroundColor = `rgb(${r},${g},${b})`; 
}

function createCanvas() {
    canvas.style.cssText = `box-shadow: 0 0 10px black; height: 90vh; width: 90vh; grid-template-columns: repeat(${times}, auto); display: grid`;
    canvas.setAttribute("draggable", false)
    canvas.onselectstart = function () { return false; }
    for (let i = 0; i < times * times; i++) {
        createBox();
    }
}

// ###
//         setPen FUNCTIONS   #################
// ###

let color

document.addEventListener('pointerdown', mouseDownListener, true);
document.addEventListener('pointerup', mouseUpListener, true);

function mouseDownListener(e) {
    canvas.addEventListener('pointerover', mouseMoveListener, true);
    canvas.addEventListener('pointerdown', mouseMoveListener, true);
}

function mouseUpListener(e) {
    canvas.removeEventListener('pointerover', mouseMoveListener, true);
    canvas.removeEventListener('pointerdown', mouseMoveListener, true);

}    

let mouseMoveListener

function setPenBlack() {
    mouseMoveListener = function(event) {
        r=0
        g=0
        b=0
        event.target.style.cssText = `background-color: rgb(${r},${g},${b})`
    }
}
 
function setPenDarken() {
    mouseMoveListener = function(event) {
        color = event.target.style.backgroundColor.valueOf();
        colorValues(color)     
        r = colorValues(color)[0] - 26
        g = colorValues(color)[1] - 26
        b = colorValues(color)[2] - 26
        event.target.style.cssText = `background-color: rgb(${r},${g},${b})`
    }  
}


// one 255, one 100, other in between 
// make first 255, 100 or random >> make other depending on that
function setPenPastel() {        
    mouseMoveListener = function(event) {
        r = 255 - (Math.round(Math.random() * 155));
        if (r < 155) {
            g = 255 - (Math.round(Math.random() * 55))
            b = 255 - Math.round(Math.random() * 100)
        } else if (r > 200) {
            g = 255 - (Math.round(Math.random() * 100)) 
            b = 100 + Math.round(Math.random() *55)
        } else {
            g = 100 + (Math.round(Math.random() * 55)) 
            b = 255 - Math.round(Math.random() * 55)
        }
        event.target.style.cssText = `background-color: rgb(${r},${g},${b})`
    }  
}

function setPenEraser() {        
    mouseMoveListener = function(event) {
        r=255
        g=255
        b=255
        event.target.style.cssText = `background-color: rgb(${r},${g},${b})`
    }
}

function clearCanvas() {
    canvas.replaceChildren();
    createCanvas()
}

const buttonBlack = document.createElement("button");
buttonBlack.classList.add("button");
buttonBlack.textContent = "Black Pen";
buttons.appendChild(buttonBlack);
buttonBlack.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center;"

const buttonDarken = document.createElement("button");
buttonDarken.classList.add("button");
buttonDarken.textContent = "Shading Pen";
buttons.appendChild(buttonDarken);
buttonDarken.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center;"

const buttonPastel = document.createElement("button");
buttonPastel.classList.add("button");
buttonPastel.textContent = "Pastel Pen";
buttons.appendChild(buttonPastel);
buttonPastel.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"

const buttonEraser = document.createElement("button");
buttonEraser.classList.add("button");
buttonEraser.textContent = "Eraser Pen";
buttons.appendChild(buttonEraser);
buttonEraser.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"

const buttonClear = document.createElement("button");
buttonClear.classList.add("button");
buttonClear.textContent = "Clear Canvas";
buttons.appendChild(buttonClear);
buttonClear.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"

const buttonTimes16 = document.createElement("button");
buttonTimes16.classList.add("button");
buttonTimes16.textContent = "16x16 Canvas";
buttons.appendChild(buttonTimes16);
buttonTimes16.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"

const buttonTimes32 = document.createElement("button");
buttonTimes32.classList.add("button");
buttonTimes32.textContent = "32x32 Canvas";
buttons.appendChild(buttonTimes32);
buttonTimes32.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"

const buttonTimes64 = document.createElement("button");
buttonTimes64.classList.add("button");
buttonTimes64.textContent = "64x64 Canvas";
buttons.appendChild(buttonTimes64);
buttonTimes64.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"

buttonBlack.addEventListener("click", () => {
    buttonBlack.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; border: solid; border-color: red; border-radius: 6px; text-align: center"
    buttonDarken.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    buttonPastel.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    buttonEraser.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    setPenBlack();
});

buttonDarken.addEventListener("click", () => {
    buttonBlack.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    buttonDarken.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; border: solid; border-color: red; border-radius: 6px; text-align: center"
    buttonPastel.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    buttonEraser.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    setPenDarken();
});

buttonPastel.addEventListener("click", () => {
    buttonBlack.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    buttonDarken.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    buttonPastel.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; border: solid; border-color: red; border-radius: 6px; text-align: center"
    buttonEraser.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    setPenPastel();
});

buttonEraser.addEventListener("click", () => {
    buttonBlack.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    buttonDarken.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    buttonPastel.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    buttonEraser.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; border: solid; border-color: red; border-radius: 6px; text-align: center"
    setPenEraser();
});

buttonClear.addEventListener("click", () => {
    clearCanvas();
});

buttonTimes16.addEventListener("click", () => {
    times = 16;
    buttonTimes16.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; border: solid; border-color: red; border-radius: 6px; text-align: center"
    buttonTimes32.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    buttonTimes64.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    clearCanvas() 
});

buttonTimes32.addEventListener("click", () => {
    times = 32;
    buttonTimes16.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    buttonTimes32.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; border: solid; border-color: red; border-radius: 6px; text-align: center"
    buttonTimes64.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    clearCanvas() 
});

buttonTimes64.addEventListener("click", () => {
    times = 64;
    buttonTimes16.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    buttonTimes32.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; text-align: center"
    buttonTimes64.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; border: solid; border-color: red; border-radius: 6px; text-align: center"
    clearCanvas() 
});

// return array of [r,g,b,a] from any valid color. if failed returns undefined
function colorValues(color)
{
	if (!color)
		return;
	if (color.toLowerCase() === 'transparent')
		return [0, 0, 0, 0];
	if (color[0] === '#')
	{
		if (color.length < 7)
		{
			// convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
			color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
		}
		return [parseInt(color.substr(1, 2), 16),
			parseInt(color.substr(3, 2), 16),
			parseInt(color.substr(5, 2), 16),
			color.length > 7 ? parseInt(color.substr(7, 2), 16)/255 : 1];
	}
	if (color.indexOf('rgb') === -1)
	{
		// convert named colors
		var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
		var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
		temp_elem.style.color = flag;
		if (temp_elem.style.color !== flag)
			return; // color set failed - some monstrous css rule is probably taking over the color of our object
		temp_elem.style.color = color;
		if (temp_elem.style.color === flag || temp_elem.style.color === '')
			return; // color parse failed
		color = getComputedStyle(temp_elem).color;
		document.body.removeChild(temp_elem);
	}
	if (color.indexOf('rgb') === 0)
	{
		if (color.indexOf('rgba') === -1)
			color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
		return color.match(/[\.\d]+/g).map(function (a)
		{
			return +a
		});
	}
}

/* 
Examples:
    colorValues('transparent'); // [0,0,0,0]
    colorValues('white'); // [255, 255, 255, 1]
    colorValues('teal'); // [0, 128, 128, 1]
    colorValues('rgba(11,22,33,.44)'); // [11, 22, 33, 0.44]
    colorValues('rgb(11,22,33)'); // [11, 22, 33, 1]
    colorValues('#abc'); // [170, 187, 204, 1]
    colorValues('#abc6'); // [170, 187, 204, 0.4]
    colorValues('#aabbcc'); // [170, 187, 204, 1]
    colorValues('#aabbcc66'); // [170, 187, 204, 0.4]
    colorValues('asdf'); // undefined
    colorValues(''); // undefined
    colorValues(NaN); // Script Error
    colorValues(123); // Script Error
*/

createCanvas();

setPenBlack();

buttonBlack.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; border: solid; border-color: red; border-radius: 6px"

buttonTimes16.style.cssText = "margin = 1vh auto; height: 7vh; width: 7vw; border: solid; border-color: red; border-radius: 6px"