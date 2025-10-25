// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let sectionHeight;
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    sectionHeight = p.height / 3;
  };
  p.draw = function () {
    p.background(220);

    // background color for first section
    p.noStroke();
    p.fill(256,200,190);
    p.rect(0, 0, p.width, sectionHeight);

    // background color for second section
    p.noStroke();
    p.fill(256,220, 190);
    p.rect(0, sectionHeight, p.width, sectionHeight);

    // adding the section dividers (into 3 parts)
    p.stroke(180);
    p.strokeWeight(1);
    p.line(0, sectionHeight, p.width, sectionHeight);
    p.line(0, sectionHeight * 2, p.width, sectionHeight * 2);

    // First Section
    p.noStroke();
    p.fill(60);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(80);
    p.text('Class 1: History',50,50);

    p.textSize(50);
    const currentDate = new Date();
    p.text(currentDate.toDateString(),50,150)

    p.text('Assignment 2', 50,210);

    // Second Section
    // initialize time variables
    const now = new Date();
    const start = now.toLocaleTimeString();
    const endDate = new Date(now.getTime() + 60 * 60 * 1000); 
    const endTime = endDate.toLocaleTimeString();

    const midTop = sectionHeight;
    const midCenterY = midTop + sectionHeight / 2;

     // Left side (Start Time)
     p.noStroke();
    p.fill(30);
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(28);
    p.text('Current Time:'+ start, 50, midCenterY - 6);
    p.textAlign(p.LEFT, p.TOP);

     // Right side (End time)
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('End Time:'+ endTime, p.width - 50, midCenterY - 6);

    // adding circle in the center (to act as a button)
    p.stroke(40);
    p.fill(220, 120, 180)
    p.ellipse(p.width / 2, midCenterY, 100, 100);
  


    };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});

    

