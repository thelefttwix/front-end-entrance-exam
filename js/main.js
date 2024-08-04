
let previous_state = [];

const edit_items = document.querySelectorAll(".edit-item");
const edit_button = document.querySelector(".edit-button");
const save_button = document.querySelector(".save-button");
const cancel_button = document.querySelector(".cancel-button");
const visible_items = document.querySelectorAll(".visible-item");

console.log(visible_items);
edit_button.addEventListener("click", () => {
    for (const item of edit_items) {
        const text = item.innerText;

        previous_state.push(text)
        item.innerHTML = `<input type="text" value="${text}">`
    }

    edit_button.hidden = true;
    save_button.hidden = false;
    cancel_button.hidden = false;
});

cancel_button.addEventListener("click", () => {
    for (let i = 0; i < edit_items.length; i++) {
        edit_items[i].innerText = previous_state[i];
    }
    previous_state = [];

    edit_button.hidden = false;
    save_button.hidden = true;
    cancel_button.hidden = true;
});

save_button.addEventListener("click", () => {
    for (const item of edit_items) {
        item.innerText = item.children[0].value;
    }
    for (let i = 0; i < visible_items.length; i++) {
      visible_items[i].innerText = edit_items[i].innerText;
    }

    previous_state = [];

    edit_button.hidden = false;
    save_button.hidden = true;
    cancel_button.hidden = true;
});
