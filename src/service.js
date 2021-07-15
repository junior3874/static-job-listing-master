export default class Service {
  constructor({ apiUrl, elementsForPage }) {
    this.apiUrl = apiUrl;
    this.elementsForPage = elementsForPage;
  }

  async getJobs(page = 1) {
    const jobs = await fetch(this.apiUrl)
      .then((response) => response.json())
      .then((result) => result);

    const paginationJobs = jobs.slice(
      (page - 1) * this.elementsForPage,
      page * this.elementsForPage
    );

    return paginationJobs;
  }
  searchJobs() {}
}
