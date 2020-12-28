
var menuOpen = false
function fecharMenu(){
    document.getElementById('hamburger').classList.remove('clicked')
    document.getElementById('hamb-navbar').classList.remove('clicked')
    console.log('removeu')
    menuOpen = false
}
//Corrige um bug onde se eu abrir o menu e redimensionar a tela o menu continua sendo mostrado
window.addEventListener('resize', function(){
    if (window.innerWidth > 1100 && menuOpen === true){
        fecharMenu()
    }
    else if(window.innerWidth > 900 && window.innerHeight > 700 && menuOpen === true){
        fecharMenu()
    }
    else if(window.innerWidth > 1250 && window.innerHeight > 900 && menuOpen === true){
        fecharMenu()
    }
})

function openMenu(){
    menuOpen = !menuOpen
    
    document.getElementById('html').classList.toggle('hiddenof')
    document.body.classList.toggle('hiddenof')
    document.getElementById('hamburger').classList.toggle('clicked')
    document.getElementById('hamb-navbar').classList.toggle('clicked')
}