let listArray = [];
// создаем и возвращаем заголовок приложения
function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}
// создаем и возвращаем форму для создания дела
function createTodoItemElementForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';
  button.disabled = true;
  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);
  input.addEventListener('input', function () {
    if (input.value !== "") {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  })

  return {
    form,
    input,
    button,
  };
}
// Создаем и возвращаем список элементов
function createTodoList() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}
function createTodoItemElement(todoItem, { onDone, onDelete }, owner) {
  const doneClass = 'list-group-item-success'
  let item = document.createElement('li');
  // кнопки помещаем в элемент, который покажет их в одной группе
  let buttonGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deletButton = document.createElement('button');
  // устанавливаем стили для элемента списка, а также для размещения кнопок в его правой части
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  item.textContent = todoItem.name;
  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deletButton.classList.add('btn', 'btn-danger');
  deletButton.textContent = 'Удалить'

  if (todoItem.done) {
    item.classList.add(doneClass)
  }

  // добавляем обработчики на кнопки
  doneButton.addEventListener('click', function () {
    onDone({ todoItem, element: item }, owner);
    item.classList.toggle(doneClass, todoItem.done);
  });
  deletButton.addEventListener('click', function () {
    onDelete({ todoItem, element: item }, owner);
  });

  // вкдадываем кнопки в отдельный элемент, чтобы они объединились в один блок
  buttonGroup.append(doneButton);
  buttonGroup.append(deletButton);
  item.append(buttonGroup);

  return item

}

async function createTodoApp(container, {
  title,
  owner,
  todoItemList = [],
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick,
}) {

  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemElementForm();
  const todoList = createTodoList();
  const handlers = { onDone: onDoneClick, onDelete: onDeleteClick };

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  todoItemList.forEach(todoItem => {
    const todoItemElement = createTodoItemElement(todoItem, handlers, owner);
    todoList.append(todoItemElement)
  });

  todoItemForm.form.addEventListener('submit', async function (e) {
    // эта строка необходима, чтобы предотвратить стандартное действие браузера.
    // В данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
    e.preventDefault();
    // игнорируем создание элемента, если пользователь ничего не ввел в поле
    if (!todoItemForm.input.value) {
      return;
    }

    const todoItem = await onCreateFormSubmit({
      owner,
      name: todoItemForm.input.value.trim(),
     });

    let todoItemElement = createTodoItemElement(todoItem, handlers, owner);
    listArray.push(todoItem.name);
    // создаем и добавляем в список новое дело с названием из поля для ввода

    todoList.append(todoItemElement);

    // обнуляем значение в поле чтобы не пришлось стирать его вручную
    todoItemForm.button.disabled = true;
    todoItemForm.input.value = '';
    console.log(listArray)

  })
}
export { createTodoApp };


