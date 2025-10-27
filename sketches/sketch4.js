// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    // clockFont = p.loadFont("digital-7.ttf");
  };

  p.draw = function () {
    // background
    p.background(10);

    // draw informational rectangles
    const margin = 40;
    const boxAlpha = 200;
    const boxRadius = 12;

    function drawInfoBox(x, y, w, h, txt) {
      p.push();
      p.noStroke();
      p.fill(30, 40, 70, boxAlpha);
      p.rect(x, y, w, h, boxRadius);
      p.fill(230, 230, 250); // lavender-ish text
      p.textAlign(p.LEFT, p.CENTER);
      p.textSize(Math.max(12, Math.min(20, w / 25)));
      p.text(txt, x + 65,y + 50); // get this in the center with word wrap
      p.pop();
    }

    // top-right box
    drawInfoBox(p.width - 360, margin, 320, 90, "Make sure to get a good night's rest");

    // bottom-left box
    drawInfoBox(margin, p.height - 140, 360, 90, "Review materials in the morning");

    // bottom-right box
    drawInfoBox(p.width - 420, p.height - 140, 380, 90, "Make sure to take breaks");

    // crescent moon inside a rectangle (top-left) with text "Night mode is on"
    const mx = 40, my = 40, mw = 260, mh = 120;
    p.push();
    // moon card
    p.noStroke();
    p.fill(25, 30, 50);
    p.rect(mx, my, mw, mh, 14);

    // crescent moon (two overlapping ellipses)
    const moonCX = mx + 60, moonCY = my + mh / 2;
    p.fill(250, 245, 200); // pale moon
    p.ellipse(moonCX, moonCY, 72, 72);
    p.fill(25, 30, 50); // cutout to form crescent, same as card bg
    p.ellipse(moonCX + 18, moonCY - 6, 58, 58);

    // moon glow (subtle)
    p.fill(250, 245, 200, 30);
    p.ellipse(moonCX - 6, moonCY + 6, 110, 110);

    // night mode text inside card
    p.fill(230, 230, 250); // lavender text
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(15);
    p.text("Night mode is on", mx + 120, my + mh / 2);
    p.pop();

    // draw the clock on top (center)
    p.clock();
  }

  p.clock = function () {
    let hr = p.hour();
    let mn = p.minute();
    let sc = p.second();

    p.fill(200, 200, 250);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(50);
    p.text("Night Study", p.width / 2, 90);

    p.fill(200, 200, 250); // lavender for clock text
    // p.textFont(clockFont);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(p.width / 10);
    let noon = hr >= 12 ? " PM" : " AM";
    let displayHr = hr % 12;
    if (displayHr === 0) displayHr = 12;
    let mnStr = mn < 10 ? "0" + mn : "" + mn;
    let scStr = sc < 10 ? "0" + sc : "" + sc;
    p.text(displayHr + ":" + mnStr + ":" + scStr + noon, p.width / 2, p.height / 2);
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});

