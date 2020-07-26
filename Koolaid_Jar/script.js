let canvas, context;

canvas = document.getElementById('canvas');

if (canvas && canvas.getContext) {
    context = canvas.getContext('2d');

let gradient = context.createLinearGradient(0,50,0,350);
gradient.addColorStop(0, 'Transparent');
gradient.addColorStop(0.5, 'Transparent');
gradient.addColorStop(0.7, 'Transparent');
gradient.addColorStop(1,'MediumPurple');

//Jug Code
    // Draws the top of the jug.
    let translateWidth = canvas.width/6;
    let translateHeight = canvas.height/6;
    let canvasX = 0;
    let canvasY = 0;
    let radius = 40;

    context.save(); // Saves current canvas state
    context.translate(translateWidth, translateHeight); //This ses where the oval should show on the page
    context.scale(2,0.3); //Sets the shape  by adjusting the x and y axis
    context.beginPath();
    context.arc(canvasX, canvasY, radius, 0, Math.PI*2, false); //arc(x, y, radius, startAngle, endAngle, anticlockwise)
    
    context.fillStyle = 'transparent';
    context.fill();
    
    context.restore();// Restores saved canvas state

    context.lineWidth = 4; // Oval border width
    context.strokeStyle = 'grey'; // Oval border colors
    context.stroke();

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

    // Color;
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

// Cups
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
    context.fillStyle = '#cccccc';
    context.fill();
    context.stroke();
    context.restore();

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