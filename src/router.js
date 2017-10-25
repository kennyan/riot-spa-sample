// base html tag
import './pages/base.tag'
// some page mount as required on base tag
import './pages/auth.tag'
import './pages/home.tag'
import translate from './utils/translate'

class Router{

  constructor(body){

    this.body = body;
    this.page = null;

    self = this

    translate.init(() => {
      self.routes()

      //route.base('#!')
      route.base('/')
      route.start()
      route.exec()
    })
  }

  // Routing logic
  routes() {
    route("@", (directory, key) => {
      require(["./pages/base.tag"], () => {
        riot.control.trigger(riot.EVT.isAuth)
        riot.control.on(riot.EVT.authLoginSuccess, () => {
          this.mount("home");
        })
        riot.control.on(riot.EVT.authLoginError, () => {
          this.mount("auth");
        })
      });
    });
  }
  // page mount
  mount(page, params = {}) {


    this.body.dataset.lang = i18n.getLanguage()

    $(this.body).attr("data-lang",i18n.getLanguage())

    // Unmount the active page, if mounted
    if (this.page) this.page[0].unmount();

    this.body.appendChild(document.createElement(page));

    // Mount the new tag
    this.page = riot.mount(page, params);
  }

}

export default Router;
