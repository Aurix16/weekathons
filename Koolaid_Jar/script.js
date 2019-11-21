let canvas, context;

canvas = document.getElementById('canvas');

if (canvas && canvas.getContext) {
    context = canvas.getContext('2d');

    // Draws the top of the jug.
    let canvasX = 0;
    let canvasY = 0;
    let radius = 40;

    context.save(); // Saves current canvas state
    context.translate(canvas.width/6, canvas.height/6); //This ses where the oval should show on the page
    context.scale(2,0.3); //Sets the shape  by adjusting the x and y axis
    context.beginPath();
    context.arc(canvasX, canvasY, radius, 0, Math.PI*2, false);
    context.restore();// Restores saved canvas state
    // context.fillStyle = '#cccccc'; //Color of oval
    // context.fill();
    context.lineWidth = 2; // Oval border width
    context.strokeStyle = 'grey'; // Oval border colors
    context.stroke();

    //Using a Beizer Curve for the Body of the Jug (First Curve)
    context.save();
    context.translate(canvas.width/6, canvas.height/6);
    context.beginPath();
    context.moveTo(-80, 0);
    context.bezierCurveTo(-40,40,-20,50,-60,150);
    context.stroke();
    context.restore();

    //Using a Quadratic Curve for the Body of the Jug (Second Curve)
    context.save();
    context.translate(canvas.width/6, canvas.height/6);
    context.beginPath();
    context.moveTo(-60, 150);
    context.quadraticCurveTo(-135,400,0,400); //
    context.stroke();
    context.restore();

    //Using a Beizer Curve for the Body of the Jug (Third Curve)
    context.save();
    context.translate(canvas.width/6, canvas.height/6);
    context.beginPath();
    context.moveTo(0, 400);
    context.bezierCurveTo(320,420,-20,100,80,0);
    context.stroke();
    context.restore();

    //Using a Quadratic Curve for the Handle of the Jug (Second Curve)
    context.save();
    context.translate(canvas.width/6, canvas.height/6);
    context.beginPath();
    context.moveTo(60, 50);
    context.bezierCurveTo(250,50,70,210,130,250);
    context.lineWidth = 2;
    context.strokeStyle = 'grey';
    context.stroke();
    context.restore();

    // context.beginPath();
    // context.moveTo(75,50);
    // context.lineTo(75,100);
    // context.lineTo(25,100);
    // context.fill();
}