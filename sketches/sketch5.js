// Example 2
registerSketch('sk5', function (p) {
  // variables for interactivity
  let Occupations = [];
  let jobSummary = null;
 // let showSummary = 0;

  // Moved job data outside of draw function so it's accessible
  const highStressJobs = [
    {title: "Sales Representative", summary: "Sales Representatives have an average stress level of 8.00"},
    {title: "Sales Associate", summary: "Sales Associates have an average stress level of 7.00"},
    {title: "Scientist", summary: "Scientists have an average stress level of 7.00"}
  ];

  const moderateStressJobs = [
    {title: "Doctor", summary: "Doctors have an average stress level of 6.732"},
    {title: "Software Engineer", summary: "Software Engineers have an average stress level of 6.00"},
    {title: "Nurse", summary: "Nurses have an average stress level of 5.548"},
    {title: "Lawyer", summary: "Lawyers have an average stress level of 5.064"}
  ];

  const mildStressJobs = [
    {title: "Manager", summary: "Managers have an average stress level of 5.00"},
    {title: "Engineer", summary: "Engineers have an average stress level of 3.889"},
    {title: "Teacher", summary: "Teachers have an average stress level of 4.525"},
    {title: "Accountant", summary: "Accountants have an average stress level of 4.595"}
  ];
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(250);
    const headerHeight = Math.min(100, p.height * 0.1);
    
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

    // let jobX = [];
    Occupations = [];

    // function to render the job lists and make them clickable for each section
    function renderJobList(centerX, topY, titleText, jobs, rankText) {
      p.textAlign(p.CENTER, p.CENTER);
      
      // Title
      p.textSize(22);
      p.fill(255);
      p.text(titleText, centerX, topY + cellHeight * 0.15);
      
      // Rank
      p.textSize(14);
      p.fill(255, 220);
      p.text(rankText, centerX, topY + cellHeight * 0.07);

      // Jobs
      p.textSize(18);
      p.fill(255);
      const gap = 28;
      const startY = topY + cellHeight * 0.30;
      
      for(let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        const y = startY + i * gap;
        p.text(job.title, centerX, y);
        
        // Calculating clickable area
        const w = p.textWidth(job.title);
        const h = p.textAscent() + p.textDescent();
        const x = centerX - w/2;
        const by = y - h/2;
        
        // Store job data for click
        Occupations.push({
          title: job.title,
          summary: job.summary,
          x: x,
          y: by,
          w: w,
          h: h
        });

        // Hover effect
        if(p.mouseX >= x && p.mouseX <= x + w && 
           p.mouseY >= by && p.mouseY <= by + h) {
          p.stroke(255, 220);
          p.strokeWeight(1.5);
          p.line(x, y + h/2 + 2, x + w, y + h/2 + 2);
          p.noStroke();
        }
      }
    }

    // rendering the job lists 
  renderJobList(cellWidth / 2, gridY, "High Stress Jobs", highStressJobs, "(7-10)");
  renderJobList(cellWidth + cellWidth / 2, gridY, "Moderate Stress Jobs", moderateStressJobs, "(5-7)");
  renderJobList(cellWidth + cellWidth / 2, gridY + cellHeight, "Mild Stress Jobs", mildStressJobs, "(3-5)");
  renderJobList(cellWidth/2, gridY + cellHeight, "Low Stress Jobs", "This dataset did not have jobs for this category", "Rank: 1-3");


    // if a job is selected, draw a summary box
    if(jobSummary) {
      const boxW = Math.min(760, p.width - 60);
      const boxH = Math.min(160, p.height * 0.22);
      const boxX = p.width/2 - boxW/2;
      const boxY = p.height - boxH - 24;
      
      p.fill(30, 30, 40, 230);
      p.noStroke();
      p.rect(boxX, boxY, boxW, boxH, 10);
      
      p.fill(255);
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(16);
      p.text(jobSummary.title + " — " + jobSummary.summary, 
        boxX + 16, boxY + 12, boxW - 32, boxH - 24);
    }
  };


    // when mouse is clicked
    p.mousePressed = function() {
    for(let job of Occupations) {
      if(p.mouseX >= job.x && p.mouseX <= job.x + job.w && 
         p.mouseY >= job.y && p.mouseY <= job.y + job.h) {
        if(jobSummary && jobSummary.title === job.title) {
          jobSummary = null;
        } else {
          jobSummary = job;
        }
        break;
      }
    }
  };


  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
