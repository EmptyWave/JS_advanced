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
      const value = inputs[key].value;
      if (this._valueIsValid(value,key)) {
        if (inputs[key].classList.contains('input__err')) inputs[key].classList.remove('input__err');
        inputs[key].classList.add('input__ok');
      } else {
        event.preventDefault();
        errorFields.push(inputs[key].placeholder);
        if (inputs[key].classList.contains('input__ok')) inputs[key].classList.remove('input__ok');
        inputs[key].classList.add('input__err');
      }
    }
    if (errorFields.length > 0){
      let str = "";
      for (let name of errorFields){
        str += `${name}, `;
      }
      alert(`Не верно введены данные в полях: ${str}пожалуйста исправьте и попробуйте снова.`)
    }
  }
  _valueIsValid(value,key){
    return value.match(this.settings.regExp[key]);
  }
}