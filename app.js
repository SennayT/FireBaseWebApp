const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

function renderCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;

  li.appendChild(name);
  li.appendChild(city);

  cafeList.appendChild(li);
}

db.collection("Cafes")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
      renderCafe(doc);
    });
  })
  .catch((err) => {
    console.log("Error occured");
    console.log(err);
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection("Cafes").add({
    name: form.name.value,
    city: form.city.value,
  });
});
