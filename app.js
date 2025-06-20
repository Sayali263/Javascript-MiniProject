// Sound effects
let clickSound = new Audio("sounds/click-47609.mp3");
let winSound = new Audio("sounds/success.mp3");
let drawSound = new Audio("sounds/draw.mp3");

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

const winPatterns = [
    [0,1,2], [0,3,6], [0,4,8],
    [3,4,5], [6,7,8],
    [1,4,7], [2,5,8], [2,4,6]
];

const resetGame = () => {
    turnO = true;
    enabledBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent double clicks

        clickSound.play();

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disabledBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enabledBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    winSound.play();
    msg.innerText = `🎉 CONGRATULATIONS! Winner is ${winner} 🏆`;
    msgContainer.classList.remove("hide");
    disabledBoxes();

    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });
};

const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 && val1 === val2 && val2 === val3) {
            showWinner(val1);
            winnerFound = true;
            return;
        }
    }

    if (!winnerFound && [...boxes].every(box => box.innerText !== "")) {
        drawSound.play();
        msg.innerText = `🤝 It's a draw! No one wins. Try again! 🔁`;
        msgContainer.classList.remove("hide");
        disabledBoxes();
    }
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
