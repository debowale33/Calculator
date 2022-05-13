let computation
let result = ''
class Calculator {
  constructor(po, co) {
    this.previousOperandTextElement = po;
    this.currentOperandTextElement = co
    this.clear()
  }
  

clear() {
  this.currentOperand = '';
  this.previousOperand = '';
  this.operation = undefined;
}

delete() { 
  this.currentOperand = this.currentOperand.slice(0, -1)
}
clearAfterComputation() {
  this.currentOperand = ''
  result = ''
}

appendNum(number) {
  if (result === undefined) {
    this.clearAfterComputation()
  } 
  if (number === "." && this.currentOperand.includes(".")) return
  // if (number === "." && this.currentOperand === "") {
  //   this.currentOperand = `0${number.toString()}`
  // }
  this.currentOperand = this.currentOperand.toString() + number.toString()
}

chooseOperation(operation) {
  if (this.currentOperand === "") return
  if (this.currentOperand !== "") {
    this.compute()
  }
this.operation = operation
this.previousOperand = this.currentOperand
this.currentOperand = ""
}

compute() {
  const prev = parseFloat(this.previousOperand)
  const curr = parseFloat(this.currentOperand)

  if (isNaN(prev) || isNaN(curr)) return
  switch (this.operation) {
    case "+":
      computation = prev + curr
      break;
    case "-":
      computation = prev - curr
      break;
    case "*":
      computation = prev * curr
      break;
    case "-/-":
      computation = prev / curr
      break;
    default : return
  }
  result = computation
  this.currentOperand = computation
  this.operation = undefined
  this.previousOperand = ''
  result = undefined;
}
// This is for formatting the numbers i.e 1234567 becomes 1,234,567
getDisplayNumber(num) {
 
  const stringNumberr = num.toString()
  const integerDig = parseFloat(stringNumberr.split('.')[0])
  const decimalDig = stringNumberr.split('.')[1]

  let integerDisplay
  if (isNaN(integerDig)) {
    integerDisplay = ''
  } else {
    integerDisplay = integerDig.toLocaleString('en', {maximumFractionDigits: 0})
  }
  if (decimalDig != null) {
    return `${integerDig}.${decimalDig}`
  } else {
    return integerDisplay
  }
  //return num
}

updateDisplay() {
  this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
  if (this.operation != null) {
    this.previousOperandTextElement.innerText = 
    `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
  } else {
    this.previousOperandTextElement.innerText = ""
  }
  
}


}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allclear]')
const previousOperandTextElement = document.querySelector('[data-previousoperand]')
const currentOperandTextElement = document.querySelector('[data-currentoperand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNum(button.innerText)
    calculator.updateDisplay()
  })
})
// //numberButtons.forEach(b => console.log(b.innerText))
// console.log(calculator)
operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})