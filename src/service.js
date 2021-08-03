export default class Service {
  constructor({ apiUrl, elementsForPage }) {
    this.apiUrl = apiUrl;
    this.elementsForPage = elementsForPage;
  }

  async getJobs(page = 1) {
    const jobs = await fetch(this.apiUrl)
      .then((response) => response.json())
      .then((result) => result);

    const tratedJobs = this.tratedJobs(jobs);

    const paginationJobs = tratedJobs.slice(
      (page - 1) * this.elementsForPage,
      page * this.elementsForPage
    );

    return paginationJobs;
  }
  tratedJobs(jobs) {
    const url = new URL(location);

    const params = new URLSearchParams(url.search);
    const [queryParams] = params.getAll("tecnologys");
    const tratedQueryParams = queryParams?.split("&");

    if (tratedQueryParams) {
      const tratedJobs = jobs.reduce((acumulator, job) => {
        const { languages, role, tools } = job;

        const tratedTecnologys = new Array(...languages, role, ...tools);

        const verifyParameters = tratedQueryParams.every((tecnologys) =>
          tratedTecnologys.includes(tecnologys)
        );

        if (verifyParameters) {
          acumulator.push(job);

          return acumulator;
        } else {
          return acumulator;
        }
      }, []);
      return tratedJobs;
    }

    return jobs;
  }
}
