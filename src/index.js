import Service from "./service.js";
import View from "./view.js";
import Controller from "./controller.js";

const apiUrl = "./data.json";

const service = new Service({ apiUrl, elementsForPage: 5 });
const dependencies = {
  view: View,
  service,
};

(async () => await Controller.init(dependencies))();
