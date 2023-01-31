import { productsData } from '../js/data.js';
import { cartItemsTemplate } from '../js/render.js';
import { shopItemsTemplate } from '../js/render.js';

const shopListConteiner = document.querySelector(".products-catalog");
const filteredPriceConteiner = document.querySelector(".cost-value");
const searchInput = document.querySelector(".input-filter");
const companySelect = document.querySelector(".list-article");
const priceRange = document.querySelector(".range-filter");
const filteringAlert = document.querySelector(".filter-alert");
const cartConteiner = document.querySelector(".sidebar-conteiner");
const cartItemsConteiner = document.querySelector(".sidebar-item-conteiner");
const shopcartIcon = document.querySelector(".shopcart-conteiner");
const closeButton = document.querySelector(".close-button");
const checkoutButton = document.querySelector(".checkout-button");
const checkSum = document.querySelector(".total-check-text");
const cartItemCount = document.querySelector(".item-count");

window.selectedCompany = "All";
window.rangeValue = "0";
searchInput.value = "";

const renderListItems = (dataArray) => {
   shopListConteiner.innerHTML = ""
   dataArray.forEach(productsData => {
      shopListConteiner.innerHTML += shopItemsTemplate(productsData);
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

const decreaseItemQuantity = (element) => {
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

const filterData = () => {
   window.filteredProductsData = productsData.filter((productsData) => {
      if (searchInput.value === "" && selectedCompany == "All") {
         return productsData.price > rangeValue;
      }
      else if (selectedCompany == "All") {
         return productsData.title.toString().toLowerCase().includes(searchInputResult) && productsData.price > rangeValue;
      }
      else if (searchInput.value === "") {
         return productsData.company == selectedCompany && productsData.price > rangeValue;
      }
      else {
         return productsData.company == selectedCompany && productsData.title.toString().toLowerCase().includes(searchInputResult) && productsData.price > rangeValue;
      }
   });
}

const getFilteredArray = () => {
   if (selectedCompany == "All" && searchInput.value === "") {
      filterData()
      renderListItems(filteredProductsData)
      filteredProductsData = productsData;
   }
   else {
      filterData()
      if (filteredProductsData.length === 0) {
         showAlert()
      }
      else {
         renderListItems(filteredProductsData)
         filteringAlert.style.display = "none";
      }
   }
};

const showAlert = () => {
   shopListConteiner.innerHTML = ""
   filteringAlert.textContent = "No matches found";
   filteringAlert.style.display = "block";
}

const debounce = (fn, ms) => {
   let timeout;
   return function () {
      const fnCall = () => { fn.apply(this, arguments) }
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms)
   };
}

const filterDebounce = debounce(getFilteredArray, 200)

searchInput.addEventListener("input", () => {
   filteringAlert.style.display = "none";
   window.searchInputResult = searchInput.value.toString().toLowerCase();
   filterDebounce(getFilteredArray);
});

companySelect.addEventListener("click", (listItem) => {
   filteringAlert.style.display = "none";
   window.selectedCompany = listItem.target.textContent;
   getFilteredArray();
});

priceRange.addEventListener("change", () => {
   filteringAlert.style.display = "none";
   window.rangeValue = Number(priceRange.value);
   filteredPriceConteiner.textContent = rangeValue + "$"
   getFilteredArray();
});

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

renderListItems(productsData)
loadStoredCartData()