const todo_list = document.getElementById("todo-list");
const feedback = document.getElementById("feedback-text");

const get_saved_todo = () => {
  let todoStorage = localStorage.getItem("todo-2");

  if (todoStorage) {
    return JSON.parse(todoStorage);
  } else {
    return [];
  }
};

const save_todo = (todos) => {
  return localStorage.setItem("todo-2", JSON.stringify(todos));
};

const generate_rand_ID = () => {
  // debugger;
  const ID = Math.floor(Math.random() * 100);
  console.log(ID);
  let storage = get_saved_todo();

  // storage.forEach((item)=>{
  //     // console.log(item.id);
  //     if(ID === item.id){
  //         console.log("same id exist")
  //         return generate_rand_ID()
  //     }
  // })
  // console.log("this id didnt exist yet")
  // return ID

  for (let i = 0; i < storage.length; i++) {
    if (ID === storage[i].id) {
      return generate_rand_ID();
    }
  }
  return ID;
};

const generate_Dom = (todoStorage) => {
  todo_list.innerHTML = "";
  todoStorage.forEach((item) => {
    let label = document.createElement("label");
    label.classList.add("item", "my-3");
    label.setAttribute("for", `${item.id}`);

    let div = document.createElement("div");
    div.classList.add("form-check-inline");
    label.appendChild(div);

    let input = document.createElement("input");
    input.classList.add("form-check-input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", `${item.id}`);
    input.checked = item.completed;

    input.addEventListener("change", (event) => {
      item.completed = event.target.checked;
      save_todo(todos);
      todos_summery(todos);
      filter(todos);
      console.log(event.target.checked, item, todos);
    });

    let span = document.createElement("span");
    span.classList.add("todo-text");
    span.innerHTML = item.text;
    div.appendChild(input);
    div.appendChild(span);

    let btn = document.createElement("button");
    btn.classList.add("btn", "btn-sm", "btn-link", "remove-btn");
    btn.innerHTML = "remove";
    btn.addEventListener("click", () => {
      todos = remove_item(item);
      save_todo(todos);
      generate_Dom(todos);
      todos_summery(todos);
      console.log(todos);
    });
    label.appendChild(btn);

    todo_list.appendChild(label);
  });
  todos_summery(get_saved_todo());
};

const todos_summery = (todos) => {
  let summery = todos.filter((todo) => !todo.completed);
  feedback.innerHTML = `${summery.length}`;
};

const remove_item = (item) => {
  let newstorage = todos.filter((target) => target.id !== item.id);
  console.log(todos, newstorage);

  return newstorage;
};
