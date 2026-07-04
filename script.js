const addOptionBtn = document.getElementById("add-option-btn");
const optionsContainer = document.getElementById("options-container");


function attachRemoveFunction(button) {
    button.addEventListener("click", () => {

        if (optionsContainer.children.length > 1) {
            button.parentElement.remove();
        }

    });
}

attachRemoveFunction(document.querySelector(".remove-btn"));

attachEnterKey(document.querySelector(".option-input"));


addOptionBtn.addEventListener("click", () => {

    const optionRow = document.createElement("div");
    optionRow.className = "option-row";

    optionRow.innerHTML = `
        <input
            type="text"
            class="option-input"
            placeholder="Enter an option">

        <button class="remove-btn">✖</button>
    `;

    optionsContainer.appendChild(optionRow);

    attachRemoveFunction(optionRow.querySelector(".remove-btn"));

    attachEnterKey(optionRow.querySelector(".option-input"));

});

const decideBtn = document.getElementById("decide-btn");
const result = document.getElementById("result");

decideBtn.addEventListener("click", () => {

    decideBtn.disabled = true;
    decideBtn.textContent = "Choosing...";

    const optionInputs = document.querySelectorAll(".option-input");

    const options = [];

    optionInputs.forEach(input => {
        const value = input.value.trim();

        if (value !== "") {
            options.push(value);
        }
    });

    if (options.length === 0) {
        result.textContent = "Please enter at least one option!";
        return;
    }

    const randomIndex = Math.floor(Math.random() * options.length);

    let count = 0;

const shuffle = setInterval(() => {

    const randomOption = options[Math.floor(Math.random() * options.length)];

    result.textContent = randomOption;

    count++;

    if (count >= 20) {

        clearInterval(shuffle);

        result.textContent = options[randomIndex];

        decideBtn.disabled = false;
        decideBtn.textContent = "🎡 Decide";

         }

    }, 100);

});

function attachEnterKey(input) {

    input.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            e.preventDefault();

            addOptionBtn.click();

            const inputs = document.querySelectorAll(".option-input");

            inputs[inputs.length - 1].focus();

        }

    });

}