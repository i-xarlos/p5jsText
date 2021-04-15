var font;
const letters = [];

function preload() {
  font = loadFont("assets/Calistoga-Regular.ttf");
}

// called once
function setup() {
  createCanvas(800, 250);

  background(255, 0, 0);
  const str = "UNDERCURRENT";
  const wordsStr = str.split("");

  textFont(font);
  textSize(70);
  textAlign(0, CENTER);

  let x = 40;
  let y = height / 2.2;

  fill(0);

  for (let i = 0; i < wordsStr.length; i++) {
    const wordStr = wordsStr[i]; // get current word
    const wordStrWidth = textWidth(wordStr); // get current word width
    const word = new Word(wordStr, x, y, i);
    //text(wordStr, x, y); // display word
    letters.push(word);

    x = x + wordStrWidth + textWidth(" "); // update x by word width + space character
  }
}

// called every frame
function draw() {
  background(255, 255, 0);

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i]; // retrieve word object
    letter.update();
    letter.display();
  }
}

let interval = null;

function mousePressed() {
  console.log("hola");
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    letter.spread();
  }

  clearInterval(interval);
  interval = setInterval(reset, 1000);
}

function reset() {
  console.log("reset");
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    letter.reset();
  }
}

class Word {
  constructor(word, x, y, idx) {
    this.word = word;

    this.origx = x;
    this.origy = y;

    this.x = x;
    this.y = y;
    // target position is the same as current position at start
    this.tx = this.x;
    this.ty = this.y;
    this.idx = idx;
    this.fcolor = color(255);
  }

  spread() {
    this.tx = random(width);
    this.ty = random(height);
  }

  update() {
    // move towards the target by 10% each time
    this.x = lerp(this.x, this.tx, 0.1);
    this.y = lerp(this.y, this.ty, 0.1);
  }

  display() {
    fill(this.fcolor);
    noStroke();
    text(this.word, this.x, this.y);
  }

  reset() {
    this.tx = this.origx;
    this.ty = this.origy;
  }
}
