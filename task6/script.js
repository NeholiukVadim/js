const inputValue = document.querySelector(".task-input");
const addButton = document.querySelector(".task-button");
const taskConteiner = document.querySelector(".tasks-conteiner");
const listClearButton = document.querySelector(".clear-button");

let storedArray = [];
let listData = storedArray;
let listItemId = 0;
inputValue.value = '';

const writeLocalStorageData = () => {
   localStorage.setItem("storedArrayData", JSON.stringify(listData))
};

const changeId = () => {
   listItemId = listItemId + 1;
   return listItemId;
};

const addArrayElement = () => {
   listData.push(inputValue.value)
};

const editItem = (item) => {
   taskText = item.querySelector(".task-text");
   arrayItem = item.querySelector(".task-text").textContent;
   inputValue.value = taskText.textContent;
   addButton.textContent = "Edit";
}

const editTask = () => {
   taskText.innerHTML = inputValue.value;
   addButton.textContent = "Add";
}

const editArray = () => {
   index = listData.indexOf(arrayItem);
   listData[index] = inputValue.value;
}

const deleteItem = (item) => {
   item.remove();
   arrayItem = listData.indexOf(item.querySelector(".task-text").textContent);
   listData.splice(arrayItem, 1);
   listItemId = listItemId - 1;
}

const showList = () => {
   taskConteiner.insertAdjacentElement('beforeend', renderTask(listItemId));
};

const renderTask = (listItemId) => {
   const template = document.createElement('div');
   template.innerHTML = `
   <div class="task-item">
      <h2 class="task-text">${listData[listItemId]}</h2>
      <button class="checkmark"><img class="checkmark-button" src="icons/edit.png" title="edit"></button>
      <button class="trashbin"><img class="trashbin-button" src="icons/delete.png" title="delete"></button>
   </div>
   `
   template.querySelector('.checkmark').addEventListener('click', () => {
      editItem(template);
   });
   template.querySelector('.trashbin').addEventListener('click', () => {
      deleteItem(template);
      writeLocalStorageData();
   });
   return template
};

const getLocalStorageData = () => {
   storedArray = JSON.parse(localStorage.getItem("storedArrayData"));
   if (storedArray === null) {
      storedArray = [];
      listData = [];
   }
   else {
      listData = storedArray;
      listData.forEach(listItem => {
         taskConteiner.insertAdjacentElement('beforeend', renderTask(listData.indexOf(listItem)));
      });
      listItemId = storedArray.length;
   }
};

getLocalStorageData()

addButton.addEventListener("click", () => {
   if (addButton.textContent === "Add") {
      addArrayElement();
      showList();
      writeLocalStorageData();
      changeId();
      inputValue.value = "";
   }
   else if (addButton.textContent === "Edit") {
      editTask();
      editArray();
      writeLocalStorageData();
      inputValue.value = "";
   }
});

listClearButton.addEventListener("click", () => {
   listItemId = 0;
   listData = [];
   taskConteiner.innerHTML = "";
   inputValue.value = "";
   localStorage.clear();
});