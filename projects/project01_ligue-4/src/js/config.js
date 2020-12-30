const CONFIG={
    parentEl:document.querySelector("#ul"),//TAG PAI QUE POSSUI TODAS AS COLUNAS, OU SEJA, AS 7 COLUNAS
    allColumns:document.querySelectorAll(".lis"),//PASSAR TODAS AS COLUNAS
    pipe:document.querySelector("#pipe"),//Esse é o cano
    ball:{
        element:"div",
        nameClass:"ball",
        toggleColor:["rgb(0,25,255)","yellow"],//Aqui pode configurar as cores que desejar para a bolinha
        timeToAppear:.10,//Aqui configura os segundos que a bolinha irá aparecer.
        fallSpeed:10//Configura a velocidade da queda
    }
}
new Controller(CONFIG)//TUDO COMEÇA