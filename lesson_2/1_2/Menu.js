class Menu {
    constructor(id, className, items){
        this.id = id;
        this.className = className;
        this.items = items;
    }
    render(){
        let result = `<ul class="${this.className}" id="${this.id}">`;
        for (let i = 0; i < this.items.length; i++){
            if(this.items[i] instanceof MenuItem) {
                result += this.items[i].render()
            }
            if(this.items[i] instanceof SubMenu) {
                result += this.items[i].render()
            }
        }
        result += `</ul>`;
        return result
    }
    /*remove(){
        let element = document.getElementById(this.id);
        let button = document.getElementById(`delete_${this.id}`);
        button.addEventListener('click',() => element.remove());
        for (let i = 0; i < this.items.length; i++){
            if(this.items[i] instanceof SubMenu) {
              document
                .getElementById(`delete_${this.items[i].id}`)
                .addEventListener('click',() => document.getElementById(this.items[i].id).remove());
            }
        }
    }*/
}