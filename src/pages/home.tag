import '../components/header.tag'
import '../components/groupname.tag'
import '../components/container.tag'
import '../components/footer.tag'

<home>
  <header></header>
  <groupname></groupname>
  <container></container>
  <footer></footer>
  <script>
    riot.control.trigger(riot.EVT.loadGroup, opts.key);
  </script>
</home>
