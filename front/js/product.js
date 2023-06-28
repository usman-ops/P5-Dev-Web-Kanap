// Getting 'id' param
const parsedUrl = new URL(window.location.href);
const id = parsedUrl.searchParams.get('id');
console.log(id);

// Fetching product data
fetch("http://localhost:3000/api/products/"+id)
.then(function (res) {
	if(res.ok) {
		return res.json();
	}
})
.then(function(json) {
	const product = json;
	console.log(product);

	// Inserting product title
	document.getElementById('title').textContent = product.name;

	// Inserting product description
  document.getElementById('description').textContent = product.description;
	// Inserting product price
  document.getElementById('price').textContent = product.price;
	// Inserting product image
 /****let urlimage = document.querySelector('.item__img');
  urlimage.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;****/

  let img = document.createElement('img');
  img.src = product.imageUrl;
  img.alt = product.altTxt;
  let parent = document.querySelector('.item__img');
  parent.append(img);

	// Inserting product select / option
	function changeColors (colors) {
		
		let select = document.querySelector('#colors');
		
		for (let i = 0; i < colors.length ; i++) {
		  let option = document.createElement('option');
			option.value = colors[i];
			option.textContent = colors[i];
			select.append(option);}
		}
		//addEventListener to change

		document.querySelector('#quantity').addEventListener('input','modifyquantity');
	// choicequantity

	function changeQuantity() {
		let quantity = document.querySelector('#quantity').value;
		if (quantity != null) {
			if (quantity < 0) document.querySelector('#quantity').value = 0 ;
			if (quantity > 100) document.querySelector('#quantity').value = 100;
		}
	}
})

.catch(function(err) {
	console.log(err);
});
