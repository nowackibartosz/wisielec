import { Quote } from "./Quote.js";

class Game {
  //15 dodawanie obrazkow
  currentStep = 0;
  lastStep = 7;

  //7robimy tabliec w ktorej są obiekty 7
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

  //4 mogł”ym tutaj wymienić jeden obiekt i odebrać wszystko jako jeden obiekt, ale js umozliwia, wiec  tworze obiekt za pomocą {} i wypakowuje wszystkie i tu je odbieram
  constructor({
    lettersWrapper,
    categoryWrapper,
    wordWrapper,
    outputWrapper,
    btn,
  }) {
    // 5jezeli uzywamy tych argumentów wyżej, to w ramach konstruktora, moglbym je uzywać. wyswietlic je, oddac robić co chce. musimy zrobić tak aby te argumenty stały się własciwosciami klasy Game
    //odebrałem w konstruktorze 4 argumenty te wyżej i przypisałem je do obiektu5
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;
    this.btn = btn;

    //8 dodajemy tekst wyswietlany
    const { text, category } =
      this.quotes[Math.floor(Math.random() * this.quotes.length)];

    //9przypisujemy kategorie do wrappera
    this.categoryWrapper.innerHTML = category;

    //10 text00
    this.quote = new Quote(text);
  }

  //6
  guess(letter, event) {
    //14 nciskanie przycisku tylko raz
    event.target.disabled = true;

    //13znajdowanie liter13
    //15 dodawanie obrazkow
    if (this.quote.guess(letter)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      document.getElementsByClassName("step")[
        this.currentStep
      ].style.opacity = 1;

      //16 wygrana przegrana
      if (this.currentStep == this.lastStep) {
        this.loosing();
      }
    }
  }
  drawLetters() {
    //6 w momencie startu chce do this.lettersWrapper wstawić litery
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36);
      const button = document.createElement("button");

      //zawartosc buttona
      button.innerHTML = label;

      //chce zeby button jako argmuent odbierał label, wiec robimy mały closer. czyli po kliknięciu ja z tej konkretnej metody game  chce wywolac metode guess (czyli zgadnij )
      button.addEventListener("click", (event) => this.guess(label, event));

      //do tego wrappera bede dodawac dzieci ,ktore mają być buttonami6
      this.lettersWrapper.appendChild(button);
    }
  }

  drawQuote() {
    // 12musze pobrac tekst z podresleniami

    const content = this.quote.getContent();

    //dalej wkladamy kontent do wrappera
    this.wordWrapper.innerHTML = content;

    //16 wygrana/przegrana
    if (!content.includes("_")) {
      this.winning();
    }
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

  //metoda powinna robic jedna rzecz
  start() {
    //15 dodawanie obrazkow
    document.getElementsByClassName("step")[this.currentStep].style.opacity = 1;
    this.drawLetters();
    this.drawQuote();
    this.buttonReset();
  }

  //16 wygrana przegrana
  winning() {
    this.wordWrapper.innerHTML = "Congratulations! You are a winner! :)";
    this.lettersWrapper.innerHTML = "";
  }

  loosing() {
    this.wordWrapper.innerHTML = "Sorry. You lost! :(";
    this.lettersWrapper.innerHTML = "";
  }
}

// 1przenieslismy kod czyli wywołanie oddzielnie1

const game = new Game({
  //2mowimy grze z czego ma korzystać. przekazujemy obikety 2
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
  btn: document.getElementById("btn"),

  // 3jak coś wywołujemy to musimy to również odebrać. przekazujemy to prze zkonstruktor, wiec musimy utworzyc konstruktor3
});

game.start();
