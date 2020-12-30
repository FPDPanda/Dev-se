class Controller{
    constructor(conf){
        this.parentEl=conf.parentEl
        this.allColumns=conf.allColumns
        this.pipe=conf.pipe
        this.ball=conf.ball
        this.contBall=0
        this.colorBall=this.ball.toggleColor[0]
        //METHODS
        this.listener(this.allColumns)
        this.mainLoop()
    }
    checksWinner(){
        this.allColumns.forEach((l,i)=>{
            l.childNodes.forEach((b,c)=>{
                console.log(`Na posição ${i},${c} tem ${b.classList.value}`)
            })
        })
    }
    toggleColor(color){
        return color==this.ball.toggleColor[0]?this.colorBall=this.ball.toggleColor[1]:this.colorBall=this.ball.toggleColor[0]
    }
    createEl(parentEl,nameEl,attEl,valeuEl){
        let el = document.createElement(nameEl)
        let att = document.createAttribute(attEl)
        att.value=valeuEl
        el.setAttributeNode(att)
        parentEl.appendChild(el)
        el.style.background=this.toggleColor(this.colorBall)
        return el;
    }
    movePipeEL(el){
        this.pipe.style.left=el.offsetLeft+(el.offsetWidth/2-this.pipe.offsetWidth/2)+"px"
    }
    toggle(bolean){return bolean?false:true}
    listener(tag){
        if(tag){
            tag.forEach(el => {
                el.addEventListener("click",e=>{
                this.movePipeEL(e.path[0])
                new Ball(this.createEl(this.parentEl,this.ball.element,"class",this.ball.nameClass),e.path[0],this.ball.fallSpeed,this.ball.timeToAppear)
                })
            }); 
        
        }
    }
   
   mainLoop(){
        setInterval(()=>{
            let ball = document.querySelector("."+this.ball.nameClass)?document.querySelectorAll("."+this.ball.nameClass):0
            ball?ball[ball.length-1].style.left=this.pipe.offsetLeft+((this.pipe.offsetWidth/2)-(ball[ball.length-1].offsetWidth/2))+"px":0
            /*
            
            PARA PEGAR A POSIÇÃO DA BOLINHA BASTA RETIRAR O COMENTARIO E OBSERVAR A IMPRESSÃO NO DEVTOOLS

            */

           //this.checksWinner() 
            
    },100)
   }
}