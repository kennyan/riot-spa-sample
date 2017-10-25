<auth>
  <div id="login" class="modal show" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="text-center">Riot SPA Sample</h1>
          <p class="al-c"><img src="dist/images/common/img-lock.png" width="36" height="46" /></p>
        </div>
        <div class="modal-body">
          <h3 class="text-center">{ translate('password_require_label')}</h3>
          <p class="text-center password-hint">hint pa****rd</p>
          <div class="form clearfix center-block" >
            <div id="login-error-message" ref="errormessage"></div>
            <div class="form-group">
              <input ref="password" type="password" class="form-control input-lg" placeholder="{ translate('password_placeholder') }">
            </div>
            <div class="form-group col-md-6 col-md-offset-3">
              <button type="button" class="btn btn-primary btn-lg btn-block" onclick={ login }>{ translate('login_btn_label') }</i1-8n></button>
            </div>
          </div>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
  <script>

    this.translate = str =>  i18n.localise(str)

    this.login = (e) =>
      riot.control.trigger(riot.EVT.authLogin,this.refs.password.value)

    self = this
    riot.control.on(riot.EVT.loginError, res => {
      self.refs.errormessage.innerHTML =
        i18n.localise("password_invalid")
    })
  </script>
</auth>
