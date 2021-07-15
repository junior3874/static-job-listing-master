import jobComponent from "./components/jobComponent.js";

const main = document.querySelector("main");
const btnReadMore = document.getElementById("read-more");
export default class View {
  static page = 1;
  static async getJobs(command) {
    const jobs = await command();

    const jobsTemplate = jobComponent(jobs);

    return View._insertJobsInMain(jobsTemplate);
  }

  static _insertJobsInMain(jobs) {
    main.innerHTML = jobs;
  }

  static _insertMoreJobsInMain(jobs) {
    main.innerHTML += jobs;
  }

  static addEventFromBtnReadMore(command) {
    btnReadMore.addEventListener("click", () =>
      View._eventFromBtnReadMore(command)
    );
  }

  static async _eventFromBtnReadMore(command) {
    this.page += 1;

    const moreJobs = await command(this.page);
    const jobsTemplate = jobComponent(moreJobs);
    View._insertMoreJobsInMain(jobsTemplate);
  }
}
