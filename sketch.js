let font;
const letters = [];
let count = 1;
let graphics1 = null;
let graphics2 = null;
let fr = 40;

function preload() {
  font = loadFont("assets/Ramabhadra-Regular.ttf");
}

// called once
function setup() {
  createCanvas(800, 250);
  pixelDensity(1);
  frameRate(fr);

  background(0);

  graphics1 = createGraphics(width, 125);
  graphics2 = createGraphics(width, 125);

  createLetters("UNDERCURRENT", graphics1, 58, 113, 0.9);
  createLetters("UNDERCURRENT", graphics2, 58, -10, 0.7);
}

const createLetters = (TEXT, graphics, xPos, yPos, acc) => {
  graphics.textFont(font);
  graphics.textSize(40);
  graphics.textAlign(0, CENTER);
  graphics.background(255, 0, 255);
  const str = TEXT;
  const wordsStr = str.split("");

  let x = xPos;
  let y = yPos;

  graphics.fill(0);

  const total = wordsStr.length;

  for (let i = 0; i < wordsStr.length; i++) {
    const wordStr = wordsStr[i]; // get current word
    const wordStrWidth = graphics.textWidth(wordStr + 1); // get current word width
    const word = new Word(wordStr, x, y, i, total, graphics, acc);
    //text(wordStr, x, y); // display word
    letters.push(word);

    x = x + wordStrWidth + 5; // update x by word width + space character
  }
};

let drawInterval = null;
// called every frame
function draw() {
  image(graphics1, 0, 0);
  image(graphics2, 0, 125);

  graphics1.background(0);
  graphics2.background(0);

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i]; // retrieve word object
    letter.update();
    letter.display();
    //graphics.fill(0);
    //graphics.rect(0, graphics.height / 2 - 1, graphics.width, 5);
  }
}

setInterval(() => {
  count = count + 1;
  const direction = count % 2 ? -1 : +1;
  move(direction / 1.5);
}, 1500);

let interval = null;

function move(direction = 1) {
  console.log("moving");

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    letter.spread(direction);
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
  constructor(word, x, y, idx, total, graphics, acc = 1) {
    this.word = word;
    this.total = total;
    this.graphics = graphics;
    this.acc = acc;

    this.origx = x;
    this.origy = y;

    this.x = x;
    this.y = y;
    // target position is the same as current position at start
    this.tx = this.x;
    this.ty = this.y;
    this.idx = idx;

    this.fcolor = color(255, 255, 255);
  }

  spread(direction = -1) {
    const space = (value) => value * 0.15 * 100;
    let pos = 0;

    if (this.idx >= this.total / 2) {
      pos = space(this.idx - 12);
      this.tx += pos * direction * this.acc;
    } else {
      this.tx -= space(this.idx) * direction * this.acc;
    }
  }

  update() {
    // move towards the target by 10% each time
    this.x = lerp(this.x, this.tx, 0.1);
    this.y = lerp(this.y, this.ty, 0.1);
  }

  display() {
    this.graphics.fill(this.fcolor);
    this.graphics.noStroke();
    this.graphics.text(this.word, this.x, this.y);
  }

  reset() {
    this.tx = this.origx;
    this.ty = this.origy;
  }
}
