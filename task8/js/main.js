import { productsData } from '../js/data.js';
import { cartItemsTemplate } from '../js/render.js';
import { shopItemsTemplate } from '../js/render.js';

const showcaseBlock = document.querySelector(".showcase-block");
const cartConteiner = document.querySelector(".sidebar-conteiner");
const cartItemsConteiner = document.querySelector(".sidebar-item-conteiner");
const shopcartIcon = document.querySelector(".shopcart-conteiner");
const closeButton = document.querySelector(".close-button");
const checkoutButton = document.querySelector(".checkout-button");
const checkSum = document.querySelector(".total-check-text");
const cartItemCount = document.querySelector(".item-count");

const renderShowcaseItems = (dataArray) => {
   showcaseBlock.innerHTML = ""
   dataArray.forEach(productsData => {
      showcaseBlock.innerHTML += shopItemsTemplate(productsData);
   })
   document.querySelectorAll(".catalog-item").forEach(conteiner => conteiner.querySelector(".cart-button").addEventListener('click', () => {
      window.addedItem = localStorageList.filter((localStorageList) => {
         return conteiner.querySelector(".product-name").textContent == localStorageList.title;
      });
      if (addedItem.length < 1) {
         writeCartData(conteiner)
      }
      else {
         window.modifiedItem = localStorageList.map(array => array.title).indexOf(conteiner.querySelector(".product-name").textContent);
         localStorageList[modifiedItem].quantity = Number(localStorageList[modifiedItem].quantity) + 1
         localStorage.setItem("localStorageData", JSON.stringify(localStorageList))
      }
      showCartItemCount()
   }));
}

const writeCartData = (element) => {
   window.localStorageItem = productsData.filter((productsData) => {
      return element.querySelector(".product-name").textContent === productsData.title
   })
   window.localStorageArrayLength = localStorageList.push.apply(localStorageList, localStorageItem)
   localStorage.setItem("localStorageData", JSON.stringify(localStorageList))
}

const loadStoredCartData = () => {
   getStoredCartData()
   if (localStorage.length == 0) {
      window.localStorageList = [];
   }
   else {
      window.localStorageList = storedCartItems
   }
   showCartItemCount()
}

const updateCartData = () => {
   getStoredCartData()
   cartItemsConteiner.innerHTML = ""
   localStorageList.forEach(storedCartItem => {
      cartItemsConteiner.innerHTML += cartItemsTemplate(storedCartItem);
   })
   document.querySelectorAll(".sidebar-item").forEach(conteiner => conteiner.querySelector(".sidebar-remove-item").addEventListener('click', () => {
      removeSidebarItem(conteiner)
      showCheckSum()
      showCartItemCount()
   }));
   document.querySelectorAll(".sidebar-item").forEach(conteiner => conteiner.querySelector(".arrow-up").addEventListener('click', () => {
      increaseItemQuantity(conteiner)
      changeSidebarItemValues(conteiner)
      showCheckSum()
      showCartItemCount()
   }));
   document.querySelectorAll(".sidebar-item").forEach(conteiner => conteiner.querySelector(".arrow-down").addEventListener('click', () => {
      window.modifiedItem = localStorageList.map(array => array.title).indexOf(conteiner.querySelector(".sidebar-product-name").textContent);
      if (localStorageList[modifiedItem].quantity > 1) {
         decreaseItemQuantity()
         changeSidebarItemValues(conteiner)
         showCheckSum()
         showCartItemCount()
      }
      else {
         removeSidebarItem(conteiner)
         showCheckSum()
         showCartItemCount()
      }
   }));
   showCheckSum()
}

const getStoredCartData = () => {
   window.storedCartItems = JSON.parse(localStorage.getItem("localStorageData"));
}

const removeSidebarItem = (element) => {
   element.remove()
   window.removedItem = localStorageList.map(array => array.title).indexOf(element.querySelector(".sidebar-product-name").textContent);
   localStorageList.splice(removedItem, 1);
   localStorage.setItem("localStorageData", JSON.stringify(localStorageList))
}

const increaseItemQuantity = (element) => {
   window.modifiedItem = localStorageList.map(array => array.title).indexOf(element.querySelector(".sidebar-product-name").textContent);
   localStorageList[modifiedItem].quantity = Number(localStorageList[modifiedItem].quantity) + 1
   localStorage.setItem("localStorageData", JSON.stringify(localStorageList))
}

const decreaseItemQuantity = () => {
   window.localStorageList[modifiedItem].quantity = Number(localStorageList[modifiedItem].quantity) - 1
   localStorage.setItem("localStorageData", JSON.stringify(localStorageList))
}

const changeSidebarItemValues = (element) => {
   element.querySelector(".item-quantity").textContent = localStorageList[modifiedItem].quantity
   window.itemPrice = localStorageList[modifiedItem].price * localStorageList[modifiedItem].quantity
   element.querySelector(".sidebar-product-price").textContent = "$" + itemPrice.toFixed(2)
}

const showCheckSum = () => {
   if (localStorage.length == 0 || localStorageList.length == 0) {
      checkSum.textContent = "You have no items yet"
   }
   else {
      window.totalCheckPrice = 0
      localStorageList.forEach(localStorageList => {
         window.totalCheckPrice = totalCheckPrice + localStorageList.price * localStorageList.quantity
      })
      checkSum.textContent = "Total: $" + window.totalCheckPrice.toFixed(2)
   }
}

const showCartItemCount = () => {
   window.totalItemCount = 0
   localStorageList.forEach(localStorageList => {
      window.totalItemCount = totalItemCount + Number(localStorageList.quantity)
   })
   cartItemCount.textContent = totalItemCount
}

const clearLocalStorage = () => {
   cartItemsConteiner.innerHTML = "";
   window.localStorageList = [];
   localStorage.clear();
}

shopcartIcon.addEventListener("click", () => {
   cartConteiner.style.display = "block"
   updateCartData()
});

closeButton.addEventListener("click", () => {
   cartConteiner.style.display = "none"
});

checkoutButton.addEventListener("click", () => {
   clearLocalStorage()
   showCartItemCount()
   checkSum.textContent = "You have no items yet"
})

renderShowcaseItems(productsData.slice(0, 3))
loadStoredCartData()