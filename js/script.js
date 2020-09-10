const item_input = document.getElementById("item-input");
const form = document.getElementById("form");
const todoList = document.getElementById("todo-list");
const notify_text = document.getElementById("notify-text");
const search_box = document.getElementById("search-box");
// localStorage.clear();

let todos = get_Saved();

document.addEventListener("DOMContentLoaded", () => {
  if (todos === null) {
    return;
  } else {
    create_item(todos);
    summary(todos);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let input_value = item_input.value;

  let todo = {
    text: input_value,
    completed: false,
  };

  validate(input_value, todo);

  item_input.value = "";
  console.log(input_value, JSON.parse(localStorage.getItem("todo")));
});

function validate(value, todo) {
  console.log(storage);
  // debugger;
  if (storage === null) {
    console.log("first if");
    get_Local_Storage(todo);
    create_item(todos);
  } else if (storage.length > 0) {
    console.log("second if");

    for (let i = 0; i < storage.length; i++) {
      console.log(storage[i].text);
      if (value === storage[i].text) {
        return alert("word existed");
      }
    }
    console.log("finished loop");
    get_Local_Storage(todo);
    create_item(todos);
  }
}

const get_Local_Storage = (item) => {
  let storage = localStorage.getItem("todo");
  if (storage === null) {
    storage = [];
  } else {
    storage = JSON.parse(localStorage.getItem("todo"));
  }
  storage.push(item);
  localStorage.setItem("todo", JSON.stringify(storage));
};

const create_item = (storage) => {
  todoList.innerHTML = "";
  storage.forEach((item) => {
    let parentDiv = document.createElement("label");
    parentDiv.classList.add("item", "my-3");
    parentDiv.setAttribute("for", `${item.text}`);

    let div = document.createElement("div");
    div.classList.add("form-check-inline");
    parentDiv.appendChild(div);

    let span = document.createElement("span");
    span.classList.add("todo-text");
    span.innerHTML = item.text;

    let input = document.createElement("input");
    input.classList.add("form-check-input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", `${item.text}`);
    input.checked = item.completed;
    input.addEventListener("change", (event) => {
      action_state(event, storage, span, item, true);
    });

    div.appendChild(input);
    div.appendChild(span);

    let btn = document.createElement("button");
    btn.classList.add("btn", "btn-link", "remove-btn", "btn-sm");
    btn.innerHTML = "remove";
    parentDiv.appendChild(btn);

    btn.addEventListener("click", () => {
      console.log("click btn", item);
      action_state(null, storage, null, item, false);
    });

    if (item.completed === true) {
      span.style.textDecoration = "line-through";
    } else {
      span.style.textDecoration = "none";
    }

    todoList.appendChild(parentDiv);
  });
};

function action_state(event, store, text, item, bool) {
  if (bool === true) {
    item.completed = event.target.checked;
    let newOne = JSON.stringify(store);
    localStorage.removeItem("todo");
    localStorage.setItem("todo", newOne);
    if (item.completed === true) {
      text.style.textDecoration = "line-through";
    } else {
      text.style.textDecoration = "none";
    }
    console.log(event.target.checked, store);
    summary(store);
  } else if (bool === false) {
    let old = store.filter((target) => {
      return target !== item;
    });
    localStorage.removeItem("todo");
    localStorage.setItem("todo", JSON.stringify(old));
    create_item(store);
  }
}

function summary(store) {
  let todos = store.filter((item) => {
    return !item.completed;
  });

  notify_text.innerHTML = todos.length;
}

function filter() {
  todoList.innerHTML = "";
  let store = JSON.parse(localStorage.getItem("todo"));
  let search_value = search_box.value;
  let filterTodos = store.filter((item) => {
    return item.text.toLowerCase() === search_value.toLowerCase();
  });
  console.log(filterTodos);

  if (search_value === "") {
    create_item(todos);
  } else {
    create_item(filterTodos);
  }
}

search_box.addEventListener("input", () => {
  filter();
});

function get_Saved() {
  return JSON.parse(localStorage.getItem("todo"));
}
