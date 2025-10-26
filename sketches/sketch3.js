// ...existing code...
// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES);
  };

  p.draw = function () {
    p.background(230, 230, 250);
    
      p.textAlign(p.LEFT, p.TOP);
    p.textSize(50);
    p.fill(0);
    p.text('Exam Prep Tracker', 60, 30);

    // Summary text (left)
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(20);
    p.fill(0);
    const summaryText = 'Welcome to your midterm exam prep\n clock that helps you know how to\n break up your time to study!\nThe highlighted time indicates what\nactivity you should be focusing on.';
    p.text(summaryText, 60, 250);

    // Draw the clock
    p.clock();
  };

  // replaced clock() to add labeled sections and highlight them by hour-range
  p.clock = function () {
    const h = p.hour();
    const m = p.minute();
    const s = p.second();

    // Center + sizing
    p.push();
    p.translate(p.width / 2, p.height / 2);
    const R = p.min(p.width, p.height) * 0.45; // outer radius

    // Define quarter ranges (start inclusive, end exclusive), label angle and color
    const events = [
      { start: 12, end: 15, label: 'Midterm Exam',   angle: -90, color: [74, 144, 226] }, // 12–3
      { start: 15, end: 18, label: 'Review Syllabus',angle:   0, color: [47, 128, 237], offsetX: 18 }, // 3–6
      { start: 18, end: 21, label: 'Office Hours',   angle:  90, color: [30, 98, 192] }, // 6–9
      { start: 21, end: 24, label: 'Group Study',    angle: 180, color: [15, 74, 153] }  // 9–12
    ];

    // Base big circle
    p.noStroke();
    p.fill(200, 230, 255);
    p.circle(0, 0, R * 2);

    // Draw quarter sectors and highlight the one whose range includes current hour
    p.push();
    p.angleMode(p.DEGREES);
    for (let i = 0; i < events.length; i++) {
      const ev = events[i];
      const startA = ev.angle - 45;
      const endA = ev.angle + 45;

      // handle wrap-around (if end < start)
      const inRange = (ev.start < ev.end) ? (h >= ev.start && h < ev.end) : (h >= ev.start || h < ev.end);

      if (inRange) {
        p.noStroke();
        p.fill(...ev.color);
        // draw slightly larger arc so it overlays the base clearly
        p.arc(0, 0, R * 2 + 6, R * 2 + 6, startA, endA, p.PIE);
      } else {
        // optional subtle darker wedge for non-active quarters (keeps contrast)
        p.noStroke();
        p.fill(220, 240, 255, 180);
        p.arc(0, 0, R * 2 + 2, R * 2 + 2, startA, endA, p.PIE);
      }
    }
    p.pop();

    // Inner white circle and hub
    p.noStroke();
    p.fill(255);
    p.circle(0, 0, R * 1.5);
    p.fill(0);
    p.circle(0, 0, R * 0.14);

    // Tick marks (hours)
    p.stroke(255);
    p.strokeWeight(2);
    for (let i = 0; i < 12; i++) {
      const a = i * 30 - 90;
      const x1 = p.cos(a) * (R * 0.88);
      const y1 = p.sin(a) * (R * 0.88);
      const x2 = p.cos(a) * (R * 0.97);
      const y2 = p.sin(a) * (R * 0.97);
      p.line(x1, y1, x2, y2);
    }

    // Draw event labels at their cardinal positions; active range -> black text
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(18);
    events.forEach(ev => {
      const ang = ev.angle;
      const baseLx = p.cos(ang) * (R * 0.62);
      const lx = baseLx + (ev.offsetX || 0);
      const ly = p.sin(ang) * (R * 0.62);

      const inRange = (ev.start < ev.end) ? (h >= ev.start && h < ev.end) : (h >= ev.start || h < ev.end);

      if (inRange) {
        p.fill(0); // black when active
      } else {
        p.fill(20); // dark gray otherwise
      }
      p.text(ev.label, lx, ly);
    });

    // Hands
    const aS = p.map(s, 0, 60, 0, 360) - 90;
    const aM = p.map(m, 0, 60, 0, 360) - 90;
    const aH = p.map((h % 12) + m / 60, 0, 12, 0, 360) - 90;

    p.hand = function (angleDeg, len, thick) {
      p.push();
      p.rotate(angleDeg);
      p.stroke(0);
      p.strokeWeight(thick + 4);
      p.line(0, 0, len, 0);
      p.stroke(255);
      p.strokeWeight(thick);
      p.line(0, 0, len, 0);
      p.pop();
    };

    p.hand(aH, R * 0.55, 8);
    p.hand(aM, R * 0.75, 6);

    p.push();
    p.rotate(aS);
    p.stroke(0);
    p.strokeWeight(4);
    p.line(0, 0, R * 0.9, 0);
    p.stroke(255);
    p.strokeWeight(2);
    p.line(0, 0, R * 0.9, 0);
    p.pop();

    // center cap
    p.noStroke();
    p.fill(0);
    p.circle(0, 0, R * 0.08);

    p.pop(); // restore
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
