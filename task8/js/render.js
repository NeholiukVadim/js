export const shopItemsTemplate = (data) => {
   return `
   <div class="catalog-item">
      <div class="catalog-image-conteiner">
         <img src="${"../photos/" + data.photo}" class="product-image">
      </div>
      <p class="product-name">${data.title}</p>
      <p class="product-price">$${data.price}</p>
      <button class="cart-button">Add to the cart</button>
   </div>
   `
}

export const cartItemsTemplate = (data) => {
   return `<div class="sidebar-item">
               <div class="sidebar-image-conteiner">
                  <img src="${"../photos/" + data.photo}" class="sidebar-product-image">
               </div>
               <div class="sidebar-item-text">
                  <p class="sidebar-product-name">${data.title}</p>
                  <p class="sidebar-product-price">$${data.quantity * data.price}</p>
                  <p class="sidebar-remove-item">Remove</p>
               </div>
               <div class="quantity-conteiner">
                  <p class="arrow-up"></p>
                  <p class="item-quantity">${data.quantity}</p>
                  <p class="arrow-down"></p>
               </div>
            </div>`
}