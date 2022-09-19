const orderIdSpan = document.getElementById("orderId");
const adr = window.location.href;
const url = new URL(adr);
const search_params = new URLSearchParams(url.search);
if (search_params.has("orderId")) {
  const orderId = search_params.get("orderId");
  orderIdSpan.innerHTML = orderId;
}
