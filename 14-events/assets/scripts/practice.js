const btn = document.querySelector("button");

const btnClickHandler = () => {
  alert("Clicked !");
};

// btn.addEventListener("click", btnClickHandler);

// setTimeout(() => {
//   btn.removeEventListener("click", btnClickHandler);
// }, 1000);

btn.addEventListener("click", () => {
  alert("Clicked!");
});

setTimeout(() => {
  btn.removeEventListener("click", () => {
    alert("Clicked!");
  });
}, 1000);
