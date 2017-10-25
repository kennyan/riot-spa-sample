class ItemStore{

  constructor(){
    riot.observable(this);
    this.fetchEvents();
  }

  fetchEvents(){
    // loadGroup
    this.on(riot.EVT.loadGroup, () => {
      this._loadArticleHandle((err,res) => {
        if(err) return this.trigger(riot.EVT.loadGroupError, res.body)
        this.trigger(riot.EVT.loadGroupSuccess, res.body)
      })
    })
    // loadArticle
    this.on(riot.EVT.loadArticle, (pageId) => {
      this._loadArticleHandle((err,res) => {
        if (err) return this.trigger(riot.EVT.loadArticleError, res.body);
        let filtered = _.filter(res.body.contents, (n) => (n.allowShowPageIds.indexOf(pageId) != -1))
        this.trigger(riot.EVT.loadArticleSuccess, filtered);
      })
    })
  }

  _loadArticleHandle (cb) {
    request
    .get('/dist/json/item.json')
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return cb(true)
      cb(null, res)
    })
  }

}

// add store to riot control
let itemStore = new ItemStore();
riot.control.addStore(itemStore);

export default itemStore;
