<menu-nav>
  <nav>
    <div class="pagelistArea">
      <ul>
        <li each={ page in pages } class={ active : page.active}>
          <a href="#" data-pageid={ page.pageId } onclick={ pageChange } >{ page.pageName }</a>
        </li>
      </ul>
    </div>
  </nav>
  <script>
    riot.control.on(riot.EVT.loadGroupSuccess, groupInfo => {
      let pages = groupInfo.pages
      pages[0].active = true
      this.update({pages:pages})
      this.mixin("refleshArticle")
    })
    this.pageChange = (e) => {
      e.stopPropagation()
      let id = e.target.dataset.pageid
      if (_.find(this.pages, { 'pageId': id}).active) return false
      delete _.find(this.pages, { 'active': true}).active
      _.find(this.pages, { 'pageId': id}).active = true
      this.mixin("refleshArticle")
      this.update({pages:this.pages})
    }
    riot.mixin("getPageId", () => {
      return _.find(this.pages, { 'active': true})
    })
  </script>
</menu-nav>
