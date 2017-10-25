<header>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div>
        <div class="navbar-brand">Riot SPA Sample</div>
        <div class="logout-area">
          <button class="logout" onclick="{ logout }">logout</button>
        </div>
      </div>
    </div>
  </nav>
  <script>
    this.logout = (e)  => riot.control.trigger(riot.EVT.authLogout)
  </script>
</header>
