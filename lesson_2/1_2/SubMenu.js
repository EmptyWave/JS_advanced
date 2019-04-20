class SubMenu extends Menu{
  constructor(id, className, linkClassName, subHref, subName, items){
    super(id, className, items);
    this.subHref = subHref;
    this.subName = subName;
    this.linkClassName = linkClassName;
  }

  render(){
    let result = `<li id="${this.id}"><a href="${this.subHref}" class="${this.linkClassName}">${this.subName}</a>`;
    result +=  super.render();
    result += `</li>`;
    return result
  }

/*  remove(){
    super.remove()
  }*/
}