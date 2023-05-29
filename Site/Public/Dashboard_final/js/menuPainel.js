//variaveis globais 
var contador= 0;

//funcoes do menu de nav
function clickmenu() {
contador+=1

if(contador>0){
if(contador==1){
    mensagem.innerHTML= `<ul class="menu_resp"> 
        <li><a href="salaA.html">Sala A</a></li>
        <li><a href="salaB.html">Sala B</a></li>
        <li><a href="salaC.html">Sala C</a></li>`

} else {
    mensagem.innerHTML= ' ';
    contador=0
}
} 
} 
