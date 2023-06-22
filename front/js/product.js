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

	// Inserting product price

	// Inserting product image

	// Inserting product select / option

})
.catch(function(err) {
	console.log(err);
});
