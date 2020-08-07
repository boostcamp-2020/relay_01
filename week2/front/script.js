window.onload = init();

function init() {
  let inputValue = "";
  let input = document.getElementById("input-mood");
  let button = document.getElementById("search-mood");
  let api = new API();

  button.addEventListener("click", async (e) => {
    inputValue = input.value;
    try {
      let adam = await api.getAdam(inputValue);
      console.log(adam.data);
    } catch (e) {
      console.log(e);
    }
  });
}
