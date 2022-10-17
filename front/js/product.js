let id = null;

// Récupération de l'item via l'API avec son ID
async function getProduct(id) {
  const response = await fetch("http://localhost:3000/api/products/" + id);
  return response.json();
}

// Affichage de l'item
async function displayItem(id) {
  const product = await getProduct(id);
  const itemImg = document.getElementsByClassName("item__img");
  const optionColor = document.getElementById("colors");
  const itemTitle = document.getElementById("title");
  const itemPrice = document.getElementById("price");
  const itemDescription = document.getElementById("description");
  const img = document.createElement("img");
  const quantity = document.getElementById("quantity");

  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);
  quantity;
  itemTitle.innerHTML = product.name;
  itemPrice.innerHTML = product.price;
  itemDescription.innerHTML = product.description;
  itemImg[0].appendChild(img);

  product.colors.map((color) => {
    const newOption = document.createElement("option");
    newOption.setAttribute("value", color);
    newOption.innerHTML = color;
    optionColor.appendChild(newOption);
  });
}

// Vérification de la couleur et de la quantité
function checkInputs(color, quantity) {
  let res = true;
  if (!color.value) {
    color.setAttribute("style", "border-color: red; border-width: 2px");
    res = false;
  }
  if (Number(quantity.value) <= 0) {
    quantity.setAttribute("style", "border-color: red; border-width: 2px");
    res = false;
  }
  return res;
}

const adr = window.location.href;
const url = new URL(adr);
const search_params = new URLSearchParams(url.search);
if (search_params.has("id")) {
  id = search_params.get("id");
  displayItem(id);
}

const addToCart = document.getElementById("addToCart");
// Event pour l'ajout au panier
addToCart.addEventListener("click", (e) => {
  const quantity = document.getElementById("quantity");
  const color = document.getElementById("colors");
  color.setAttribute("style", "");
  quantity.setAttribute("style", "");
  if (!checkInputs(color, quantity)) return;
  const item = localStorage.getItem(id + color.value)?.split(",");
  if (!item) {
    localStorage.setItem(id + color.value, [id, quantity.value, color.value]);
  } else {
    localStorage.setItem(id + color.value, [
      id,
      Number(quantity.value) + Number(item[1]),
      color.value,
    ]);
  }

  addToCart.innerHTML = "Produit ajouté au panier";
  setTimeout(() => {
    addToCart.innerHTML = "Ajouter au panier";
  }, 500);
});
