let canvas, context;
canvas = document.getElementById('canvas');
loadAll();

//Function to load Canvas and all Items on Canvas.
function loadAll(color){
    loadCanvas(color);
    loadCanvas.drawJug();
    loadCanvas.drawCups();
    loadCanvas.drawSurface();
}

function loadAllInverted(color){
    loadCanvas(color);
    loadCanvas.drawJugInverted();
    loadCanvas.drawCups();
    loadCanvas.drawSurface();
}


//Code for the HTML Canvas.
function loadCanvas(gradColor = "rgba(255,255,255,0.01)"){
    if (canvas && canvas.getContext) {
        context = canvas.getContext('2d');
        
        //Clear canvas then redraw
        context.clearRect(0, 0, canvas.width, canvas.height);

        let gradient = context.createLinearGradient(0,260,0,270);
        gradient.addColorStop(0.7, 'rgba(255,255,255,0.01)');
        gradient.addColorStop(1,gradColor);

        let translateWidth = canvas.width/6;
        let translateHeight = canvas.height/6;
        let canvasX = 0;
        let canvasY = 0;
        let radius = 40;
        context.lineWidth = 3; // Oval border width
        context.strokeStyle = 'black'; // Oval border colors
    
    //Jug Code
    function drawJug() {
         // Draws the top of the jug. 
         context.save(); // Saves current canvas state
         context.translate(translateWidth, translateHeight); //This ses where the oval should show on the page
         context.scale(2,0.3); //Sets the shape  by adjusting the x and y axis
         context.beginPath();
         context.arc(canvasX, canvasY, radius, 0, Math.PI*2, false); //arc(x, y, radius, startAngle, endAngle, anticlockwise)        
         context.restore();// Restores saved canvas state
         context.stroke();
 
         // Color
         context.fillStyle = "rgba(255,255,255,0.01)";
         context.fill();
        
         //Using a Beizer Curve for the Body of the Jug (First Curve)
         context.save();
         context.translate(translateWidth, translateHeight);
         context.beginPath();
         context.moveTo(-80, 0);
         context.bezierCurveTo(-30,40,-30,50,-60,150);
     
         //Using a Quadratic Curve for the Body of the Jug (Second Curve)
         // context.moveTo(-60, 150);
         context.quadraticCurveTo(-135,400,0,400); //
         
         //Using a Beizer Curve for the Body of the Jug (Third Curve)
         // context.moveTo(0, 400);
         context.bezierCurveTo(320,420,-20,100,80,0);
        
         context.stroke();
         context.restore();
     
         // Color
         context.fillStyle = gradient;
         context.fill();
     
         //Using a Beizer Curve for the Handle of the Jug
         context.save();
         context.translate(translateWidth, translateHeight);
         context.beginPath();
         context.moveTo(60, 50);
         context.bezierCurveTo(250,50,70,210,130,250);
         context.stroke();
         context.restore();
         
         // Color
         context.fillStyle = "rgba(255,255,255,0.01)";
         context.fill();
    }
       
    function drawJugInverted() {
        // Draws the top of the jug. 
        context.save(); // Saves current canvas state
        context.translate(translateWidth, translateHeight); //This ses where the oval should show on the page
        context.scale(2,0.3); //Sets the shape  by adjusting the x and y axis
        context.beginPath();
        context.arc(canvasX, canvasY, radius, 0, Math.PI*2, false); //arc(x, y, radius, startAngle, endAngle, anticlockwise)        
        context.restore();// Restores saved canvas state
        context.stroke();

        // Color
        context.fillStyle = "rgba(255,255,255,0.01)";
        context.fill();
       
        //Using a Beizer Curve for the Body of the Jug (First Curve)
        context.save();
        context.translate(translateWidth, translateHeight);
        context.scale(-1,1);
        context.beginPath();
        context.moveTo(-80, 0);
        context.bezierCurveTo(-30,40,-30,50,-60,150);
    
        //Using a Quadratic Curve for the Body of the Jug (Second Curve)
        // context.moveTo(-60, 150);
        context.quadraticCurveTo(-135,400,0,400); //
        
        //Using a Beizer Curve for the Body of the Jug (Third Curve)
        // context.moveTo(0, 400);
        context.bezierCurveTo(320,420,-20,100,80,0);
       
        context.stroke();
        context.restore();
    
        // Color
        context.fillStyle = gradient;
        context.fill();
    
        //Using a Beizer Curve for the Handle of the Jug
        context.save();
        context.translate(translateWidth, translateHeight);
        context.scale(-1,1);
        context.beginPath();
        context.moveTo(60, 50);
        context.bezierCurveTo(250,50,70,210,130,250);
        context.stroke();
        context.restore();
        
        // Color
        context.fillStyle = "rgba(255,255,255,0.01)";
        context.fill();
   }
    
    // Cups
    function drawCups() {
        // Cup 1
        //Rim of cup 1
        context.save(); 
        context.translate(translateWidth, translateHeight); 
        context.scale(2,0.3); 
        context.beginPath();
        context.arc(212.5, 1030, 11.8, 0, Math.PI*2, false);
        context.stroke(); 
        context.restore();
    
        //Body of cup 1
        context.save();
        context.translate(translateWidth, translateHeight);
        context.beginPath();
        context.moveTo(400, 310);
        context.bezierCurveTo(350,430, 500,430, 450,310); //bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        // context.fillStyle = '#cccccc';
        // context.fill();
        context.stroke();
        context.restore();
    
    // Cup 2
        //Rim of cup 2
        context.save(); 
        context.translate(translateWidth, translateHeight); 
        context.scale(2,0.3); 
        context.beginPath();
        context.arc(262.5, 1030, 11.8, 0, Math.PI*2, false);
        context.stroke(); 
        context.restore();
    
        //Body of cup 2
        context.save();
        context.translate(translateWidth, translateHeight);
        context.beginPath();
        context.moveTo(500, 310);
        context.bezierCurveTo(450,430, 600,430, 550,310); //bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        context.stroke();
        context.restore();
    
    // Cup 3
        //Rim of cup 3
        context.save(); 
        context.translate(translateWidth, translateHeight); 
        context.scale(2,0.3); 
        context.beginPath();
        context.arc(312.5, 1030, 11.8, 0, Math.PI*2, false);
        context.stroke(); 
        context.restore();
    
        //Body of cup 3
        context.save();
        context.translate(translateWidth, translateHeight);
        context.beginPath();
        context.moveTo(600, 310);
        context.bezierCurveTo(550,430, 700,430, 650,310); //bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        context.stroke();
        context.restore();
    
    // Cup 4    
        //Rim of cup 4
        context.save(); 
        context.translate(translateWidth, translateHeight); 
        context.scale(2,0.3); 
        context.beginPath();
        context.arc(362.5, 1030, 11.8, 0, Math.PI*2, false);
        context.stroke(); 
        context.restore();
    
        //Body of cup 4
        context.save();
        context.translate(translateWidth, translateHeight);
        context.beginPath();
        context.moveTo(700, 310);
        context.bezierCurveTo(650,430, 800,430, 750,310); //bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        context.stroke();
        context.restore();
    
    // Cup 5    
        //Rim of cup 5
        context.save(); 
        context.translate(translateWidth, translateHeight); 
        context.scale(2,0.3); 
        context.beginPath();
        context.arc(412.5, 1030, 11.8, 0, Math.PI*2, false);
        context.stroke(); 
        context.restore();
    
        //Body of cup 5
        context.save();
        context.translate(translateWidth, translateHeight);
        context.beginPath();
        context.moveTo(800, 310);
        context.bezierCurveTo(750,430, 900,430, 850,310); //bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        context.stroke();
        context.restore();
    
    // Cup 6    
        //Rim of cup 6
        context.save(); 
        context.translate(translateWidth, translateHeight); 
        context.scale(2,0.3); 
        context.beginPath();
        context.arc(462.5, 1030, 11.8, 0, Math.PI*2, false);
        context.stroke(); 
        context.restore();
    
        //Body of cup 6
        context.save();
        context.translate(translateWidth, translateHeight);
        context.beginPath();
        context.moveTo(900, 310);
        context.bezierCurveTo(850,430, 1000,430, 950,310); //bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        context.stroke();
        context.restore();
    }
    
    
    // Surface Line
    function drawSurface() {
        //Drawing the line
        context.save();
        context.translate(translateWidth, translateHeight);
        context.beginPath();
        context.moveTo(-200, 402);
        context.lineTo(1040, 402);
        
        //Blur to give it that surface feel
        context.shadowBlur = 15;
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 7;
        context.shadowColor = "black";
        context.stroke();
        context.restore()
    }
        
    }

    loadCanvas.drawJug = drawJug;
    loadCanvas.drawJugInverted = drawJugInverted;
    loadCanvas.drawCups = drawCups;
    loadCanvas.drawSurface = drawSurface;
}


