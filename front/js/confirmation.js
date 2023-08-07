// Getting 'orderId' param
const parsedUrl = new URL(window.location.href);
const orderId = parsedUrl.searchParams.get('orderId') ?? false;
console.log(orderId);

if(orderId !== false) {
	// Inserting orderId
	document.getElementById('orderId').textContent = orderId;
	// Deleting products from cart
	localStorage.setItem('cart', JSON.stringify([]));
}
else {
	document.querySelector(".confirmation").textContent = "Erreur de traitement";
}
