window.open
('https://google.com',
'_blank'
);

const abaixarHeader = document.getElementById("index_header__ativo");

abaixarHeader.addEventListener('click',function (){
    if(window.innerWidth < 1000){
        abaixarHeader.classList.toggle("active");
    }
})


