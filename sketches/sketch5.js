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

    // top-right square (moderate stress)
    p.fill(160,35,35);
    p.rect(cellWidth, gridY, cellWidth, cellHeight);

    // bottom right-square (mild stress)
    p.fill(205, 75, 75);
    p.rect(cellWidth, gridY + cellHeight, cellWidth, cellHeight);

      // bottom-left square (low stress)
    p.fill(240, 150, 150);
    p.rect(0, gridY + cellHeight, cellWidth, cellHeight);

  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
