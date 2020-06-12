const addBtn = document.querySelector("#add");
const subBtn = document.querySelector("#sub");
const inp1 = document.querySelector("#inp1");
const inp2 = document.querySelector("#inp2");
const result = document.querySelector("#result");

function getInputValues() {
    return [...(document.querySelectorAll("input"))]
        .map(el => Number(el.value));
}

function addHandler() {
    const [value1, value2] = getInputValues();
    result.innerHTML = (value1 + value2);
    result.closest(".result-container").style.display = "block";

}
addBtn.addEventListener("click", addHandler);

function subHandler() {}
subBtn.addEventListener("click", subHandler);