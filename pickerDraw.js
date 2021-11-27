


/**********************************  Start of the Color Wheel ************************************/
const colorPicker = new iro.ColorPicker(".colorPicker", {
    width: 200,
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "white",
    margin: 25,
    layout: [
      {
        component: iro.ui.Wheel
      },
      {
        component: iro.ui.Slider,
        options: {
          sliderType: 'saturation'
        }
      },
      {
        component: iro.ui.Slider,
        options: {
          sliderType: 'value'
        }
      },
      {
        component: iro.ui.Slider,
        options: {
          sliderType: 'kelvin'
        }
      }
    ]
  });

const values = document.getElementById("values");
const hexInput = document.getElementById("hexInput");

colorPicker.on(["color:init", "color:change"], function(color){
  values.innerHTML = ["hex: " + color.hexString];
  hexInput.value = color.hexString;
});

hexInput.addEventListener('change', function() {
  colorPicker.color.hexString = this.value;
});

function resetWheel() {
    colorPicker.reset();
}

/**********************************  Start of the Canvas ****************************************/

const canvas = document.getElementById('paint');
const ctx = canvas.getContext('2d');
//const slider = document.getElementsById('mySlider');
//const brushSize = slider.value;
canvas.width = 1400;
canvas.height = 800;



const sketch = document.getElementById('sketch');
const sketch_style = getComputedStyle(sketch);

const mouse = {x: 0, y: 0};
 
/* Mouse Capturing Work */
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

/* Drawing on Paint App */

function getCap(cap){ctx.lineCap = cap}
ctx.lineJoin = 'round';
ctx.lineCap = 'butt';

ctx.strokeStyle = hexInput.value;
function getColor(colour){ctx.strokeStyle = colour;}

function getSize(size){ctx.lineWidth = size;}
 
canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    getColor(hexInput.value);
    ctx.moveTo(mouse.x, mouse.y);
 
    canvas.addEventListener('mousemove', onPaint, false);
}, false);
 
canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);
 
const onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};



