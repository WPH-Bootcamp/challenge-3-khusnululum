// 6. Code Readability & `'use strict'`
"use strict";

// Input & Output setup (Node readline)
const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

// 1. User Input Handling
async function getValidNumberInput(promptMessage) {
  while (true) {
    const raw = await ask(promptMessage);
    const num = Number(raw);
    if (!isNaN(num)) return num;
    console.log("Input tidak valid! Masukkan angka yang benar.\n");
  }
}

async function getValidOperatorInput(promptMessage) {
  const valid = new Set(["+", "-", "", "/", "%", "*", "**"]);
  while (true) {
    const op = (await ask(promptMessage)).trim();
    if (valid.has(op)) return op;
    console.log("Operator tidak valid. Pilih salah satu: +  -  *  /  %  **\n");
  }
}

// 2. Basic Arithmetic Operation (Functions and Operators)
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
  return b === 0 ? "Error: Division by zero!!" : a / b;
}
function modulo(a, b) {
  return b === 0 ? "Error: Division by zero!!" : a % b;
}
function power(a, b) {
  return a ** b;
}

// 4. Data Type Analysis & Conditional Output
function analyzeAndPrint(result) {
  console.log(`Tipe hasil: ${typeof result}`);

  if (typeof result === "number" && Number.isFinite(result)) {
    if (result > 0) console.log("Sifat: Positive");
    else if (result < 0) console.log("Sifat: Negative");
    else console.log("Sifat: Zero");

    const kind = Number.isInteger(result) ? "Integer" : "Floating-point";
    console.log(`Klasifikasi: ${kind}`);

    if (Number.isInteger(result)) {
      const parity = result % 2 === 0 ? "Even" : "Odd";
      console.log(`Parity: ${parity}`);
      result > 0 && result % 2 === 0 && console.log("✔ Positive AND even");
      (result < 0 || result === 0) && console.log("ℹ Negative OR zero");
    } else {
      console.log("Parity: n/a (bukan integer)");
    }
  } else if (typeof result === "string") {
    console.log(`Error message: ${result}`);
  } else {
    const msg = result ?? "Result is undefined or null, something went wrong!";
    console.log(msg);
  }

  console.log(""); // spasi antar iterasi
}

// 3: Main Calculator Logic (Switch & If/Else)
async function main() {
  console.log("=== Mini Kalkulator ===");

  while (true) {
    // berjalan terus sampai user keluar
    const a = await getValidNumberInput("Masukkan angka pertama: ");
    const op = await getValidOperatorInput(
      "Pilih operator (+, -, , /, %, *, **): "
    );
    const b = await getValidNumberInput("Masukkan angka kedua: ");

    let result;

    switch (op) {
      case "+":
        result = add(a, b);
        break;
      case "-":
        result = subtract(a, b);
        break;
      case "*":
        result = multiply(a, b);
        break;
      case "/":
        result = divide(a, b);
        break;
      case "%":
        result = modulo(a, b);
        break;
      case "**":
        result = power(a, b);
        break;
      default:
        result = "Operator tidak dikenali.";
    }

    console.log(`Hasil: ${a} ${op} ${b} = ${result}\n`);
    analyzeAndPrint(result);

    // 5. Exit Mechanism (Loops & Conditionals)
    const again = (await ask("Hitung lagi? (y/n): ")).trim().toLowerCase();
    if (again !== "y") {
      console.log("Selesai. Terima kasih!");
      rl.close();
      break;
    }
    console.log(""); // spasi setiap selesai perhitungan
  }
}

// jalankan
main();
