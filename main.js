function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
function power(a, b) {
  return a ** b;
}
function mod(a, b) {
  console.log("mod func", a % b);
  return a % b;
}
function abs(a) {
  if (a < 0) {
    return -1 * a;
  }
  return a;
}
function changeSign(a) {
  console.log("Change Sign func:", -1 * a);
  return `${-1 * a}`;
}
function operate(a, operation, b = "") {
  switch (operation) {
    case "+":
      return add(+a, +b);
    case "-":
      return subtract(+a, +b);
    case "*":
      return multiply(+a, +b);
    case "/":
      return divide(+a, +b);
    case "pow":
      return power(+a, +b);
    case "mod":
      return mod(+a, +b);
    case "abs":
      return abs(+a);
    case "+/-":
      return changeSign(+a);
    default:
      return "Invalid Operation";
  }
}

const display = document.querySelector(".display");
const wholeDigits = document.querySelector(".whole-digits");
const topSplDigits = document.querySelector(".top-special-digits");
const splDigits = document.querySelector(".special-digits");
const operators = document.querySelector(".operations");
let isDotPresent = false;
let a,
  b = "",
  operator = "";

topSplDigits.addEventListener("click", (e) => {
  if (e?.target?.value === "mod") {
    console.log("Top digit clicked", e.target.value);
    {
      if (b === "" && (!operator || operator === "")) {
        a = `${+display.textContent}`;
        operator = e.target.value;
        isDotPresent = false;
      } else if (b === "" && operator) {
        operator = e.target.value;
      } else if (+b !== 0 && b !== "") {
        a = operate(a, operator, b);
        b = "";
        operator = e.target.value;
        isDotPresent = false;
      }
      display.textContent = a + " " + operator;
    }
  }
  if (e?.target?.value === "clear") {
    a = "";
    operator = "";
    b = "";
    display.textContent = "";
  }
  if (e?.target?.value === "backspace") {
    if (a !== "" && operator === "") {
      console.log("a to be removed");
      a = a.slice(0, a.length - 1);
      display.textContent = a;
    } else if (a !== "" && operator !== "" && b !== "") {
      console.log("b to be removed");
      b = b.slice(0, b.length - 1);
      display.textContent = b;
    }
  }
});
wholeDigits.addEventListener("click", (e) => {
  if (a === "" || operator === "") {
    if (display.textContent === "0") {
      display.textContent = e?.target?.value || "0";
      a = `${+display.textContent}`;
    } else if (
      display.textContent === "Invalid Operation: You are reaching infinity!!"
    ) {
      display.textContent = e?.target?.value || "0";
      display.style.height = "18%";
      a = `${+display.textContent}`;
    } else {
      display.textContent += e?.target?.value || "";
      a = `${+display.textContent}`;
    }
    document.body.style.backgroundImage = "none";
  }
  if (a !== "" && operator !== "") {
    if (b === "0") {
      b = e?.target?.value || "0";
    } else {
      b += e?.target?.value || "";
    }
    display.textContent = " " + b;
  }
});

splDigits.addEventListener("click", (e) => {
  if (a === "" || operator === "") {
    if (
      e.target.value === "0" &&
      (+display.textContent !== 0 || display.textContent === "")
    ) {
      display.textContent += "0";
    }
    if (e.target.value === "+/-" && +display.textContent !== 0) {
      display.textContent = `${operate(+display.textContent, "+/-")}`;
    }
    if (e.target.value === "abs" && +display.textContent !== 0) {
      display.textContent = `${operate(+display.textContent, "abs")}`;
    }
    if (e.target.value === "." && isDotPresent === false) {
      if (display.textContent === "") {
        display.textContent = "0.";
        isDotPresent = true;
      } else if (+display.textContent % 1 === 0) {
        display.textContent += ".";
        isDotPresent = true;
      } else if (+display.textContent % 1 !== 0) {
        isDotPresent = true;
      }
    }
    console.log("display has as a:", +display.textContent);
  }
  if (a !== "" && operator !== "") {
    if (e.target.value === "0" && (+b !== 0 || b === "")) {
      b += "0";
    }
    if (e.target.value === "+/-" && (+b !== 0 || b !== "")) {
      b = `${operate(+b, "+/-")}`;
    }
    if (e.target.value === "abs" && (+b !== 0 || b !== "")) {
      b = `${operate(+b, "abs")}`;
    }
    if (e.target.value === "." && isDotPresent === false) {
      if (b === "") {
        b = "0.";
        isDotPresent = true;
      } else if (+b % 1 === 0) {
        b += ".";
        isDotPresent = true;
      } else {
        isDotPresent = true;
      }
    }
    display.textContent = a + " " + operator + " " + b;
    console.log("display has as b:", b);
  }
});

operators.addEventListener("click", (e) => {
  if (
    e?.target?.value === "+" ||
    e?.target?.value === "-" ||
    e?.target?.value === "*" ||
    e?.target?.value === "/" ||
    e?.target?.value === "pow"
  ) {
    if (b === "" && (!operator || operator === "")) {
      operator = e.target.value;
      isDotPresent = false;
      display.textContent = a + " " + operator;
    } else if (b === "" && operator) {
      operator = e.target.value;
      display.textContent = a + " " + operator;
    } else if (b !== "") {
      console.log(`b and operator are ${b} and ${operator}`);
      if (+b === 0 && operator === "/") {
        a = "";
        operator = "";
        console.log("Inside infinty");
        display.textContent = "Invalid Operation: You are reaching infinity!!";
        display.style.height = "30%";
        document.body.style.backgroundImage = "url('./public/universe.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      } else {
        a = operate(a, operator, b);
        operator = e.target.value;
        display.textContent = a + " " + operator;
      }
      b = "";
      isDotPresent = false;
    }
  }
  if (e?.target?.value === "=" && b !== "") {
    if (+b === 0 && operator === "/") {
      a = "";
      display.textContent = "Invalid Operation: You are reaching infinity!!";
      display.style.height = "30%";
      document.body.style.backgroundImage = "url('./public/universe.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    } else {
      a = operate(a, operator, b);
      display.textContent = a;
    }
    operator = "";
    b = "";
    isDotPresent = false;
  }
});
