const toggleBtn = document.querySelectorAll("input");
const prevOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const deleteBtn = document.querySelector("[data-delete]");
const resultBtn = document.querySelector("[data-output]");
const resetBtn = document.querySelector("[data-reset]");
const operands = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");
let prevOperand = prevOperandText.innerText;
let currentOperand = currentOperandText.innerText;
let operation;
// const theme2 = document.getElementById("theme2");
// import theme2 from "./css/theme2.css";

const themeChange = (tmemeselect) => {
  const link = document.getElementsByTagName("link");
  console.log(link);
  if (tmemeselect === "theme1") {
    link[0].href = "./css/style.css";
  } else if (tmemeselect === "theme2") {
    link[0].href = "./css/theme1.css";
  } else if (tmemeselect === "theme3") {
    link[0].href = "./css/theme2.css";
  }
};

const reset = () => {
  prevOperand = "";
  currentOperand = "";
  operation = undefined;
};

function deleteOperand() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

function addNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
}

function operationSelection(operate) {
  if (currentOperandText === "") return;
  if (prevOperandText !== "") {
    calculatorOperation();
  }
  operation = operate;
  prevOperand = currentOperand;
  currentOperand = "";
}

function calculatorOperation() {
  let result;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;

    case "-":
      result = prev - current;
      break;

    case "×":
      result = prev * current;
      break;

    case "/":
      result = prev / current;
      break;

    default:
      return;
  }
  currentOperand = result;
  operation = undefined;
  prevOperand = "";
  prevOperandText.innerText = "";
}

function displayNum() {
  currentOperandText.innerText = currentOperand.toLocaleString("en");
  if (operation !== undefined) {
    prevOperandText.innerText = `${prevOperand} ${operation.toString("en")}`;
  } else {
    prevOperandText.innerText = prevOperand;
  }
}

// toggleBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     themeChange(btn.value);
//   });
// });

resetBtn.addEventListener("click", () => {
  reset();
  displayNum();
});

deleteBtn.addEventListener("click", () => {
  deleteOperand();
  displayNum();
});

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    addNumber(operand.innerText);
    displayNum();
  });
});

operatorBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    operationSelection(btn.innerText);
    displayNum();
  });
});

resultBtn.addEventListener("click", () => {
  calculatorOperation();
  displayNum();
});
