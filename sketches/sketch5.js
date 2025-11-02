// Example 2
registerSketch('sk5', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(250);
    
    // Added title 
    p.noStroke();
    p.fill(20);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(50);
    p.text("Are you working your job or is your job working you?", 12, 10);

    // Small summary under title 
    p.textSize(20);
    p.fill(50);
    p.text("Look at the self-reported stress levels among different occupations.", 12, 80);

    // split canvas into 4 sections 
    const gridY = headerHeight + 20;
    const gridHeight = p.height - gridY - 20;
    const cellWidth = p.width / 2;
    const cellHeight = gridHeight / 2;

     // top left-square 
    p.fill(120, 10, 10);
    p.rect(0, gridY, cellWidth, cellHeight);

  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
