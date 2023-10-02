const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const equalBtn = document.querySelector(".equalBtn");
const container = document.querySelector(".container");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

//Define function to calculate based on button clicked.
const calculate = (btnValue) => {
    display.focus();
    if (btnValue === "=" && output !== "") {
        //If output has '%', replace with '/100' before evaluating.
        try {
            output = eval(output.replace("%", "/100"));
        } catch { }
        // checkPass();
    } else if (btnValue === "AC") {
        output = "";
    } else if (btnValue === "DEL") {
        //If DEL button is clicked, remove the last character from the output.
        output = output.toString().slice(0, -1);
    } else {
        //If output is empty and button is specialChars then return
        if (output === "" && specialChars.includes(btnValue)) return;
        output += btnValue;
    }
    display.value = output;
};

//Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
    //Button click listener calls calculate() with dataset value as argument.
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

document.addEventListener("keypress", (e) => {
    e.preventDefault();
    let key = e.key;

    // Check if the key corresponds to a number (0-9) or one of the operators (+, -, *, /).
    if (/[\d\+\-\*\/]/.test(key)) {
        display.value += key;
        output += key;
    } else if (key === "Enter") {
        equalBtn.click();
        checkPass();
    }
});

function checkPass() {
    // console.log("Check pass call")
    if (display.value == 1000) {
        container.classList.add("active");
        // document.querySelector(".button").computedStyleMap.po   

        for (let i = 1; i <= 30; i++) {
            let bodyEle = document.createElement("div");
            bodyEle.id = "_" + i;
            bodyEle.className = "card"
            let child1 = document.createElement("div");
            child1.className = "title";
            child1.innerHTML = "Hello World"
            child1.innerHTML = `Hello this is ${i} title`;
            let child2 = document.createElement("div");
            child2.className = "limit";
            child2.innerHTML = "Lorem ipsum dolor sit amet."
            let child3 = document.createElement("div");
            child3.className = "data";
            child3.innerHTML = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore fugiat adipisci sit voluptas debitis nulla sapiente eligendi assumenda rem";
            bodyEle.appendChild(child1)
            bodyEle.appendChild(child2)
            bodyEle.appendChild(child3)
            document.querySelector(".show").appendChild(bodyEle);
        }
        updateEvent();
    } else if (display.value == 101) {
        let ans = prompt("Where Lord Krishna born");
        ans.toLowerCase();
        if (ans === "mathura") {
            alert("Correct Passwaord is '1000' and press enter");
        } else {
            alert("Wrong! answer")
        }
    }
}

function updateEvent() {
    document.querySelectorAll(".card").forEach((element) => {
        element.addEventListener("click", () => {
            container.classList.add("hide");
            document.querySelector(".wapper").classList.add("active");
            document.querySelector(".wapper").id = element.id;
            document.querySelector(".wapper .title").innerHTML = element.querySelector(".title").innerHTML;
            document.querySelector(".wapper .limit").innerHTML = element.querySelector(".limit").innerHTML;
            document.querySelector(".wapper .data").innerHTML = element.querySelector(".data").innerHTML;
        })
    })
}

let newTitle = "", newData = "", newLimit;

document.querySelector(".edit").addEventListener("click", () => {
    if (document.querySelector(".edit").innerHTML == "Save") {
        let wapperId = document.querySelector(".wapper").id;
        let element = document.querySelector(".show #" + wapperId);
        console.log(wapperId, element);
        element.querySelector(".title").innerHTML = newTitle;
        element.querySelector(".data").innerHTML = newData;
        newData = newData.split(" ");
        newLimit = newData.slice(0, Math.min(5, newData.length));
        newLimit = newLimit.join(" ");
        element.querySelector(".limit").innerHTML = newLimit;
        document.querySelector(".edit").innerHTML = "Edit";
    }else {
        document.querySelector(".edit").innerHTML = "Save";
        newTitle = prompt("Enter New Title");
        newData = prompt("Enter Content to change");
        if (newTitle.trim().length > 1 && newData.trim().length > 1) {
            document.querySelector(".wapper .title").innerHTML = newTitle;
            document.querySelector(".wapper .data").innerHTML = newData;
        }
    }
})

document.querySelector(".close").addEventListener("click", () => {
    container.classList.remove("hide");
    document.querySelector(".wapper").classList.remove("active");
})