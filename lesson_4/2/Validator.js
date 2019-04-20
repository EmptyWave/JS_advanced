class Validator{
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

class FormValidator{
  constructor(settings){
    this.settings = settings;
  }
  check(inputs){
    let errorFields = [];
    for (let key in inputs){
      const el = inputs[key];
      if (this._valueIsValid(el.value,key)) {
        if (el.classList.contains(this.settings.errorClassName)) el.classList.remove(this.settings.errorClassName);
        el.classList.add(this.settings.successClassName);
      } else {
        event.preventDefault();
        errorFields.push(el.placeholder);
        if (el.classList.contains(this.settings.successClassName)) el.classList.remove(this.settings.successClassName);
        el.classList.add(this.settings.errorClassName);
      }
    }
    if (errorFields.length > 0) this._massageOnError(errorFields);
    else this._massageOnSuccess();
  }
  _valueIsValid(value,key){
    return value.match(this.settings.regExp[key]);
  }
  _massageOnError(errorFields){
    let str = "";
    for (let name of errorFields){
      str += `${name}, `;
    }
    alert(`Не верно введены данные в полях: ${str}пожалуйста исправьте и попробуйте снова.`);
  }
  _massageOnSuccess(){
    alert(`Все поля введены верно.`);
  }
}