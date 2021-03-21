const toDoForm = document.querySelector(".todo__form"),
  toDoInput = toDoForm.querySelector("input"),
  toDoInputEraser = toDoForm.querySelector("span"),
  toDoPendingList = document.querySelector(".js-pendingList"),
  toDoFinishedList = document.querySelector(".js-finishedList");

const PENDING_LS = "pending",
  FINISHED_LS = "finished";

const noID = 0;

let pending = [],
  finished = [],
  idNumbers = 1;

const PENDING_NUMBER = 1,
  FINISHED_NUMBER = 2;

function saveToDos(num) {
  if (num === PENDING_NUMBER) {
    localStorage.setItem(PENDING_LS, JSON.stringify(pending));
  } else {
    localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
  }
}

function toPendingToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const filteredOne = finished.find(function (toDo) {
    return toDo.id == parseInt(li.id);
  });
  paintPendingToDo(filteredOne.text, filteredOne.id);

  deleteFinishedToDo(event);
}

function toFinishedToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const filteredOne = pending.find(function (toDo) {
    return toDo.id == parseInt(li.id);
  });
  paintFinishedToDo(filteredOne.text, filteredOne.id);

  deletePendingToDo(event);
}

function deleteFinishedToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  toDoFinishedList.removeChild(li);
  const cleanFinishedToDos = finished.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finished = cleanFinishedToDos;
  saveToDos(FINISHED_NUMBER);
}

function deletePendingToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  toDoPendingList.removeChild(li);
  const cleanPendingToDos = pending.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pending = cleanPendingToDos;
  saveToDos(PENDING_NUMBER);
}

function paintFinishedToDo(text, num) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteFinishedToDo);
  const pendingBtn = document.createElement("button");
  pendingBtn.innerText = "💔";
  pendingBtn.addEventListener("click", toPendingToDo);
  const span = document.createElement("span");
  const newId = idNumbers++;
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(pendingBtn);
  li.id = newId;
  if (num !== noID) {
    li.id = num;
    idNumbers--;
  } else {
    li.id = newId;
  }
  toDoFinishedList.appendChild(li);
  const toDoObj = {
    text: text,
    id: parseInt(li.id)
  };
  finished.push(toDoObj);
  saveToDos(FINISHED_NUMBER);
}

function paintPendingToDo(text, num) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deletePendingToDo);
  const finBtn = document.createElement("button");
  finBtn.innerText = "💖";
  finBtn.addEventListener("click", toFinishedToDo);
  const span = document.createElement("span");
  const newId = idNumbers++;
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  if (num !== noID) {
    li.id = num;
    idNumbers--;
  } else {
    li.id = newId;
  }
  toDoPendingList.appendChild(li);
  const toDoObj = {
    text: text,
    id: parseInt(li.id)
  };

  pending.push(toDoObj);
  saveToDos(PENDING_NUMBER);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPendingToDo(currentValue, noID);
  toDoInput.value = "";
}

function deleteInput() {
  toDoInput.value = "";
}

function loadTodoList() {
  const loadedPending = localStorage.getItem(PENDING_LS);
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (loadedPending) {
    const parsedPendingToDos = JSON.parse(loadedPending);
    parsedPendingToDos.forEach(function (toDo) {
      paintPendingToDo(toDo.text, noID);
    });
  }
  if (loadedFinished) {
    const parsedFinishedToDos = JSON.parse(loadedFinished);
    parsedFinishedToDos.forEach(function (toDo) {
      paintFinishedToDo(toDo.text, noID);
    });
  }
}

function init() {
  loadTodoList();
  toDoForm.addEventListener("submit", handleSubmit);
  toDoInputEraser.addEventListener("click", deleteInput);
}

init();
