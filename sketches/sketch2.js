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
    p.fill(256,240, 190);
    p.rect(0, sectionHeight, p.width, sectionHeight);


    };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});

    

