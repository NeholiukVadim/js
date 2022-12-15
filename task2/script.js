const menu = document.querySelector(".menu-item-conteiner");
const filterButtonAll = document.querySelector(".all-button");
const filterButtonSalads = document.querySelector(".salad-button");
const filterButtonDinners = document.querySelector(".dinner-button");
const filterButtonDrinks = document.querySelector(".drinks-button");
const filterButtonDeserts = document.querySelector(".deserts-button");

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
}
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

function filterMenu(foodType) {
   return menuItems.filter(menuItem => menuItem.catagory.includes(foodType))
};

function showMenu(menuItems) {
   menu.innerHTML = ""
   menuItems.forEach(function (menuItem) {
      menu.innerHTML += getMenuItem(menuItem)
   })
};

filterButtonAll.addEventListener("click", () => showMenu(menuItems));

filterButtonSalads.addEventListener("click", () => showMenu(filterMenu("salad")));

filterButtonDinners.addEventListener("click", () => showMenu(filterMenu("dinner")));

filterButtonDrinks.addEventListener("click", () => showMenu(filterMenu("drink")));

filterButtonDeserts.addEventListener("click", () => showMenu(filterMenu("desert")));

showMenu(menuItems);