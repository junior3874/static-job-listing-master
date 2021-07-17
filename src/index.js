import Service from "./service.js";
import View from "./view.js";
import Controller from "./controller.js";

const service = new Service({ apiUrl: "./data.json", elementsForPage: 5 });
const dependencies = {
  view: View,
  service,
};

(async () => await Controller.init(dependencies))();
