import { addTask, showTask, removeTask, UpdateTask } from "./main.js";

const getElement = (elementName, attrs = {}, father) => {
  const element = document.createElement(elementName);

  for (const attrsKey in attrs) {
    element[attrsKey] = attrs[attrsKey];
  }

  father && father.append(element);

  return element;
};

const userData = {
  userName: "Quvonchbek",
  image: "https://avatars.githubusercontent.com/u/90612224?v=4",
};
const getData = () => {
  return (
    new Date().getHours().toString() +
    " : " +
    new Date().getMinutes().toString() +
    " " +
    new Date().getDate().toString() +
    "." +
    (new Date().getMonth().toString() + 1) +
    "." +
    new Date().getFullYear().toString()
  );
};
const addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let task_text = addForm.task.value;
  addTask(
    {
      text: task_text,
      user: userData.userName,
      img: userData.image,
      date: getData(),
    },
    addForm
  );
});

const taskListUl = document.querySelector("#taskList");

showTask(createList);

function createList(obj) {
  const tasks = Object.entries(obj);
  console.log(tasks);
  taskListUl.innerHTML = "";
  tasks.map((item) => {
    console.log(item);
    let id = item[0];
    let task = item[1];
    const li = getElement("li", { className: "p-2 " }, taskListUl);
    const head = getElement(
      "div",
      { className: "d-flex justify-content-between" },
      li
    );
    const left = getElement(
      "div",
      { className: " d-flex align-items-center" },
      head
    );
    const img = getElement(
      "img",
      {
        className: "userImg text-white",
        src: task.img || "https://avatars.githubusercontent.com/u/90612224?v=4",
      },
      left
    );
    const infoUser = getElement("div", { className: "info" }, left);
    getElement(
      "p",
      {
        className: "userName m-0 text-white",
        innerHTML: task.user || "Unknown User",
      },
      infoUser
    );
    getElement(
      "p",
      { className: "data m-0 text-white", innerHTML: task.date || "yoq" },
      infoUser
    );
    const right = getElement(
      "div",
      { className: "gap-3 d-flex align-items-center" },
      head
    );
    const message = getElement(
      "div",
      { className: "message col-8 col-lg-10 col-md-12 " || "yoq" },
      li
    );
    const textVVV = getElement(
      "textarea",
      { className: "border-0", value: task.text, readOnly: true },
      message
    );
    let editBtn;
    const saveBtnSave = getElement(
      "p",
      { className: "text-white d-none", innerHTML: "Edited" },
      message
    );

    const saveBtn = getElement(
      "button",
      {
        className: " btn btn-success d-none ",
        innerHTML: `<i class="fas fa-check"></i>`,
        onclick: () => {
          textVVV.readOnly = true;
          saveBtn.classList.add("d-none");
          editBtn.classList.remove("d-none");
          saveBtnSave.classList.remove("d-none");

          UpdateTask(id, { text: textVVV.value });
        },
      },
      message
    );

    editBtn = getElement(
      "button",
      {
        className: " btn btn-warning",
        innerHTML: `<i class="far fa-edit"></i>`,
        onclick: () => {
          textVVV.readOnly = false;
          textVVV.focus();
          saveBtn.classList.remove("d-none");
          editBtn.classList.add("d-none");
        },
      },
      message
    );
    const deleteBtn = getElement(
      "button",
      {
        className: " btn btn-danger ms-2",
        innerHTML: `<i class="far fa-trash-alt"></i>`,
        onclick: () => {
          removeTask(id);
        },
      },
      message
    );
  });
}

window.removeTask = removeTask;
window.UpdateTask = UpdateTask;
