import jobComponent from "./components/jobComponent.js";
import tecnologyComponent from "./components/tecnologyComponent.js";

const main = document.querySelector("main");
const btnReadMore = document.getElementById("read-more");
const filters = document.getElementById("filters");
const filterArea = document.querySelector(".filterArea");

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

  static _getElementByClass(className) {
    const element = document.querySelectorAll(className);
    return element;
  }

  static _getElementById(id) {
    const element = document.getElementById(id);
    return element;
  }

  static addEventFromTecnologys() {
    const elements = View._getElementByClass(".tecnology");

    elements.forEach((element) =>
      element.addEventListener("click", (e) => View._eventFromBtnTecnologys(e))
    );
  }
  static _eventFromBtnTecnologys(e) {
    const tecnologyName = e.currentTarget.textContent;

    const element = View._getElementById(tecnologyName);

    if (element) return;
    View._addTecnologyFromParameter(tecnologyName);
    View._addTecnologyFromFilterTable(tecnologyName);
  }
  static _addTecnologyFromFilterTable(tecnologyName) {
    const tecnologyTemplate = tecnologyComponent(tecnologyName);
    if (filters.lastElementChild === null)
      filterArea.classList.toggle("active");

    filters.innerHTML += tecnologyTemplate;
  }

  static _addTecnologyFromParameter(tecnologyName) {
    const url = new URL(location);

    const params = new URLSearchParams(url.search);
    console.log(params.toString());
    params.has("tecnologys")
      ? params.set(
          "tecnologys",
          `${params.getAll("tecnologys")},${tecnologyName}`
        )
      : params.set("tecnologys", `${tecnologyName}`);

    window.history.replaceState({}, "", `${location.pathname}?${params}`);
  }

  static removeParemeters() {}
  static _verifyParameters() {}
}
