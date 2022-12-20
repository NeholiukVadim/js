const menu = document.querySelector(".menu-item-conteiner");
const filterButtonAll = document.querySelector(".all-button");
const filterButtonSalads = document.querySelector(".salad-button");
const filterButtonDinners = document.querySelector(".dinner-button");
const filterButtonDrinks = document.querySelector(".drinks-button");
const filterButtonDeserts = document.querySelector(".deserts-button");
const sortButton = document.querySelector(".sort-button");
const menuSortedResult = document.querySelector(".menu-sort-result");

const menuItems = [{
   photo: "images/pancakes.jpg",
   title: "Pancake",
   price: "$9.00",
   description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quaerat rerum suscipit possimus enim at reprehenderit velit exercitationem unde.",
   catagory: ["desert", "dinner"]
},
{
   photo: "images/soup.jpg",
   title: "Soup",
   price: "$4.50",
   description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quaerat rerum suscipit possimus enim at reprehenderit velit exercitationem unde.",
   catagory: ["dinner"]
},
{
   photo: "images/pizza.jpg",
   title: "Pizza",
   price: "$11.00",
   description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quaerat rerum suscipit possimus enim at reprehenderit velit exercitationem unde.",
   catagory: ["dinner"]
},
{
   photo: "images/cake.jpg",
   title: "Cake",
   price: "$13.00",
   description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quaerat rerum suscipit possimus enim at reprehenderit velit exercitationem unde.",
   catagory: ["desert"]
},
{
   photo: "images/juice.jpg",
   title: "Juice",
   price: "$3.50",
   description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quaerat rerum suscipit possimus enim at reprehenderit velit exercitationem unde.",
   catagory: ["drink", "desert"]
},
{
   photo: "images/salad.jpg",
   title: "Salad",
   price: "$6.50",
   description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quaerat rerum suscipit possimus enim at reprehenderit velit exercitationem unde.",
   catagory: ["salad"]
},
{
   photo: "images/burger.jpg",
   title: "Burger",
   price: "$8.00",
   description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quaerat rerum suscipit possimus enim at reprehenderit velit exercitationem unde.",
   catagory: ["dinner"]
},
{
   photo: "images/milkshake.jpg",
   title: "Milkshake",
   price: "$3.50",
   description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quaerat rerum suscipit possimus enim at reprehenderit velit exercitationem unde.",
   catagory: ["desert", "drink"]
},
{
   photo: "images/cupcake.jpg",
   title: "Cupcake",
   price: "$7.00",
   description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quaerat rerum suscipit possimus enim at reprehenderit velit exercitationem unde.",
   catagory: ["desert"]
},
{
   photo: "images/steak.jpg",
   title: "Steak",
   price: "$11.00",
   description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quaerat rerum suscipit possimus enim at reprehenderit velit exercitationem unde.",
   catagory: ["dinner"]
},
{
   photo: "images/pasta.jpg",
   title: "Pasta",
   price: "$9.00",
   description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quaerat rerum suscipit possimus enim at reprehenderit velit exercitationem unde.",
   catagory: ["dinner"]
},
];

const getMenuItem = (menuItem) => {
   return ` 
   <div class="menu-item">
      <img src="${menuItem.photo}" class="menu-item-img">
      <div class="menu-item-text">
         <p class="menu-item-article">${menuItem.title}<span class="price"> ${menuItem.price}</span></p>
         <div class="menu-item-description">${menuItem.description}</div>
      </div>
   </div>
`
};

const getSortedMenuItem = (sortedMenuItem) => {
   return `<div class="sorted-menu-item">${sortedMenuItem}</div>`
};

let currentMenu = menuItems;

function filterMenu(foodType) {
   return menuItems.filter(menuItem => menuItem.catagory.includes(foodType))
};

function sortMenu(currentMenu) {
   return currentMenu.sort((a, b) => {
      if (a.title.length === b.title.length) {
         return a.title.localeCompare(b.title);
      } else {
         return a.title.length - b.title.length;
      }
   });
};

function sortedResult(currentMenu) {
   //const sortedArray = sortMenu(currentMenu)
   sortedMenuResult = currentMenu.map(function (items) {
      return items["title"]
   });
   return sortedMenuResult;
}

function showSortedMenu(sortedMenuResult) {
   menuSortedResult.innerHTML = ""
   sortedMenuResult.forEach(function (sortedMenuItem) {
      menuSortedResult.innerHTML += getSortedMenuItem(sortedMenuItem)
   })
};

function showMenu(menuItems) {
   menu.innerHTML = ""
   menuItems.forEach(function (menuItem) {
      menu.innerHTML += getMenuItem(menuItem)
   })
};

filterButtonAll.addEventListener("click", () => {
   currentMenu = menuItems;
   showMenu(currentMenu);
   sortedResult(currentMenu);
   showSortedMenu(sortedMenuResult);
});

filterButtonSalads.addEventListener("click", () => {
   currentMenu = filterMenu("salad");
   showMenu(currentMenu);
   sortedResult(currentMenu);
   showSortedMenu(sortedMenuResult);
});

filterButtonDinners.addEventListener("click", () => {
   currentMenu = filterMenu("dinner");
   showMenu(currentMenu);
   sortedResult(currentMenu);
   showSortedMenu(sortedMenuResult);
});

filterButtonDrinks.addEventListener("click", () => {
   currentMenu = filterMenu("drink");
   showMenu(currentMenu);
   sortedResult(currentMenu);
   showSortedMenu(sortedMenuResult);
});

filterButtonDeserts.addEventListener("click", () => {
   currentMenu = filterMenu("desert");
   showMenu(currentMenu);
   sortedResult(currentMenu);
   showSortedMenu(sortedMenuResult);
});

sortButton.addEventListener("click", () => {
   showMenu(sortMenu(currentMenu))
   currentMenu = sortMenu(currentMenu)
   sortedResult(currentMenu);
   showSortedMenu(sortedMenuResult);
});

showMenu(menuItems);
sortedResult(currentMenu);
showSortedMenu(sortedMenuResult);