btFecharJogar = document.getElementById("bt-fechar-jogar");
btAbrirJogar = document.getElementById("bt-abrir-jogar");
ComoJogar = document.getElementById("modal_comojogar");
grid = document.getElementById("grids");
pesquisa = document.getElementById("pesquisa");
previanomes = document.getElementById("previa-nomes");

function insertGrid(so){
    //so = {nome: "Linux", lancamento:2000, nucleo:"monolitico"};
    console.log( so );

    line = '   <div class="container-grid" id="informacoes">';
    for(var i = 0; i< 9 ; i++ )
        line +='<div class="item">'+so[i]+'</div>';
    
     grid.innerHTML = grid.innerHTML + line;
}

pesquisa.addEventListener("keyup", buscaPrevia);

/* Pega todos os dados do SO especificos */
function obterSo(id){

    dados = {'id': id};
    fetch("backend/pesquisa_so.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then( resposta => resposta.json() )
        
    
    .then(dadosResposta => {
       
        insertGrid(dadosResposta)

    }).catch(erro =>{
        console.log("Errro", erro);
    });

}


function soDoDia(){

    //escolher um valor aleatorio
    //copiar a função obterSo e chamar de obterSoDia
    //passar o valor para obterSoDia( alea )
    //remover o insertGrid em obterSoDia
    //no lugar chamar a função salvarSoDia
    //criar a função salvarSoDia que deve pegar os dados do array e salvar em uma variável global ou no localstorage (pesquisar);

}
/* Pega todos os SOs especificos */
function buscaPrevia(){
    
    soname = document.getElementById("pesquisa").value;
    console.log( soname );

    dados = {'soname': soname};

    fetch("backend/busca_previa.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then( resposta => resposta.json() )

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
    previanomes.innerHTML = "";
    //vem do banco de dados
    //so = [{id:"1", nome: "Linux"}, {id:"2", nome: "Unbuntu"}];
    
    line = "";
    //loop para exibir no HTML todos os SOs buscados
    for( var i = 0; i < so.length; i++)
        line +='<div ref="'+so[i].id+'" class="so-previa">'+so[i].nome+'</div>';
 
     previanomes.innerHTML = previanomes.innerHTML + line;
     
     elementos_previa = document.getElementsByClassName("so-previa");
     
    for( var i = 0; i < elementos_previa.length; i++){
        elementos_previa[i].addEventListener("click", function(elem){
            
            var ref = elem.target.getAttribute("ref");
            if(ref != ""){
                obterSo( ref );
            }
            
             previanomes.style.display = "none";
            
        });
    }
}
