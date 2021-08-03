import jobComponent from "./components/jobComponent.js";
import tecnologyComponent from "./components/tecnologyComponent.js";

const body = document.querySelector("body");
const main = document.querySelector("main");
const btnReadMore = document.getElementById("read-more");
const filters = document.getElementById("filters");
const filterArea = document.querySelector(".filterArea");

export default class View {
  static page = 1;

  static verifyUserAlreadyLogged(command) {
    if (!window.localStorage.getItem("logged")) {
      View._callingEventFromFirstLogin(command);
      return false;
    }
    filters.innerHTML = "";
    return true;
  }

  static _callingEventFromFirstLogin(command) {
    body.classList.toggle("firstVisit");

    const getFirstTecnologySpan = View._getElementByClass(".tecnology")[0];
    getFirstTecnologySpan.innerHTML += `<p id="firt-visit-help">Para filtrar um job por tecnológia, clique no ponto em destaque!</p>`;
    getFirstTecnologySpan.classList.toggle("firstVisit");
    getFirstTecnologySpan.addEventListener("click", (e) => {
      View._addFilter(e);
      const getChialdElement = View._getElementById("firt-visit-help");
      getFirstTecnologySpan.removeChild(getChialdElement);
      body.classList.toggle("firstVisit");
      window.localStorage.setItem("logged", true);
      setTimeout(() => {
        return command();
      }, 1000);
    });
  }

  static setCommand(command) {
    this.command = command;
    return this;
  }
  static async setJobs() {
    this.page = 1;
    const jobs = await this.command();

    const jobsTemplate = jobComponent(jobs);

    View._insertJobsInMain(jobsTemplate);

    View.addEventFromTecnologys();
  }

  static _insertJobsInMain(jobs) {
    main.innerHTML = jobs;
  }

  static _insertMoreJobsInMain(jobs) {
    main.innerHTML += jobs;
  }

  static addEventFromBtnReadMore() {
    btnReadMore.addEventListener("click", () => View._eventFromBtnReadMore());
  }

  static async _eventFromBtnReadMore() {
    this.page += 1;

    const moreJobs = await this.command(this.page);
    const jobsTemplate = jobComponent(moreJobs);
    View._insertMoreJobsInMain(jobsTemplate);
    View.addEventFromTecnologys();
  }

  static _getElementByClass(className) {
    const element = document.querySelectorAll(className);
    return element;
  }

  static _getElementById(id) {
    const element = document.getElementById(id);
    return element;
  }

  static _addFilter(e) {
    const tecnologyName = e.currentTarget.firstChild.textContent;

    const element = View._getElementById(tecnologyName);

    if (element) throw new Error("element has exist");
    View._addTecnologyFromParameter(tecnologyName);
    View._addTecnologyFromFilterTable(tecnologyName);
  }
  static _addTecnologyFromFilterTable(tecnologyName) {
    const tecnologyTemplate = tecnologyComponent(tecnologyName);
    if (filters.lastElementChild === null) filterArea.classList.add("active");

    filters.innerHTML += tecnologyTemplate;

    // View.addEventFromBtnFilter(tecnologyName);
  }

  static _addTecnologyFromParameter(tecnologyName) {
    const url = new URL(location);

    const params = new URLSearchParams(url.search);
    console.log(tecnologyName.replace(/\s/g, ""));
    params.has("tecnologys")
      ? params.set(
          "tecnologys",
          `${params.getAll("tecnologys")}&${tecnologyName.replace(/\s/g, "")}`
        )
      : params.set("tecnologys", tecnologyName.replace(/\s/g, ""));

    window.history.replaceState({}, ",", `${location.pathname}?${params}`);
  }

  static setParametersUrlInFilterTable() {
    const url = new URL(location);

    const params = new URLSearchParams(url.search);

    const [parameters] = params.getAll("tecnologys");
    const newParameters = parameters?.split("&");

    newParameters?.map((tecnologyName) => {
      View._addTecnologyFromFilterTable(tecnologyName);
    });
  }
  static _proxyRemoveAndAddFilter(addOrRemove, e) {
    addOrRemove
      ? (async () => {
          try {
            View._addFilter(e);
            View.setJobs();
          } catch (err) {
            return;
          }
        })()
      : (async () => {
          View._removeFilter(e);
          View.setJobs();
        })();
  }

  static addEventFromFilterArea() {
    filterArea.addEventListener("click", (e) => {
      const element = e.target;
      if (element.className == "clear-filter") {
        View._proxyRemoveAndAddFilter(false, e);
      } else {
        return;
      }
    });
  }

  static addEventFromTecnologys() {
    const elements = View._getElementByClass(".tecnology");

    elements.forEach((element) => {
      element.addEventListener("click", (e) =>
        View._proxyRemoveAndAddFilter(true, e)
      );
    });
  }

  static _removeFilter(e) {
    const url = new URL(location);

    const params = new URLSearchParams(url.search);
    if (params.has("tecnologys")) {
      const tecnologys = params
        .getAll("tecnologys")[0]
        .split("&")
        .filter(
          (element) => e.target.parentElement.id.replace(/\s/g, "") != element
        );

      params.set("tecnologys", tecnologys.join("&"));
      window.history.replaceState({}, ",", `${location.pathname}?${params}`);

      filters.removeChild(e.target.parentElement);

      if (filters.lastElementChild === null) {
        params.delete("tecnologys");
        window.history.replaceState({}, ",", `${location.pathname}?${params}`);
        filterArea.classList.remove("active");
      }
    }
  }
}
