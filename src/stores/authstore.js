class AuthStore{

  constructor(){
    riot.observable(this);
    this.authLogin()
    this.authLogout()
    this.isAuth()
  }

  // login
  authLogin () {
    this.on(riot.EVT.authLogin, (password) => {
      var self = this
      this._loginCheckHandle(password, (err, success) => {
        if (err) return self.trigger(riot.EVT.loginError)
        Cookies.set("password",password)
        self.trigger(riot.EVT.authLoginSuccess)
      })
    })
  }

  // logout
  authLogout () {
    this.on(riot.EVT.authLogout, () => {
      Cookies.remove("password")
      this.trigger(riot.EVT.authLoginError)
    })
  }

  // authCheck
  isAuth () {
    this.on(riot.EVT.isAuth, () => {
      var self = this
      this._loginCheckHandle(Cookies.get('password'), (err,success) =>{
        if(err) return self.trigger(riot.EVT.authLoginError)
        self.trigger(riot.EVT.authLoginSuccess)
      })
    })
  }

  // loginCheckHandle
  _loginCheckHandle (password, cb) {
    request
      // you can change post method if you need auth check in serverside
      .get('/dist/json/info.json')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (res.body.password === password) return cb(null,true)
        cb(true)
    })
  }
}

// add store to riot control
let authStore = new AuthStore()
riot.control.addStore(authStore)

export default authStore;
