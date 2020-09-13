const item_input = document.getElementById("item-input");
const form = document.getElementById("form");
const todoList = document.getElementById("todo-list");
const notify_text = document.getElementById("notify-text");
const search_box = document.getElementById("search-box");
const hide_complete = document.getElementById("hide-complete");

let todos = get_Saved();

function get_Saved() {
  let jsonStore = localStorage.getItem("todo");

  if (jsonStore === null) {
    return [];
  } else {
    return JSON.parse(jsonStore);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log(todos);
  if (todos === null) {
    return;
  } else {
    create_item(get_Saved());
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

  validate(input_value, todo, todos);

  item_input.value = "";
  console.log(input_value, JSON.parse(localStorage.getItem("todo")));
});

hide_complete.addEventListener("change", (event) => {
  console.log(event.target.checked);

  filter(event.target.checked);
});

function validate(value, todo, storage) {
  console.log(storage);
  debugger;
  if (storage === null) {
    console.log("first if");
    get_Local_Storage(todo);
    create_item(get_Saved());
  } else if (storage.length >= 0) {
    console.log("second if");

    for (let i = 0; i < storage.length; i++) {
      console.log(storage[i].text);
      if (value === storage[i].text) {
        return alert("word existed");
      }
    }
    console.log("finished loop");
    get_Local_Storage(todo);
    create_item(get_Saved());
  }
  summary(get_Saved());
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
      action_state(event, get_Saved(), span, item, true);
    });

    div.appendChild(input);
    div.appendChild(span);

    let btn = document.createElement("button");
    btn.classList.add("btn", "btn-link", "remove-btn", "btn-sm");
    btn.innerHTML = "remove";
    parentDiv.appendChild(btn);

    btn.addEventListener("click", () => {
      debugger;
      console.log("click btn", item);
      action_state(null, get_Saved(), null, item, false);
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
    debugger;
    item.completed = event.target.checked;
    let newOne = store.filter((target) => {
      if (target.text === item.text) {
        target.completed = item.completed;
      }
      return target;
    });
    console.log(newOne);
    localStorage.removeItem("todo");
    localStorage.setItem("todo", JSON.stringify(newOne));

    if (item.completed === true) {
      text.style.textDecoration = "line-through";
    } else {
      text.style.textDecoration = "none";
    }
    console.log(event.target.checked, get_Saved());
    summary(store);
  } else if (bool === false) {
    debugger;
    let old = store.filter((target) => {
      console.log(target);
      return target.text !== item.text;
    });
    console.log(old);
    localStorage.removeItem("todo");
    localStorage.setItem("todo", JSON.stringify(old));
    create_item(old);
    summary(old);
  }
}

function summary(store) {
  let todos = store.filter((item) => {
    return !item.completed;
  });

  notify_text.innerHTML = todos.length;
}

function filter(filter) {
  debugger;
  todoList.innerHTML = "";
  let store = JSON.parse(localStorage.getItem("todo"));
  let search_value = search_box.value;
  let filterTodos = store.filter((item) => {
    return item.text.toLowerCase().includes(search_value.toLowerCase());
  });

  if (filter) {
    filterTodos = store.filter((item) => {
      return item.completed === !filter;
    });
    console.log(filterTodos);
  }

  create_item(filterTodos);
}

search_box.addEventListener("input", () => {
  filter();
});
