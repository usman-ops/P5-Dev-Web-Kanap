const parsedUrl = new URL(window.location.href);
console.log(parsedUrl.searchParams.get('id')); // "123"
fetch("http://localhost:3000/api/products/"+parsedUrl.searchParams.get('id'))
    .then(function (res) {
      if (res.ok) {
        
        return res.json();
      }
    }).then(function (value) {
        console.log(value)})
console.log("bonjour")