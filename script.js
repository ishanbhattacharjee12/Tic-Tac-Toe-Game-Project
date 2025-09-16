let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let winLine = document.querySelector(".win-line");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// coordinates for each pattern relative to .game
const lineData = {
  "0,1,2": { x: "5%", y: "16%", rot: 0, width: "90%" },
  "3,4,5": { x: "5%", y: "50%", rot: 0, width: "90%" },
  "6,7,8": { x: "5%", y: "84%", rot: 0, width: "90%" },
  "0,3,6": { x: "16%", y: "5%", rot: 90, width: "90%" },
  "1,4,7": { x: "50%", y: "5%", rot: 90, width: "90%" },
  "2,5,8": { x: "84%", y: "5%", rot: 90, width: "90%" },
  "0,4,8": { x: "5%", y: "5%", rot: 45, width: "127%" },
  "2,4,6": { x: "95%", y: "5%", rot: 135, width: "127%" },
};

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  winLine.style.opacity = 0;
  winLine.style.width = 0;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      box.classList.add("o"); // Added this line for 'O' color
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      box.classList.add("x"); // Added this line for 'X' color
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("x", "o"); // Also remove classes on reset
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // Show line animation
        let key = pattern.toString();
        let d = lineData[key];
        if (d) {
          winLine.style.top = d.y;
          winLine.style.left = d.x;
          winLine.style.transform = `rotate(${d.rot}deg)`;
          winLine.style.opacity = 1;
          requestAnimationFrame(() => {
            winLine.style.width = d.width;
          });
        }
        // Delay winner message
        setTimeout(() => {
          showWinner(pos1Val);
        }, 800); // wait for animation
        disableBoxes();
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);