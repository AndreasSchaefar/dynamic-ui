class DropDown {
    items: string[];
    input: HTMLInputElement;
    optionList: HTMLUListElement;
    constructor(items: string[]) {
        const mount = document.querySelector('.dropdown');
        this.items = items;
        this.input = this.Input();
        this.optionList = this.OptionList();
        mount.append(this.input, this.optionList);
        this.render();
        this.bindShow();
        this.bindSelect();
    }

    bindShow() {
        this.input.addEventListener('click', this.handleShow);
    }

    bindSelect() {
        this.optionList.addEventListener('click', (event) => {
            this.handleSelect(event.target as HTMLLIElement);
        });
    }

    handleShow = () => {
        this.optionList.classList.toggle('active');
    };

    handleSelect = (target: HTMLLIElement) => {
        if (target.textContent === this.input.placeholder) return;
        if (target.className === 'option') {
            this.input.placeholder = target.textContent;
            this.render();
            this.handleShow();
        }
    };

    public addItem(...items: string[]) {
        this.items.push(...items);
        this.render();
    }

    private OptionList() {
        const optionList = document.createElement('ul');
        optionList.classList.add('options', 'active');
        return optionList;
    }

    render() {
        while (this.optionList.firstChild) {
            this.optionList.firstChild.remove();
        }
        this.items.forEach((item) => {
            const selected = item === this.input.placeholder;
            this.optionList.append(this.Option(item, selected));
        });
    }

    private Input() {
        const input = document.createElement('input');
        input.classList.add('label');
        input.readOnly = true;
        input.placeholder = this.items[0];
        return input;
    }

    private Option(text: string, selected: boolean) {
        const option = document.createElement('li');
        option.className = 'option';
        if (selected) option.classList.add('selected');
        option.textContent = text;
        return option;
    }
}

class Carousel {}
class MobileMenu {}

export { DropDown, Carousel, MobileMenu };