//Changing Color of the Koolaid in Jar.
let listItems = document.querySelectorAll("ul li");
listItems.forEach(function(item) {
    item.onclick = function(e) {
        if (this.innerText == "Custom"){
            let theInputTag = document.getElementById("favColor");

            //Make custom list item disappear and color picker appear
            theInputTag.style.display = 'block';

            //Pass selected color to the Koolaid Jar
            theInputTag.addEventListener("input", function() {
                let theColorValue = theInputTag.value;
                loadAll(theColorValue)
                }, true);
        }else{
            //Ensure custom list item shows
            document.getElementById("favColor").style.display = 'none';

            //Pass the color to the koolaid jar
            loadAll(this.innerText);
        }

       
    }
  });


//Get position of what I'm clicking on in this case canvas.
function getElementPosition(obj) {
    let curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;  //position from the left i.e where canvas starts
            curtop += obj.offsetTop;    //position from the top i.e where canvas starts
        } while (obj = obj.offsetParent);

        return { x: curleft, y: curtop };
    }
    return undefined;
}

//Get specific position of where I'm clicking
function getEventLocation(element,event){
    // Relies on the getElementPosition function.
    let pos = getElementPosition(element);
    
    return {
    	x: (event.pageX - pos.x), //Gets specific position of x
      	y: (event.pageY - pos.y)  //Gets specific position of y
    };
}

//Add function when the canvas is clicked
canvas.addEventListener("click",function(event){
    // Get the coordinates of the click specific to the Canvas point.
    let eventLocation = getEventLocation(this,event);
    
    // Get the data of the pixel according to the location generate by the getEventLocation function
    let context = this.getContext('2d');
    let pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data; 
    console.log(pixelData);

    // If transparency on the pixel , array = [0,0,0,0]
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0)){
        // Do something if the pixel is transparent
        console.log("Outside Jug body and handle");
    }else{
        console.log("Inside Jug");
        
        loadAllInverted();
        
    }

},false);


