class Controller {
  constructor(conf) {
    this.parentEl = conf.parentEl;
    this.allColumns = conf.allColumns;
    this.pipe = conf.pipe;
    this.ball = conf.ball;
    this.btnReset = conf.btnReset;
    this.matrix=[
        ["","","","","","",""],["","","","","","",""],["","","","","","",""],
        ["","","","","","",""],["","","","","","",""],["","","","","","",""],
        ["","","","","","",""]
      ]
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

    if (result === this.ball.toggleColor[1]) {
      document.getElementById('winner').textContent = 'Yellow player won!'
    } else if (result === this.ball.toggleColor[0]) {
      document.getElementById('winner').textContent = 'Blue player won!'
    } else if (result === 'tie') {
      document.getElementById('winner').textContent = 'The game tied!'
    }
  }
  pushMatrix(runningGame) {
    if(runningGame){
      this.allColumns.forEach((l,i)=>{
          l.childNodes.forEach((b,c)=>{
              this.matrix[i][c]=b.classList.value
              
          })
      })
  }
  }
  checksWinner(){
    let data=[0,0,'',false];
        if(!data[3]){
            for(let l=0;l<this.matrix.length;l++){
                for(let c=0;c<this.matrix.length;c++){
                    if(this.matrix[l][c]==this.nameBall(this.ball.toggleColor[0])){data[0]+=1;data[2]=this.ball.toggleColor[0]}else data[0]=0
                    if(this.matrix[l][c]==this.nameBall(this.ball.toggleColor[1])){data[1]+=1;data[2]=this.ball.toggleColor[1]}else data[1]=0
                    if(data[0]>3||data[1]>3){data[3]=true;break}
                }
                if(data[3])break
            }
        }
        if(!data[3]){
            data=[0,0,'',false];
            for(let l=0;l<this.matrix.length;l++){
                for(let c=0;c<this.matrix.length;c++){
                    if(this.matrix[c][l]==this.nameBall(this.ball.toggleColor[0])){data[0]+=1;data[2]=this.ball.toggleColor[0]}else data[0]=0
                    if(this.matrix[c][l]==this.nameBall(this.ball.toggleColor[1])){data[1]+=1;data[2]=this.ball.toggleColor[1]}else data[1]=0
                    if(data[0]>3||data[1]>3){data[3]=true;break}
                }
                if(data[3])break
            }
        }
        //DIAGONAL PRINCIPAL
        if(!data[3]){
            data=[0,0,'',false];
            for(let l=0;l<this.matrix.length;l++){
                    for(let c=0;c<this.matrix.length;c++){
                        //matriz quadrada 4x4
                        if(l<4&&c<4){
                            for (let i=0;i<4; i++){
                                if(this.matrix[l+i][c+i]==this.nameBall(this.ball.toggleColor[0])){data[0]+=1;data[2]=this.ball.toggleColor[0]}else data[0]=0
                                if(this.matrix[l+i][c+i]==this.nameBall(this.ball.toggleColor[1])){data[1]+=1;data[2]=this.ball.toggleColor[1]}else data[1]=0
                                if(data[0]>3||data[1]>3){data[3]=true;break}
                            }
                        }
                        //-------------------------------
                        if(data[3])break
                    }
                if(data[3])break
            }
        }
        //DIAGONAL SECUNDARIA
        if(!data[3]){
            data=[0,0,'',false];
            for(let l=0;l<this.matrix.length;l++){
                    for(let c=this.matrix.length-1;c>=0;c--){
                        //matriz quadrada 4x4
                        if(l<4&&c>2){
                            for (let i=0;i<4;i++){
                                //console.log(`${l+i},${c-i}`)
                               if(this.matrix[l+i][c-i]==this.nameBall(this.ball.toggleColor[0])){data[0]+=1;data[2]=this.ball.toggleColor[0]}else data[0]=0
                                if(this.matrix[l+i][c-i]==this.nameBall(this.ball.toggleColor[1])){data[1]+=1;data[2]=this.ball.toggleColor[1]}else data[1]=0
                                if(data[0]>3||data[1]>3){data[3]=true;break}
                            }
                        }
                        //-------------------------------
                        if(data[3])break
                    }
                if(data[3])break
            }
        }
        //TIE
        if(!data[3]){
            data=[0,0,'tie',true];
            for(let l=0;l<this.matrix.length;l++){
                for(let c=0;c<this.matrix.length-1;c++){
                  if(this.matrix[l][c]==""){data[2]="";break}
                }
                if(!data[2])break
            }
            data[2]==""&&data[3]?data[3]=false:0 
        }
        return data[3]?data:false
  }
  nameBall(name) {
    return  name.search("#") > -1
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
          this.pushMatrix(this.runningGame);
          if(this.runningGame&&this.checksWinner()[3]){setTimeout(()=>{this.runningGame=false;this.gameFinished(this.checksWinner()[2])},1000)};
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
    for(let l=0;l<this.matrix.length;l++){for(let c=0;c<this.matrix.length;c++){this.matrix[l][c]="";}}
    document.getElementById('winner').style.display ='none'
    this.mainLoop();
  }
  mainLoop() {      
      let loop;
      loop = setInterval(() => {
        if (this.runningGame) {
        let ball = document.querySelector("." + this.ball.nameClass)
          ? document.querySelectorAll("." + this.ball.nameClass)
          : 0;

        ball&&ball[ball.length - 1].offsetTop<this.pipe.offsetTop+this.pipe.offsetHeight
          ? (ball[ball.length - 1].style.left =
              this.pipe.offsetLeft +
              (this.pipe.offsetWidth / 2 -
                ball[ball.length - 1].offsetWidth / 2) +
              "px")
          : 0;
          
       } else {
          clearInterval(loop);
        } 
      }, 100);
    
    
  }
}
