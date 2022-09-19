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

  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);
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

const adr = window.location.href;
const url = new URL(adr);
const search_params = new URLSearchParams(url.search);
if (search_params.has("id")) {
  id = search_params.get("id");
  displayItem(id);
}

const addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", () => {
  const quantity = document.getElementById("quantity");
  const color = document.getElementById("colors");
  if (!color.value || quantity.value === "0") {
    console.log("error, color or quantity invalid");
    return;
  }
  const item = localStorage.getItem(id + color.value)?.split(",");
  console.log(item);
  if (!item) {
    localStorage.setItem(id + color.value, [id, quantity.value, color.value]);
  } else {
    localStorage.setItem(id + color.value, [
      id,
      Number(quantity.value) + Number(item[1]),
      color.value,
    ]);
  }
  document.location.href =
    "http://127.0.0.1:5500/P5-Dev-Web-Kanap/front/html/cart.html";
});
