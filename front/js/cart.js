// Getting cart data from LocalStorage
let lsCart = localStorage.getItem("cart");

// JSON.parse data
let cart = JSON.parse(lsCart) ?? [];

// Checking if cart is empty
if(cart.length === 0) {
	document.querySelector(".cart").textContent = "Pas de produit dans votre panier";
}
else {
	// Looping on each cartItem existing in cart to compute total quantity
	let divTotalQty = document.getElementById('totalQuantity');
	let totalQty = 0;

	// Looping on each cartItem existing in cart to compute total price
	let divTotalPrice = document.getElementById('totalPrice');
	let totalPrice = 0;

	// Looping on each cartItem existing in cart to display products in HTML
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

			//console.log(cartItem);
			//console.log(product);

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

			// Adding p.inputItemQuantity 'click' detection
			inputItemQuantity.addEventListener('input', function(event) {
				// Finding the product that need to be deleted in the localstorage / array
				let index = cart.findIndex(item => (product._id == item.productId));
				// If Found
				if(index !== -1) {
					// Updating quantity in the array item containing the product
					cart[index].productQuantity = Number(inputItemQuantity.value);
				}
				// Saving updated cart into LocalStorage
				localStorage.setItem('cart', JSON.stringify(cart));
				// Refreshing the webpage to display the updated cart
				window.location.reload();
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
				// Finding the product that need to be deleted in the localstorage / array
				let index = cart.findIndex(item => (product._id == item.productId));
				// If Found
				if(index !== -1) {
					// Deleting the array item containing the product
					cart.splice(index, 1);
				}
				// Saving updated cart into LocalStorage
				localStorage.setItem('cart', JSON.stringify(cart));
				// Refreshing the webpage to display the updated cart
				window.location.reload();
			});

			// Looping on each cartItem existing in cart to compute total quantity
			totalQty += parseInt(cart[i].productQuantity);
			divTotalQty.textContent = parseInt(totalQty);
			console.log(totalQty);

			// Looping on each cartItem existing in cart to compute total price
			totalPrice += parseInt(product.price) * parseInt(cart[i].productQuantity);
			divTotalPrice.textContent = parseInt(totalPrice);
			console.log(totalPrice);
		})
		.catch(function(err){
			console.log(err);
		})
	}

	// Detecting 'submit' event of the order form
	document.querySelector('.cart__order__form').addEventListener('submit', function(event) {

		// Stopping native form submit execution
		event.preventDefault();

		// Is Form valid ?
		let isFormValid = true;

		// Gathering form data
		let contact = {};
		contact.firstName = document.getElementById('firstName').value;
		contact.lastName = document.getElementById('lastName').value;
		contact.address = document.getElementById('address').value;
		contact.city = document.getElementById('city').value;
		contact.email = document.getElementById('email').value;

		// Gathering products Array
		let productsIds = [];

		// Getting cart data from LocalStorage
		let lsCart = localStorage.getItem("cart");
		// JSON.parse data
		let cart = JSON.parse(lsCart) ?? [];
		for(let i = 0; i < cart.length; i++) {
			productsIds.push(cart[i].productId);
		}
		console.log(productsIds);

		// Checking firstName
		let firstName = contact.firstName;
		let inputFirstName = document.querySelector("#firstName");
		if(/^[-a-zA-ZÀ-ÿ' ]+$/.test(firstName)) {
			inputFirstName.style.border = "solid 2px green";
			document.querySelector("#firstNameErrorMsg").textContent = "";
		}
		else {
			isFormValid = false;
			inputFirstName.style.border = "solid 2px red";
			document.querySelector("#firstNameErrorMsg").textContent = " invalide";
		}

		// Checking lastName
		let lastName = contact.lastName;
		let inputLastName = document.querySelector("#lastName");
		if(/^[-a-zA-ZÀ-ÿ' ]+$/.test(lastName)) {
			inputLastName.style.border = "solid 2px green";
			document.querySelector("#lastNameErrorMsg").textContent = "";
		}
		else {
			isFormValid = false;
			inputLastName.style.border = "solid 2px red";
			document.querySelector("#lastNameErrorMsg").textContent = "Merci de corriger ce champ";
		}

		// Checking address
		let address = contact.address;
		let inputAddress = document.querySelector("#address");
		if(/^[-0-9a-zA-ZÀ-ÿ' ]+$/.test(address)) {
			inputAddress.style.border = "solid 2px green";
			document.querySelector("#addressErrorMsg").textContent = "";
		}
		else {
			isFormValid = false;
			inputAddress.style.border = "solid 2px red";
			document.querySelector("#addressErrorMsg").textContent = " invalide";
		}

		// Checking city
		let city = contact.city;
		let inputCity = document.querySelector("#city");
		if(/^[-a-zA-ZÀ-ÿ' ]+$/.test(city)) {
			inputCity.style.border = "solid 2px green";
			document.querySelector("#cityErrorMsg").textContent = "";
		}
		else {
			isFormValid = false;
			inputCity.style.border = "solid 2px red";
			document.querySelector("#cityErrorMsg").textContent = "Merci de corriger ce champ";
		}

		// Checking email
		let email = contact.email;
		let inputEmail = document.querySelector("#email");
		if(/^[-a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]+$/.test(email)) {
			inputEmail.style.border = "solid 2px green";
			document.querySelector("#emailErrorMsg").textContent = "";
		}
		else {
			isFormValid = false;
			inputEmail.style.border = "solid 2px red";
			document.querySelector("#emailErrorMsg").textContent = "Merci de corriger ce champ";
		}

		// Checking if Form is valid
		if(isFormValid === true) {
			// Sending the data to the backend
			fetch("http://localhost:3000/api/products/order", {
				method: "POST",
				body: JSON.stringify({
					contact: contact,
					products: productsIds,
				}),
				headers: {
					Accept: "application/json",
					"content-Type": "application/json",
				},
			})
			.then(function (res) {
				if(res.ok) {
					return res.json();
				}
			})
			.then(function(response) {
				if(response == undefined || response.orderId == undefined) {
					alert("Une erreur s'est produite, merci de ré-essayer plus tard.");
				}
				else {
					let orderId = response.orderId;
					window.location.href = 'confirmation.html?orderId=' + orderId;
				}
			})
			.catch(function(err) {
				console.log(err);
				alert("Une erreur s'est produite, merci de ré-essayer plus tard.");
			});
		}
	});
}
