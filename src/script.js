var selected_cat = "all";
var canadian_cities = [
  "Ottawa",
  "Edmonton",
  "Victoria",
  "Winnipeg",
  "Frederiction",
  "St. Johns",
  "Halifax",
  "Toronto",
  "Charlottetown",
  "Quebect City",
  "Regina",
  "Yelloknife",
  "Iqaluit",
  "Whitehorse",
];
/**Show Category selected */
function category(cat) {
  /***Select the based on the categories */
  let men_category = document.querySelectorAll(".men");
  let women_category = document.querySelectorAll(".women");
  /**Select all the items on display */
  let all_categories = document.querySelectorAll(".item_card");
  max_value = document.getElementById("max_price").value;
  min_value = document.getElementById("min_price").value;
  //Check which parameter was passed
  if (cat == "men") {
    selected_cat = "men";
    i = 0;
    lwc = women_category.length;
    for (i = 0; i < lwc; i++) {
      women_category[i].style.display = "none";
    }
    lmc = men_category.length;
    for (i = 0; i < lmc; i++) {
      price = men_category[i].querySelector(".price").innerHTML;
      price = Number(price);
      if (price > max_value || price < min_value) {
        men_category[i].style.display = "none";
      } else {
        men_category[i].style.display = "block";
      }
    }
  } else if (cat == "women") {
    selected_cat = "women";
    i = 0;
    lmc = men_category.length;
    for (i = 0; i < lmc; i++) {
      men_category[i].style.display = "none";
    }
    lwc = women_category.length;
    for (i = 0; i < lwc; i++) {
      price = women_category[i].querySelector(".price").innerHTML;
      price = Number(price);
      if (price > max_value || price < min_value) {
        women_category[i].style.display = "none";
      } else {
        women_category[i].style.display = "block";
      }
    }
  } else {
    selected_cat = "all";
    i = 0;
    ac = all_categories.length;
    for (i = 0; i < ac; i++) {
      price = all_categories[i].querySelector(".price").innerHTML;
      price = Number(price);
      if (price > max_value || price < min_value) {
        all_categories[i].style.display = "none";
      } else {
        all_categories[i].style.display = "block";
      }
    }
  }
}
/** Event listener to click, then scrolls to target section */
function scrollToView(e) {
  e.preventDefault();
  const href = this.getAttribute("href");

  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
}

function priceFilter() {
  i = 0;

  if (selected_cat == "men") {
    let men_category = document.querySelectorAll(".men");
    lmc = men_category.length;

    max_value = document.getElementById("max_price").value;
    min_value = document.getElementById("min_price").value;
    for (i = 0; i < lmc; i++) {
      price = men_category[i].querySelector(".price").innerHTML;
      price = Number(price);
      if (price > max_value || price < min_value) {
        men_category[i].style.display = "none";
      } else {
        men_category[i].style.display = "block";
      }
    }
  } else if (selected_cat == "women") {
    let women_category = document.querySelectorAll(".women");
    lwc = women_category.length;
    max_value = document.getElementById("max_price").value;
    min_value = document.getElementById("min_price").value;
    for (i = 0; i < lwc; i++) {
      price = women_category[i].querySelector(".price").innerHTML;
      price = Number(price);
      if (price > max_value || price < min_value) {
        women_category[i].style.display = "none";
      } else {
        women_category[i].style.display = "block";
      }
    }
  } else {
    let all_categories = document.querySelectorAll(".item_card");
    ac = all_categories.length;

    max_value = document.getElementById("max_price").value;
    min_value = document.getElementById("min_price").value;
    for (i = 0; i < ac; i++) {
      price = all_categories[i].querySelector(".price").innerHTML;
      price = Number(price);
      if (price > max_value || price < min_value) {
        all_categories[i].style.display = "none";
      } else {
        all_categories[i].style.display = "block";
      }
    }
  }
}
function isHidden(el) {
  return el.offsetParent === null;
}

/***Autocomplete */
/*execute a function when someone writes in the text field:*/
function autocomplete(inp, cities_arr) {
  var cf;
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    closeLists();
    if (!val) {
      return false;
    }
    cf = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < cities_arr.length; i++) {
      if (
        cities_arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
      ) {
        b = document.createElement("DIV");
        b.innerHTML =
          "<strong>" + cities_arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += cities_arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + cities_arr[i] + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      cf++;
      addActive(x);
    } else if (e.keyCode == 38) {
      cf--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (cf > -1) {
        if (x) x[cf].click();
      }
    }
  });
  /* classify an item as "active":*/
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (cf >= x.length) cf = 0;
    if (cf < 0) cf = x.length - 1;
    x[cf].classList.add("autocomplete-active");
  }
  /*a function to remove the "active" class from all autocomplete items:*/
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
  function closeLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeLists(e.target);
  });
}

function postRegex() {
  postalCode = document.getElementById("postal_code").value;
  if (!postalCode) {
    alert("Incorrect PostalCode");
    return null;
  }

  postalCode = postalCode.toString().trim();
  var regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

  if (regex.test(postalCode.toString().replace(/\W+/g, ""))) {
    return postalCode;
  }
  alert("Incorrect PostalCode");
  return null;
}
