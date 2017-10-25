/**
* international
*/
import constant from '../definations/constant.js';

class Translate{

  init(callback) {
    $.getJSON("dist/locales/locales.json",{async:false},function(locales){

      var lang = (navigator.languages) ? navigator.languages[0] : navigator.language
      if (!lang) lang = navigator.language
      if (!lang) lang = navigator.browserLanguage;
      if (!lang) lang = navigator.userLanguage;
      if (!lang) lang = navigator.systemLanguage;

      // for chinese
      if (constant.CHINESE_LANG_LIST.indexOf(lang) > -1) {
        lang = (lang === 'zh') ? 'zh-cn' : lang.toLowerCase()
        lang = (constant.CHINESE_HANT_LIST.indexOf(lang) > -1) ? 'zh-tw' : lang
      } else {
        if (lang && lang.search("-") > -1) lang = lang.split("-")[0]
      }
      // default lang
      if (!(lang in locales)) lang = "en"

      i18n.dictionary(locales)
      i18n.setLanguage(lang)

      callback()
    })
  }
}

let translate = new Translate();
export default translate;
