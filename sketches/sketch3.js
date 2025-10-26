// ...existing code...
// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
   p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES);
  };

  p.draw = function () {
    p.background(240);
   // p.clock();
  }
     // Add title at the top
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(40);
    p.fill(30);
    p.text('Midterm Exam Prep', p.width/2, 30);
    
    // Add summary text on the left
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(16);
    p.fill(60);
    const summaryText = 'Welcome to your midterm exam prep clock\nthat helps you know how to break up\nyour time to study!';
    p.text(summaryText, 30, p.height/2 - 50);

  // replaced clock() to add labeled sections and highlight them by hour
  p.clock = function () {
    let h = p.hour();
    let m = p.minute();
    let s = p.second();

    // Center + sizing
    p.push();
    p.translate(p.width / 2, p.height / 2);
    const R = p.min(p.width, p.height) * 0.45;   // outer radius

    // Define events at cardinal times (hours in 24h)
      const events = [
      { start: 12, end: 15, label: 'Midterm Exam',    angle: -90, color: [74,144,226] }, // 12:00–14:59 (12–3)
      { start: 15, end: 18, label: 'Review Syllabus',  angle:   0, color: [47,128,237] }, // 15:00–17:59 (3–6)
      { start: 18, end: 21, label: 'Office Hours',     angle:  90, color: [30,98,192]  }, // 18:00–20:59 (6–9)
      { start: 21, end: 24, label: 'Group Study',      angle: 180, color: [15,74,153]  }  // 21:00–23:59 (9–12)
    ];

    // Base big circle (light blue)
    p.noStroke();
    p.fill(70, 200, 200);
    p.circle(0, 0, R * 2);

    // If any event matches current hour, draw its sector as a distinct shade of blue
    // We'll draw quarter arcs for the four cardinal sections.
    p.push();
    p.angleMode(p.DEGREES);
    // quarter size = 90 degrees; start angles adjusted so -90 is top
    for (let i = 0; i < events.length; i++) {
      const ev = events[i];
      const startA = ev.angle - 50
      const endA = ev.angle + 45;
      // active when current hour equals event.hour
      if (h === ev.hour) {
        p.fill(...ev.color);
        p.arc(0, 0, R * 2 + 2, R * 2 + 2, startA, endA, p.PIE);
      }
    }
    p.pop();

    // Inner white circle and hub
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

    // Draw event labels at their cardinal positions.
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    // choose label fill depending on whether its section is active
    events.forEach(ev => {
      const ang = ev.angle;
      const baseLx = p.cos(ang) * (R * 0.62);
      const lx = baseLx + (ev.offsetX || 0);
      const ly = p.sin(ang) * (R * 0.62);
      const isActive = (h === ev.hour);
      if (isActive) {
        // use contrasting white text when highlighted
        p.fill(256, 0,0);
        p.textSize(18);
        p.text(ev.label, lx, ly);
      } else {
        p.fill(20);
        p.textSize(18);
        p.text(ev.label, lx, ly);
      }
    });

    // Angles (0° at 12 o'clock)
    const aS = p.map(s, 0, 60, 0, 360) - 90;
    const aM = p.map(m, 0, 60, 0, 360) - 90;
    const aH = p.map(h % 12 + m / 60, 0, 12, 0, 360) - 90;

    // Helper to draw a hand with halo so it contrasts on both colors
    p.hand = function (angleDeg, len, thick) {
      p.push();
      p.rotate(angleDeg);
      // black halo
      p.stroke(0);
      p.strokeWeight(thick + 4);
      p.line(0, 0, len, 0);
      // white center
      p.stroke(255);
      p.strokeWeight(thick);
      p.line(0, 0, len, 0);
      p.pop();
    }

    // Hands: hour, minute, second
    p.hand(aH, R * 0.55, 8);
    p.hand(aM, R * 0.75, 6);
    // second hand (thinner, extends farther)
    p.push();
    p.rotate(aS);
    p.stroke(0);
    p.strokeWeight(4);
    p.line(0, 0, R * 0.9, 0);  // black halo
    p.stroke(255);
    p.strokeWeight(2);
    p.line(0, 0, R * 0.9, 0);  // white center
    p.pop();

    // center cap on top
    p.noStroke();
    p.fill(0);
    p.circle(0, 0, R * 0.08);

    p.pop(); // restore translation
  }
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
