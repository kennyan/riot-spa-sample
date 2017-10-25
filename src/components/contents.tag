import constant from '../definations/constant.js'

<contents>
  <div class="contentsArea">
    <div class="cardWrap">
      <div each={ content, index in articles } class="card">
        <div each={ content.type === 'text' ? [true]:[]} class="cont-text">
          <div>{ content.text }</div>
        </div>
        <div each={ content.type === 'image' ? [true]:[]} class="cont-pic">
           <img data-type="{ content.type }"  src="{ content.imageUrl }" />
        </div>
      </div>
    </div>
    <loader></loader>
  </div>
  <script>

    // refleshArticle
    riot.mixin("refleshArticle", {
      init : () => {
        this.update({articles: []})
        riot.control.trigger(riot.EVT.loadArticle, this.mixin("getPageId").pageId);
      }
    })

    // loadArticle
    riot.control.on(riot.EVT.loadArticleSuccess, articles => {

      Array.prototype.push.apply(this.articles, articles);

      this.update({articles:this.articles})

      var elem = document.querySelector('.cardWrap')

      imagesLoaded.makeJQueryPlugin($)
      $('.cardWrap').imagesLoaded({}, () => {
        let msnryDummy = new Masonry(elem, {itemSelector: '.card'});
      })
    })
  </script>
</contents>
<loader>
  <div ref="loader" class="article-loader">
    <img id="loader" src="dist/images/common/loading.gif">
  </div>
  <script>
    this.on("mount",function(){
      $('.cardWrap').infiniteScrollHelper({
        loadMore: (pageCount, done) => {
          this.refs.loader.style.display = 'block'
          riot.control.trigger(riot.EVT.loadArticle, this.mixin("getPageId").pageId);
          setTimeout(() => {
            this.refs.loader.style.display = 'none'
            done();},
          2000);
        },
        bottomBuffer: 50,
        interval: 2000,
        startingPageCount: constant.PAGENATION.DEFAULTSTARTPAGE
      });
    })
  </script>
</loader>
