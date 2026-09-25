btFecharJogar = document.getElementById("bt-fechar-jogar");
btAbrirJogar = document.getElementById("bt-abrir-jogar");
ComoJogar = document.getElementById("modal_comojogar");
grid = document.getElementById("grids");
pesquisa = document.getElementById("pesquisa");
previanomes = document.getElementById("previa-nomes");
tentativas = 0;

window.addEventListener('DOMContentLoaded', () => {
    soDoDia();
});

function insertGrid(so){
    console.log( so );
    var sodia = JSON.parse(localStorage.getItem('soDoDia'))
    line = '   <div class="container-grid" id="informacoes">';
    for(var i = 0; i< 9 ; i++ ){
        if(sodia[i] == so[i]){
            line +='<div class="item correct">'+so[i]+'</div>';
        }else if (i == 1 || i == 8){
            if (parseInt(sodia[i]) > parseInt(so[i])){
                line +='<div class="item error"> <i class="fa-solid fa-circle-up"></i>'+so[i]+'</div>';
            } else{
                line +='<div class="item error"> <i class="fa-solid fa-circle-down"></i>'+so[i]+'</div>';
            }
        } else { 
            line +='<div class="item error">'+so[i]+'</div>';
        }
    }
    grid.innerHTML = grid.innerHTML + line;
}   
    
pesquisa.addEventListener("keyup", buscaPrevia);

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

function obterSoDia(id, callback){
    dados = { id: id }; 
    fetch('backend/pesquisa_so.php', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify(dados) 
    }) 
    .then(resposta => resposta.json()) 

    .then(dadosResposta => { 
        console.log(dadosResposta)
        if (callback) {
            callback(dadosResposta);
        } else {
            insertGrid(dadosResposta); 
        }
    })
    .catch(erro => { 
        console.log('Erro:', erro); 
    }); 
}

function salvarSoDia(dadosSo) {
    localStorage.setItem('soDoDia', JSON.stringify(dadosSo));
    console.log(dadosSo);
}

function soDoDia(){
        const generate = seededRandom(100);
        let idAleatorio = Math.floor(generate() * 42 + 1);
        console.log(idAleatorio);

        obterSoDia(idAleatorio, function(dadosResposta){
            salvarSoDia(dadosResposta)
        })
}

function seededRandom(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

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
    })
    
    .catch(erro =>{
        console.log("Errro", erro);
    });
}


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
    
    line = "";

    for( var i = 0; i < so.length; i++)
        line +='<div ref="'+so[i].id+'" class="so-previa">'+so[i].nome+'</div>';
 
     previanomes.innerHTML = previanomes.innerHTML + line;
     
     elementos_previa = document.getElementsByClassName("so-previa");
     
    for( var i = 0; i < elementos_previa.length; i++){
        elementos_previa[i].addEventListener("click", function(elem){
            atualizaTentativa();
            var ref = elem.target.getAttribute("ref");
            if(ref != ""){
                obterSo( ref );                
            }            
            previanomes.style.display = "none";            
        });
    }
}

function atualizaTentativa(){
    tentativas++;
    tentativa = document.getElementById("pont_atual");
    tentativa.innerHTML = tentativas;
}