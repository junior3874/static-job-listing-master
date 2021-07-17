export default class Controller {
  constructor({ service, view }) {
    this.service = service;
    this.view = view;
  }

  static async init(deps) {
    return new Controller(deps)._initialize();
  }

  async _initialize() {
    this._setupViewEvents();
  }

  async _setupViewEvents() {
    await this.view.setCommand(this.getJobs());
    await this.view.setJobs(this.getJobs());

    this.view.addEventFromBtnReadMore();
    this.view.setParametersUrlInFilterTable();
    this.view.addEventFromFilterArea();
  }

  getJobs() {
    return async (page) => {
      const jobs = await this.service.getJobs(page);

      return jobs;
    };
  }
}
