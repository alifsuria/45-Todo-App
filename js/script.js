const form = document.getElementById("form");
const todo_input = document.getElementById("todo-input");
const filter_box = document.getElementById("filter-box");
const hide_complete = document.getElementById("hide-completed");

let todos = get_saved_todo();

document.addEventListener("DOMContentLoaded", () => {
  generate_Dom(todos);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let input_value = todo_input.value;
  //   debugger;
  let jsonStore = JSON.parse(localStorage.getItem("todo-2"));
  console.log(jsonStore);

  if (input_value.length > 0) {
    let todo = {
      id: generate_rand_ID(),
      text: input_value,
      completed: false,
    };
    console.log(todos);
    todos.push(todo);
    save_todo(todos);
    filter(todos);
    // console.log(todos);
  }
  todo_input.value = "";
});

console.log(todos);

filter_box.addEventListener("input", () => {
  filter(todos);
});

hide_complete.addEventListener("change", (event) => {
  console.log(event.target.checked);
  filter(todos);
});

const filter = (todos) => {
  const filter_value = filter_box.value;
  let filter = todos.filter((item) => {
    // console.log(item.text.toLowerCase().includes(filter_value.toLowerCase()))
    return item.text.toLowerCase().includes(filter_value.toLowerCase());
  });

  if (hide_complete.checked) {
    filter = todos.filter((item) => {
      return !item.completed;
    });
    console.log(filter);
  }
  console.log(filter);
  generate_Dom(filter);
  todos_summery(todos);
};
