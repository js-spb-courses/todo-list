const STORAGE_KEY = 'todoApp';
const STORAGE_KEY_ID = 'todoAppId';

let items = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
let id = JSON.parse(localStorage.getItem(STORAGE_KEY_ID) ?? '0');

const itemListElement = document.querySelector('.item-list');

const formElement = document.querySelector('.todo-form');

formElement.addEventListener('submit', addItem);

let htmlString = '';

for (let i = 0; i < items.length; i++) {
    htmlString += `<div class="item" data-id="${items[i].id}">${items[i].text}</div>`;
}

itemListElement.innerHTML = htmlString;

function addItem(event) {
    event.preventDefault();
    const inputElement = document.querySelector('.todo-form__input');
    const text = inputElement.value;

    if (text === '') {
        return;
    }

    id++;

    const htmlString = `<div class="item" data-id="${id}">${text}<div class="item-delete" data-name="${id}">X</div></div>`;

    items.push({
        text: text,
        id: String(id)
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    localStorage.setItem(STORAGE_KEY_ID, JSON.stringify(id));

    itemListElement.innerHTML += htmlString;
    inputElement.value = '';
}



itemListElement.addEventListener('click', removeItem);



function removeItem(event) {
 

    const id = event.target.dataset.name;

    let element = document.querySelector(`[data-id="${id}"]`);
    if(event.target === element){return;}
    
    element.remove();
  
    items = items.filter(function (item) {
        return item.id !== id;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}