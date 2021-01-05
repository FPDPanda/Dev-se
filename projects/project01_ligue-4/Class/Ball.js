class Ball{
    constructor(ball,parent,fallSpeed,timeToAppear,nameP){
        this.ball=ball
        this.nameP=nameP
        this.parent=parent
        this.fallSpeed=fallSpeed
        this.timeToAppear=timeToAppear
        this.move(this.ball,this.parent,this.fallSpeed,this.timeToAppear)
    }
    move(el,parent,fallSpeed,timeToAppear){
        let cont=0
        let height=0
        //this.bolinha.style.background=this.toggleColor(this.bolinha.style.background)
        parent.childNodes.length?parent.childNodes.forEach(b=>{height+=el.offsetHeight +20}):0
        parent.innerHTML+=`<p class="${this.nameP}"></p>`
        el.style.opacity="0"
        
        setTimeout(()=>{
            el.style.opacity="1"
            //&&this.bolinha.offsetLeft+this.bolinha.offsetWidth<parent.offsetLeft+parent.offsetWidth
            let loop =setInterval(()=>{
            if(el.offsetTop+el.offsetHeight+height>=parent.offsetTop+parent.offsetHeight){
                clearInterval(loop)
                height=0
            }else{el.style.top=cont+"px"}
            cont+=fallSpeed;
            },10)
        },timeToAppear*1000)
    }
}