export default function jobComponent(jobs) {
  const jobsIn = jobs.map((job) => {
    const jobTecnologys = [...job.languages, ...job.tools, job.role].map(
      (tecnology) => `<span class="tecnology">
     
    ${tecnology}
   </span> `
    );

    return `<div id="${job.id}"class="component-job ${
      job.new && job.featured ? "active" : ""
    }" >
    <div class="job-props">
      <section class="company-image">
        <img src="./${job.logo}">
      </section>
      
      <div class="job-details">
        <div class="company-props">
          <p class="company-name">
            ${job.company}
          </p>
        
          ${
            job.new
              ? `<span id="new">
          new!
        </span>`
              : ""
          }

        ${
          job.featured
            ? `<span id="featured">
        featured
      </span>`
            : ""
        }
          
          

          
        </div>
        <div class="job-name-area">
          <p id="job-name">${job.position}</p>
        </div>
        <div class="job-especifications">
          <p id="date-post">
            ${job.postedAt}
          </p>
          <p id="job-type">
            ${job.contract}
          </p>
          <p id="job-location">
            USA only
          </p>
        </div>
      </div>

    </div>
    <div class="job-tecnologys">
    ${jobTecnologys.join("")}
        
    </div>
</div>`;
  });

  return jobsIn.join("");
}
