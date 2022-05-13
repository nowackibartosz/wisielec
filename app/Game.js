import { Quote } from "./Quote.js";

class Game {
  currentStep = 0;
  lastStep = 7;

  quotes = [
    {
      text: "pulp fiction",
      category: "Movies",
    },
    {
      text: "the lord of the rings",
      category: "Movies",
    },
    {
      text: "four rooms",
      category: "Movies",
    },

    {
      text: "blue",
      category: "Colors",
    },
    {
      text: "yellow",
      category: "Colors",
    },
    {
      text: "black",
      category: "Colors",
    },
    {
      text: "richard",
      category: "Names",
    },
    {
      text: "tom",
      category: "Names",
    },
    {
      text: "andrzej",
      category: "Names",
    },
  ];

  constructor({
    lettersWrapper,
    categoryWrapper,
    wordWrapper,
    outputWrapper,
    btn,
  }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;
    this.btn = btn;

    const { text, category } =
      this.quotes[Math.floor(Math.random() * this.quotes.length)];

    this.categoryWrapper.innerHTML = category;

    this.quote = new Quote(text);
  }

  guess(letter, event) {
    event.target.disabled = true;

    if (this.quote.guess(letter)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      document.getElementsByClassName("step")[
        this.currentStep
      ].style.opacity = 1;

      if (this.currentStep == this.lastStep) {
        this.loosing();
      }
    }
  }
  drawLetters() {
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36);
      const button = document.createElement("button");
      button.innerHTML = label;
      button.addEventListener("click", (event) => this.guess(label, event));
      this.lettersWrapper.appendChild(button);
    }
  }

  drawQuote() {
    const content = this.quote.getContent();
    this.wordWrapper.innerHTML = content;
    if (!content.includes("_")) {
      this.winning();
    }
  }

  buttonReset() {
    const buttonReset = document.createElement("button");
    buttonReset.textContent = "try again";
    buttonReset.addEventListener("click", (event) => this.reset());
    this.btn.appendChild(buttonReset);
  }

  reset() {
    for (this.currentStep = 0; this.currentStep < 8; this.currentStep++) {
      document.getElementsByClassName("step")[
        this.currentStep
      ].style.opacity = 0.1;
    }
    this.currentStep = 0;
    document.getElementsByClassName("step")[this.currentStep].style.opacity = 1;
    console.log(this.currentStep);
    this.wordWrapper.innerHTML = "";
    const { text, category } =
      this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text);
    this.lettersWrapper.innerHTML = "";
    this.drawLetters();
    this.drawQuote();
  }

  start() {
    document.getElementsByClassName("step")[this.currentStep].style.opacity = 1;
    this.drawLetters();
    this.drawQuote();
    this.buttonReset();
  }

  winning() {
    this.wordWrapper.innerHTML = "Congratulations! You are a winner! :)";
    this.lettersWrapper.innerHTML = "";
  }

  loosing() {
    this.wordWrapper.innerHTML = "Sorry. You lost! :(";
    this.lettersWrapper.innerHTML = "";
  }
}

const game = new Game({
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
  btn: document.getElementById("btn"),
});

game.start();
