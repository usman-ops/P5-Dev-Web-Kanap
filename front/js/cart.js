// Getting cart data from LocalStorage
let lsCart = localStorage.getItem("cart");

// JSON.parse data
let cart = JSON.parse(lsCart) ?? [];

// Looping on each cartItem existing in cart
for(let i = 0; i < cart.length; i++) {
	let cartItem = cart[i];
	// Fetching data from API
	fetch("http://localhost:3000/api/products/"+cartItem.productId)
	.then(function(res){
		if(res.ok){
			return res.json();
		}
	})
	.then(function(json) {
		let product = json;

		console.log(cartItem);
		console.log(product);

		// Creating article
		let article = document.createElement("article");
		article.setAttribute('data-id', product._id);
		article.setAttribute('data-color', cartItem.productColor);
		article.setAttribute('class', "cart__item");
		let cartItems = document.getElementById("cart__items");
		cartItems.append(article);

		// Creating div.cart__item__img
		let divCartItemImg = document.createElement("div");
		divCartItemImg.setAttribute('class', "cart__item__img");
		article.append(divCartItemImg);

		// Creating img
		let img = document.createElement("img");
		img.src = product.imageUrl;
		img.alt = product.altTxt;
		divCartItemImg.append(img);

		// Creating div.cart__item__content
		let divCartItemContent = document.createElement("div");
		divCartItemContent.setAttribute('class', "cart__item__content");
		article.append(divCartItemContent);

		// Creating div.cart__item__content__description
		let divCartItemContentDescription = document.createElement("div");
		divCartItemContentDescription.setAttribute('class', "cart__item__content__description");
		divCartItemContent.append(divCartItemContentDescription);

		// Creating h2
		let h2 = document.createElement("h2");
		h2.textContent = product.name;
		divCartItemContentDescription.appendChild(h2);

		// Creating pColor
		let pColor = document.createElement("p");
		pColor.textContent = cartItem.productColor;
		divCartItemContentDescription.appendChild(pColor);

		// Creating pPrice
		let pPrice = document.createElement("p");
		pPrice.textContent = product.price + " €";
		divCartItemContentDescription.appendChild(pPrice);

		// Creating div.cart__item__content__settings
		let divCartItemContentSettings = document.createElement("div");
		divCartItemContentSettings.setAttribute('class', "cart__item__content__settings");
		divCartItemContent.append(divCartItemContentSettings);

		// Creating div.cart__item__content__settings__quantity
		let divCartItemContentSettingsQuantity = document.createElement("div");
		divCartItemContentSettingsQuantity.setAttribute('class', "cart__item__content__settings__quantity");
		divCartItemContentSettings.append(divCartItemContentSettingsQuantity);

		// Creating pQty
		let pQty = document.createElement("p");
		pQty.textContent = "Qté : ";
		divCartItemContentSettingsQuantity.appendChild(pQty);

		// Creating itemQuantity
		let inputItemQuantity = document.createElement("input");
		inputItemQuantity.setAttribute("type", "number");
		inputItemQuantity.setAttribute("class", "itemQuantity");
		inputItemQuantity.setAttribute("name", "itemQuantity");
		inputItemQuantity.setAttribute("min", "1");
		inputItemQuantity.setAttribute("max", "100");
		inputItemQuantity.setAttribute("value", cartItem.productQuantity);
		divCartItemContentSettingsQuantity.appendChild(inputItemQuantity);

		// Adding p.deleteItem 'click' detection
		inputItemQuantity.addEventListener('input', function(event) {
			console.log('inputItemQuantity inputed');
			// @todo
			// @todo
			// @todo
		});

		// Creating div.cart__item__content__settings__delete
		let divCartItemContentSettingsDelete = document.createElement("div");
		divCartItemContentSettingsDelete.setAttribute('class', "cart__item__content__settings__delete");
		divCartItemContentSettings.append(divCartItemContentSettingsDelete);

		// Creating p.deleteItem
		let pDeleteItem = document.createElement("p");
		pDeleteItem.textContent = "Supprimer";
		pDeleteItem.setAttribute("class", "deleteItem");
		divCartItemContentSettingsDelete.appendChild(pDeleteItem);

		// Adding p.deleteItem 'click' detection
		pDeleteItem.addEventListener('click', function(event) {
			console.log('deleteItem clicked');
			// @todo
			// @todo
			// @todo
		});
	})
	.catch(function(err){
		console.log(err);
	})
}