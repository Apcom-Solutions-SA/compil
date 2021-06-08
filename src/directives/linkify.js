/*global define*/
import * as linkify from 'linkifyjs';
import linkifyHtml from 'linkifyjs/html';

const MyLinkify = {
  beforeMount(el, binding){
    
    const linkified = linkifyHtml(el.innerHTML, binding.value);

    let content = new Content(); 
    el.innerHTML = content.data(linkified).hashtag().mention().author().value();
  }
}


class Content{
  constructor(){
    this.text;
  }

  data(text){
    this.text = text; 
    return this; 
  }
  
  // #apcom (comme un tag) au clic = recherche ce tag dans le moteur de recherche des notes.
  hashtag(){
    this.text = this.text.replace(/#(\w+)/g, '<a href="/notes?tag=$1">#$1</a>');
    return this;
  }

  // @21.002 (comme un lien ID) au clic ouvre la fiche de la note correspondante
  mention(){
    this.text = this.text.replace(/@(\d{2}.\d+)/g, '<a href="/note/$1">@$1</a>');
    return this;
  }

  // +09C05719D34C8594F6E5CA0 (comme un lien clé publique user). 
  // Au clic = recherche ce user dans le moteur de de recherche des notes et liste toutes les notes de cet autheur.
  author(){
    this.text = this.text.replace(/\+(\w+)/g, '<a href="/notes?public_id=$1">+$1</a>');
    return this;
  }

  value(){
    return this.text; 
  }
}

export default MyLinkify; 