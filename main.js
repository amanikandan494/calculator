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
  return a % b;
}
function abs(a) {
  if (a < 0) {
    return -1 * a;
  }
  return a;
}
function changeSign(a) {
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
const numButtons = document.querySelectorAll(".number-digits button");
const opButtons = document.querySelectorAll(".operations button");
const wholeDigits = document.querySelector(".whole-digits");
const topSplDigits = document.querySelector(".top-special-digits");
const splDigits = document.querySelector(".special-digits");
const operators = document.querySelector(".operations");
let isDotPresent = false;
let a = "",
  b = "",
  operator = "";

numButtons.forEach((btn) => {
  btn.addEventListener("mouseenter", (e) => {
    e.target.style.backgroundColor = "black";
    e.target.style.color = "rgb(245, 245, 245)";
    e.target.style.boxShadow = "3px 3px 1px rgb(92, 92, 92)";
    e.target.style.border = "1px solid grey";
  });
  btn.addEventListener("mouseleave", (e) => {
    e.target.style.backgroundColor = "rgb(245, 245, 245)";
    e.target.style.color = "black";
    e.target.style.boxShadow = "0px 0px 0px 0px";
    e.target.style.border = "10px solid grey";
  });
});

opButtons.forEach((btn) => {
  btn.addEventListener("mouseenter", (e) => {
    e.target.style.height = "20%";
    e.target.style.width = "110%";
    e.target.style.backgroundColor = "rgb(245, 245, 245)";
    e.target.style.color = "rgb(250, 34, 34)";
  });
  btn.addEventListener("mouseleave", (e) => {
    e.target.style.height = "16.67%";
    e.target.style.width = "100%";
    e.target.style.backgroundColor = "rgb(250, 34, 34)";
    e.target.style.color = "rgb(245, 245, 245)";
  });
});

topSplDigits.addEventListener("click", (e) => {
  if (e?.target?.value === "mod") {
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
      a = a.slice(0, a.length - 1);
      display.textContent = a;
    } else if (a !== "" && operator !== "" && b !== "") {
      b = b.slice(0, b.length - 1);
      display.textContent = b;
    }
  }
});
wholeDigits.addEventListener("click", (e) => {
  if (
    display.textContent === "Invalid Operation: You are reaching infinity!!"
  ) {
    display.style.height = "18%";
    document.body.style.backgroundImage = "none";
    a = e?.target?.value;
    display.textContent = a;
  }
  if (a !== "" && operator !== "") {
    if (+b === 0) {
      b = e?.target?.value || "0";
    } else {
      b += e?.target?.value || "";
    }
    display.textContent = " " + b;
  }
  if (a !== "" && operator === "") {
    if (+a === 0) {
      a = e?.target?.value;
    } else {
      a += e?.target?.value;
    }
    display.textContent = a;
  } else if (a === "" && operator === "") {
    a = e?.target?.value;
    display.textContent = a;
  }
});

splDigits.addEventListener("click", (e) => {
  if (a !== "" && operator === "") {
    if (e.target.value === "0" && +a !== 0) {
      a += "0";
    }
    if (e.target.value === "+/-" && +a !== 0) {
      a = `${operate(+a, "+/-")}`;
    }
    if (e.target.value === "abs" && +a !== 0) {
      a = `${operate(+a, "abs")}`;
    }
    display.textContent = a;
  }
  if (e?.target?.value === "." && isDotPresent === false) {
    if (a === "" && operator === "") {
      a += "0.";
      isDotPresent = true;
    } else if (+a % 1 === 0 && operator === "") {
      a += e?.target?.value;
      isDotPresent = true;
    } else if (+a % 1 !== 0 && operator === "") {
      isDotPresent = true;
    }
    display.textContent = a;
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
    display.textContent = " " + b;
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
    if (b === "" && operator === "") {
      operator = e.target.value;
      isDotPresent = false;
      display.textContent = a + " " + operator;
    } else if (b === "" && operator !== "") {
      operator = e.target.value;
      display.textContent = a + " " + operator;
    } else if (b !== "") {
      if (+b === 0 && operator === "/") {
        a = "";
        operator = "";
        isDotPresent = false;
        display.textContent = "Invalid Operation: You are reaching infinity!!";
        display.style.height = "30%";
        document.body.style.backgroundImage = "url('./public/universe.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      } else {
        a = operate(a, operator, b);
        operator = e.target.value;
        display.textContent = a + " " + operator;
        isDotPresent = +a % 1 === 0 ? false : true;
      }
      b = "";
    }
  }
  if (e?.target?.value === "=" && b !== "") {
    if (+b === 0 && operator === "/") {
      a = "";
      isDotPresent = false;
      display.textContent = "Invalid Operation: You are reaching infinity!!";
      display.style.height = "30%";
      document.body.style.backgroundImage = "url('./public/universe.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    } else {
      a = operate(a, operator, b);
      display.textContent = a;
      isDotPresent = +a % 1 === 0 ? false : true;
    }
    operator = "";
    b = "";
  }
});
