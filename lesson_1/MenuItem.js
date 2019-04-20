class MenuItem {
    constructor(href, title,className){
        this.href = href;
        this.title = title;
        this.className = className;
    }
    render(){
        return `<li><a href="${this.href}" 
                      ${this.className !== '' ? `class="${this.className}"`:''}>${this.title}</a></li>`}}