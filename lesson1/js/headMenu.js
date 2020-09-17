let menuClick = document.querySelector('.headMenu');
let submenu = document.querySelector('.headerSubMenu');

menuClick.addEventListener('click', function(){
    if(submenu.classList.contains('headMenuUp')){
        submenu.classList.remove('headMenuUp');
        submenu.classList.add('headMenuDown')
    }else{
        submenu.classList.remove('headMenuDown');
        submenu.classList.add('headMenuUp')
    }
})