import './css/index.css';

import './event-helper';
import './stores/itemstore';
import './stores/authstore';

// Load the stores
import Router from "./router";

class App {
  constructor(element) {

    // Load the router
    this.router = new Router(element);
  }
}

window.App = App;
