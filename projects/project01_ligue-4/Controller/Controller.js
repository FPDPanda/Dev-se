class Controller {
  constructor(conf) {
    this.parentEl = conf.parentEl;
    this.allColumns = conf.allColumns;
    this.pipe = conf.pipe;
    this.ball = conf.ball;
    this.btnReset = conf.btnReset;
    this.matrix = [[], [], [], [], [], [], []];
    this.colorBall = this.ball.toggleColor[0];
    this.runningGame = true;
    //METHODS
    this.gameFinished();
    this.listener(this.allColumns);
    this.mainLoop();
    this.btnReset.addEventListener("click", (e) => {
      this.reset();
    });
  }
  gameFinished(result){
    if(result) {
      document.getElementById('winner').style.display ='flex'
    }

    if (result === 'yellow') {
      document.getElementById('winner').textContent = 'Yellow player won!'
    } else if (result === 'blue') {
      document.getElementById('winner').textContent = 'Blue player won!'
    } else if (result === 'tie') {
      document.getElementById('winner').textContent = 'The game tied!'
    }
  }
  pushMatrix() {
    this.allColumns.forEach((l, i) => {
      l.childNodes.forEach((b, c) => {
        this.matrix[i].push(b.className);
        console.log(this.matrix);

        if (this.matrix[i].length >= 4) {
          console.log("4");
        }
        // console.log(`Na posição ${i},${c} tem ${b.classList.value}`)
      });
    });
  }
  checksWinner() {}
  nameBall(name) {
    return name.search("#") > -1
      ? name.replace("#", "p")
      : name.replace(/[(0-9)\(\)\,\#]/gi, "");
  }
  toggleColor(color) {
    return color == this.ball.toggleColor[0]
      ? (this.colorBall = this.ball.toggleColor[1])
      : (this.colorBall = this.ball.toggleColor[0]);
  }
  createEl(parentEl, nameEl, attEl, valeuEl) {
    let el = document.createElement(nameEl);
    let att = document.createAttribute(attEl);
    att.value = valeuEl;
    el.setAttributeNode(att);
    parentEl.appendChild(el);
    el.style.background = this.toggleColor(this.colorBall);
    return el;
  }
  movePipeEL(el) {
    this.pipe.style.left =
      el.offsetLeft + (el.offsetWidth / 2 - this.pipe.offsetWidth / 2) + "px";
  }
  validateCreation(path) {
    let val = 0;
    path.childNodes.forEach((e) => {
      val += document.querySelector("." + this.ball.nameClass).offsetHeight;
    });
    return val >= path.offsetHeight ? false : true;
  }
  listener(tag) {
    if (tag) {
      tag.forEach((el) => {
        el.addEventListener("click", (e) => {
          this.movePipeEL(e.target);
          this.validateCreation(e.target) && this.runningGame
            ? new Ball(
                this.createEl(
                  this.parentEl,
                  this.ball.element,
                  "class",
                  this.ball.nameClass
                ),
                e.target,
                this.ball.fallSpeed,
                this.ball.timeToAppear,
                this.nameBall(this.colorBall)
              )
            : 0;
          this.pushMatrix();
          this.checksWinner();
        });
      });
    }
  }
  reset() {
    document.querySelectorAll("." + this.ball.nameClass).forEach((e) => {
      e.remove();
    });
    this.ball.toggleColor.forEach((c) => {
      document.querySelectorAll("." + this.nameBall(c)).forEach((e) => {
        e.remove();
      });
    });
    this.runningGame = true;
    this.mainLoop();
    this.matrix = [[], [], [], [], [], [], []];
  }
  mainLoop() {      
        let loop;
    if (this.runningGame) {
      loop = setInterval(() => {
        let ball = document.querySelector("." + this.ball.nameClass)
          ? document.querySelectorAll("." + this.ball.nameClass)
          : 0;

        ball
          ? (ball[ball.length - 1].style.left =
              this.pipe.offsetLeft +
              (this.pipe.offsetWidth / 2 -
                ball[ball.length - 1].offsetWidth / 2) +
              "px")
          : 0;
      }, 100);
    
      document.getElementById('winner').style.display ='none'
    } else {
      clearInterval(loop);
    }
  }
}
