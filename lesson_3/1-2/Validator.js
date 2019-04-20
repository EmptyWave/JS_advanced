class Validator {
  constructor(id, source, regExp, replaceSymbol){
    this.id = id;
    this._getText(source, regExp, replaceSymbol);
  }

  _getText(source, regExp, replaceSymbol){
    fetch(source)
      .then(result => result.text())
      .then(data => this._render(this.id ,data.replace(regExp, replaceSymbol)))
  }

  _render(id, text){
    let el = document.getElementById(id);
    el.innerText = text;
  }
}