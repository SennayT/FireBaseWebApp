const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

function renderCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "X";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  //Deleting data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("Cafes").doc(id).delete();
  });
}

//Add Listeners

db.collection("Cafes").onSnapshot((snapshot) => {
  let changes = snapshot.docChanges();
  changes.forEach((change) => {
    if (change.type === "added") {
      renderCafe(change.doc);
    } else if (change.type === "removed") {
      let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
      cafeList.removeChild(li);
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection("Cafes").add({
    name: form.name.value,
    city: form.city.value,
  });

  form.name.value = "";
  form.city.value = "";
});
