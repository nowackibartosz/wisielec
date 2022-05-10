export class Quote {
    constructor(text) {
        this.text = text;
        //13 odnajdywanie liter
        this.guessed = [];
    }
    //zalozylismy nowa klase, bo tak jest elegancko. jednak zeby uzywac jej w innym miejscu musimy ją wykesportować słówem export


    //11 zamiast kazdej litery znaczek podresleni + spacje. czyli przeporwadzamy tu interacja po tekscie 
    getContent() {
        let content = '';
        for (const char of this.text) {
            //13 odnajdywanie
            if (char == ' ' || this.guessed.includes(char)) {
                content += char;
            } else {
                content += '_';
            }
        }
        return content;


    }
    //13znajdowanie liter13
    guess(letter) {



        if (!this.text.includes(letter)) {
            return false;
        }
        this.guessed.push(letter)
        return true;
    }
}