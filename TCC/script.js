btFecharJogar = document.getElementById("bt-fechar-jogar");
btAbrirJogar = document.getElementById("bt-abrir-jogar");
ComoJogar = document.getElementById("modal_comojogar");
grid = document.getElementById("grids");
pesquisa = document.getElementById("pesquisa");
previanomes = document.getElementById("previa-nomes");

function insertGrid(so){
    so = {nome: "Linux", lancamento:2000, nucleo:"monolitico"};
    
    line = '   <div class="container-grid" id="informacoes">';
    line +='    <div class="item">'+so.nome+'</div>';
    line +='    <div class="item">'+so.lancamento+'</div>';
    line +='    <div class="item">'+so.nucleo+'</div>';
    line +='    <div class="item">X</div>';
    line +='   <div class="item">X</div>';
    line +='    <div class="item">X</div>';
    line +='    <div class="item">X</div>';
    line +='   <div class="item">X</div>';
    line +='   <div class="item">X</div></div>';
     grid.innerHTML = grid.innerHTML + line;
}

pesquisa.addEventListener("keyup", buscaPrevia);

function obterSo(dados){
    
    fetch("backend/pesquisa_so.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then( resposta => resposta.json() )
        
        //resposta.json() ) 
    
    .then(dadosResposta => {
       
        insertGrid(dadosResposta)

    }).catch(erro =>{
        console.log("Errro", erro);
    });

}

function buscaPrevia(dados){
    
    fetch("backend/busca_previa.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then( resposta => resposta.json() )
        
        //resposta.json() ) 
    
    .then(dadosResposta => {
       
        exibirPrevisSO(dadosResposta)

    }).catch(erro =>{
        console.log("Errro", erro);
    });

}

/**/

function fecharModal(){
    ComoJogar.style.display = "none";
}

function abrirModal(){
    ComoJogar.style.display = "block";
}

btFecharJogar.addEventListener("click", fecharModal);
btAbrirJogar.addEventListener("click", abrirModal);

btFecharSobre = document.getElementById("bt-fechar-sobre");
btAbrirSobre = document.getElementById("bt-abrir-sobre");
SobreNos = document.getElementById("modal_sobrenos");

function fecharModal2(){
    SobreNos.style.display = "none";
}

function abrirModal2(){
    SobreNos.style.display = "block";
}

btFecharSobre.addEventListener("click", fecharModal2);
btAbrirSobre.addEventListener("click", abrirModal2);


function exibirPrevisSO(so){
    previanomes.style.display = "block";

    so = [{id:"1", nome: "Linux"}, {id:"1", nome: "Unbuntu"}];
    line = "";
    for( var i = 0; i < so.length; i++)
        line +='<div ref="'+so[i].id+'" class="so-previa">'+so[i].nome+'</div>';
 
     previanomes.innerHTML = previanomes.innerHTML + line;
     
     //pegar os botoes por getElementByClassName 
     //fazer um loop
     //cadastrar a função de clique para cada item no loop
     //a função de clique deve pegar o atributo ref do elemento e enviar para a função obterSo.
     //depois deve colocar o previanomes como display none
}
