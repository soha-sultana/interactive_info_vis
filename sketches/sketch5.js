// Example 2
registerSketch('sk5', function (p) {
  // variables for interactivity
  let Occupations = [];
  let jobSummary = null;
  let showSummary = 0;
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

     let jobX = [];
    Occupations = [];

     // Add labels to each section
     p.fill(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(30);
    p.text("High Stress Jobs:\nSales Representative, Sales Associate, Scientist\n(7-10)", cellWidth / 2, gridY + cellHeight / 2);
    p.text("Moderate Stress Jobs:\nDoctor, Software Engineer, Nurse, Lawyer\n(5-7)", cellWidth + cellWidth / 2, gridY + cellHeight / 2);
    p.text("Mild Stress Jobs:\n Manager, Engineer, Teacher, Accountant\n(3-5)", cellWidth + cellWidth / 2, gridY + cellHeight + cellHeight / 2);
    p.text("Low Stress Jobs:\nAccording to this dataset, the lowest stress level was 3.89\n(falling under the mild stress category\n(1-3)", cellWidth / 2, gridY + cellHeight + cellHeight / 2);
    // adding job list for each section
    p.fill(255);
+   p.textAlign(p.CENTER, p.CENTER);

    // function to render the job lists and make them clickable for each section
    function renderJobList(CenterX, topY, titleText, jobs, rankText){
      // adding title for job list
      p.textSize(22);
      p.fill(256);
      p.text(titleText, CenterX. topY + cellHeight * 0.15);
      p.textSize(14);
      p.fill(256, 220);
      p.text(rankText, CenterX, topY + cellHeight * 0.07);

      // listing jobs
      p.textSize(18);
+     p.fill(255);
      const gap = 28;
      const startY = topY + cellHeight * 0.30 - ((jobs.length - 1) * gap) / 2;
      for(let i = 0; i < jobs.length; i++){
        const job = jobs[i].title;
        const summary = jobs[i].summary;
        const y = startY + i * gap;
        p.text(job, CenterX, y);
        // bounding box when clicked
        const w = p.textWidth(job);
        const h = p.textAscent() + p.textDescent();
        const bx = centerX - w / 2;
        const by = y - h / 2;
        Occupations.push({job, summary, bx, by, w, h});
      
        // underline job when mouse hovers
        if(p.mouseX >= bx && p.mouseX <= bx + w && p.mouseY >= by && p.mouseY <= by + h){
          p.push();
          p.stroke(256, 220);
          p.strokeWeight(1.5);
          p.line(bx, y + h / 2 + 6, bx + w, y + h / 2 + 6);
          p.pop();

        }
      }
    }
  };

    // jobs for each section

  // high stress jobs
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



  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
