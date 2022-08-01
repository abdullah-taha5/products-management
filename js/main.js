let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");

let mood = "create";
let tmp;

// get total
function getTotal() {
  if (price.value !== null) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
  }
}

// create product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  // count
  if (
    title.value != "null" &&
    price.value != "" &&
    taxes.value != "" &&
    category.value != ""
  ) {
    if (mood === "create") {
      if (count.value > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
    }
  }
  // save local storage
  localStorage.setItem("product", JSON.stringify(dataPro));

  window.location.reload();
});

// read
function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td>
          <button
            type="button"
            class="btn btn-info text-light"
            id="update"
            onclick="updateData(${i})"
          >
            Update
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-danger" id="delete" onclick="deleteData(${i})">
            Delete
          </button>
        </td>
      </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDeleteAll = document.getElementById("delete-all");
  if (dataPro.length > 0) {
    btnDeleteAll.innerHTML = `<button type="button" class="btn btn-danger my-4 me-4" onClick="deleteAll()">
    Delete All ( ${dataPro.length} )
  </button>`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();

// delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
function deleteAll() {
  localStorage.clear("product");
  dataPro.splice(0);
  showData();
}

// update
function updateData(i) {
  (title.value = dataPro[i].title),
    (price.value = dataPro[i].price),
    (taxes.value = dataPro[i].taxes),
    (ads.value = dataPro[i].ads),
    (discount.value = dataPro[i].discount),
    (category.value = dataPro[i].category);
  getTotal();
  count.style.display = "none";
  submit.textContent = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "title";

function getSearchMood(id) {
  if (id == "search-title") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === "title") {
      if (dataPro[i].title.includes(value)) {
        table += `
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td>
          <button
            type="button"
            class="btn btn-info text-light"
            id="update"
            onclick="updateData(${i})"
          >
            Update
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-danger" id="delete" onclick="deleteData(${i})">
            Delete
          </button>
        </td>
      </tr>
        `;
      }
    } else {
      if (dataPro[i].category.includes(value)) {
        table += `
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td>
          <button
            type="button"
            class="btn btn-info text-light"
            id="update"
            onclick="updateData(${i})"
          >
            Update
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-danger" id="delete" onclick="deleteData(${i})">
            Delete
          </button>
        </td>
      </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// Scroll Top
scrollBtn = document.querySelector(".scroll-btn");
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("active");
  } else {
    scrollBtn.classList.remove("active");
  }
});
scrollBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
