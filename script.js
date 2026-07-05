const addOptionBtn = document.getElementById("add-option-btn");
const optionsContainer = document.getElementById("options-container");
const winnerEmoji = document.getElementById("winner-emoji");
const winnerMessage = document.getElementById("winner-message");
const winnerCard = document.querySelector(".winner-card");
const resetBtn = document.getElementById("reset-btn");

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

    optionInputs.forEach(input => {
    input.classList.remove("duplicate");
    });

    const options = [];

    optionInputs.forEach(input => {
    const value = input.value.trim();

    if (value !== "") {
        options.push(value);
    }
});

    const seen = new Set();
let hasDuplicate = false;

optionInputs.forEach(input => {
    const value = input.value.trim();

    if (value === "") return;

    if (seen.has(value)) {
        input.classList.add("duplicate");
        hasDuplicate = true;
    } else {
        seen.add(value);
    }
});

if (hasDuplicate) {
    result.textContent = "⚠ Duplicate options are not allowed!";
    decideBtn.disabled = false;
    decideBtn.textContent = "🎡 Decide";
    return;
}

    if (options.length === 0) {
    result.textContent = "⚠ Please enter at least one option!";
    decideBtn.disabled = false;
    decideBtn.textContent = "🎡 Decide";
    return;
}

if (options.length < 2) {
    result.textContent = "⚠ Please enter at least two options!";
    decideBtn.disabled = false;
    decideBtn.textContent = "🎡 Decide";
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

        const winner = options[randomIndex];

result.textContent = winner.toUpperCase();

winnerEmoji.textContent = "🎉";

winnerMessage.textContent = "Congratulations! Great choice! 💖";

confetti({
    particleCount: 80,
    angle: 60,
    spread: 70,
    origin: { x: 0 },
    colors: [
        "#ff4f9a",
        "#ff84c1",
        "#ffd6ea",
        "#ffffff"
    ]
});

confetti({
    particleCount: 80,
    angle: 120,
    spread: 70,
    origin: { x: 1 },
    colors: [
        "#ff4f9a",
        "#ff84c1",
        "#ffd6ea",
        "#ffffff"
    ]
});

winnerCard.classList.remove("pop", "winner-glow");

void winnerCard.offsetWidth;

winnerCard.classList.add("pop");
winnerCard.classList.add("winner-glow");

result.classList.remove("pop");

void result.offsetWidth;

result.classList.add("pop");

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

resetBtn.addEventListener("click", () => {

    document.getElementById("question").value = "";

    const rows = document.querySelectorAll(".option-row");

    rows.forEach((row, index) => {

        if(index !== 0){

            row.remove();

        }

    });

    document.querySelector(".option-input").value = "";

    document.querySelectorAll(".option-input").forEach(input=>{

        input.classList.remove("duplicate");

    });

    result.textContent = "No decision yet";

    winnerEmoji.textContent = "🎀";

    winnerMessage.textContent = "Your lucky choice will appear here!";

});