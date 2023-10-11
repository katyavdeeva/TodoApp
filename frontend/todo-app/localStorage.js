// получение данных из LS
export function getTodoListLocal(owner) {
  let localData = JSON.parse(localStorage.getItem(owner))
  return localData !== null ? localData : [];
};

// добавление дела в LS
export function createTodoItemLocal({ owner, name }) {
  let listArray = [];

  if (localStorage.getItem(owner) === null) {
    listArray = [];
  }
  else  {
    listArray = JSON.parse(localStorage.getItem(owner));
  }

 let item = {
    name: name,
    done: false,
    id: ((Math.random() * 3.14).toFixed(2)),
  }

  listArray.push(item);
  localStorage.setItem(owner, JSON.stringify(listArray))

  return item;
}

// изменение статуса дела
export function changeTodoItemDone({todoItem}, owner) {
  let listArray = JSON.parse(localStorage.getItem(owner));
    todoItem.done = !todoItem.done;
  listArray.map(obj => {
    if (obj.id === todoItem.id ) {
      obj.done = todoItem.done;
    }
  });
  localStorage.setItem(owner, JSON.stringify(listArray));
}


// удаление дела
export function deleteTodoItemLocal({element, todoItem}, owner) {
  if (confirm('Вы уверены?')) {
   element.remove();
    let listArray = JSON.parse(localStorage.getItem(owner));
    let newList = listArray.filter(obj => obj.id !== todoItem.id);
    localStorage.setItem(owner, JSON.stringify(newList));
  }
}


