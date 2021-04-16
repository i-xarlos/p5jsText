let font;
const letters = [];
const acc = 1;
let count = 1;
let graphics = null;

function preload() {
  font = loadFont("assets/Ramabhadra-Regular.ttf");
}

// called once
function setup() {
  createCanvas(800, 250);
  pixelDensity(1);

  background(255, 255, 0);
  graphics = createGraphics(600, 125);

  const str = "UNDERCURRENT";
  const wordsStr = str.split("");

  graphics.textFont(font);
  graphics.textSize(35);
  graphics.textAlign(0, CENTER);
  graphics.background(255, 0, 255);

  let x = 0;
  let y = 0;

  graphics.fill(0);

  const total = wordsStr.length;

  for (let i = 0; i < wordsStr.length; i++) {
    const wordStr = wordsStr[i]; // get current word
    const wordStrWidth = graphics.textWidth(wordStr + 1); // get current word width
    const word = new Word(wordStr, x, y, i, total, graphics);
    //text(wordStr, x, y); // display word
    letters.push(word);

    x = x + wordStrWidth + 5; // update x by word width + space character
  }
}

let drawInterval = null;
// called every frame
function draw() {
  //console.log("draw");
  image(graphics, 0, 0);
  image(graphics, 0, 130);

  graphics.background(220);

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
  move((direction / 1.5) * acc);
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
  constructor(word, x, y, idx, total, graphics) {
    this.word = word;
    this.total = total;
    this.graphics = graphics;

    this.origx = x;
    this.origy = y;

    this.x = x;
    this.y = y;
    // target position is the same as current position at start
    this.tx = this.x;
    this.ty = this.y;
    this.idx = idx;

    this.fcolor = color(255, 255, 255);
    this.count = 0;
  }

  spread(direction = -1) {
    //this.graphics.background(0);
    const space = (value) => value * 0.15 * 100;
    let pos = 0;

    if (this.idx >= this.total / 2) {
      pos = space(this.idx - 12);
      this.tx += pos * direction;
    } else {
      this.tx -= space(this.idx) * direction;
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
    this.count = 0;
  }
}
