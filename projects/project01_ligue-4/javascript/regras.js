function callRegras(){
   
    var toggle = document.getElementById('container-rules-id').classList.toggle('clicked')
    
    if(toggle){
        document.getElementById('containerGame').style.display = 'none'
    }
    else{
        document.getElementById('containerGame').style.display = 'block'
    }

    
}

function closeRegras(){
    document.getElementById('container-rules-id').classList.remove('clicked')
    document.getElementById('containerGame').style.display = 'block'
}