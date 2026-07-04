const addOptionBtn = document.getElementById("add-option-btn");
const optionsContainer = document.getElementById("options-container");

addOptionBtn.addEventListener("click", () => {

    const input = document.createElement("input");

    input.type = "text";
    input.className = "option-input";
    input.placeholder = "Enter an option";

    optionsContainer.appendChild(input);

});