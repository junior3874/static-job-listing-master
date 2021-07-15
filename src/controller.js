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

  _setupViewEvents() {
    this.view.getJobs(this.getJobs());
    this.view.addEventFromBtnReadMore(this.getJobs());
  }

  getJobs() {
    return async (page) => {
      const jobs = await this.service.getJobs(page);

      return jobs;
    };
  }
}
