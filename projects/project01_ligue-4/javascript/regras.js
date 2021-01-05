function callRegras() {
  var toggle = document
    .getElementById("container-rules-id")
    .classList.toggle("clicked");

  if (toggle) {
    document.getElementById("containerGame").style.display = "none";
    document.getElementById("header-logo").style.display = "none";
    document.getElementById("title").style.display = "none";
  } else {
    document.getElementById("containerGame").style.display = "block";
    document.getElementById("header-logo").style.display = "block";
    document.getElementById("title").style.display = "block";
  }
}

function closeRegras() {
  document.getElementById("container-rules-id").classList.remove("clicked");
  document.getElementById("containerGame").style.display = "flex";
  document.getElementById("header-logo").style.display = "block";
  document.getElementById("title").style.display = "block";
}
