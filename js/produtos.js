var produtos = [];

function adicionarProdutos() {

    var inProduto = document.getElementById("inProduto");
    var inValor = document.getElementById("inValor");

    // obtém conteúdo dos campos
    var nome = inProduto.value;              
    var unidade = inValor.valueAsNumber;


    if (nome == "" || inValor.value == "" || isNaN(unidade)) {
        alert("Informe corretamente os dados");
        inProduto.focus();
        return;
    }

    // adiciona dados ao vetor de objetos
    produtos.push({ nome: nome, unidade: unidade });

    // limpa campos e posiciona cursor em inProduto
    inProduto.value = "";        
    inValor.value = "";
    inProduto.focus();

    listarProdutos();          
}

var btAdicionar = document.getElementById("btAdicionar");
btAdicionar.addEventListener("click", adicionarProdutos);

function listarProdutos() {
    // verifica se vetor está vazio
    if (produtos.length == 0) {
        alert("Não há produtos na lista");
        return;
    }
    // para concatenar lista de produtos
    var lista = "";

    // percorre os elementos do vetor
    for (var i = 0; i < produtos.length; i++) {
        lista += produtos[i].nome + " - " + produtos[i].unidade + " unidade(s)\n";
    }

    // exibe a lista (em uma única instrunção)
    document.getElementById("outLista").textContent = lista;
}
var btListar = document.getElementById("btListar");
btListar.addEventListener("click", listarProdutos);

function resumirLista() {
    // verifica se vetor está vazio
    if (produtos.length == 0) {
        alert("Não há produtos na lista");
        return;
    }

    var copia = produtos.slice();


    copia.sort(function (a, b) { return a.unidade - b.unidade });

    var resumo = "";

    //menor unidade do vetor ordenado
    var aux = copia[0].unidade;        
    // vetor para inserir nomes de cada unidade
    var nomes = [];                       

    // passa pelos elementos do vetor identificados como unidade
    for (var i = 0; i < copia.length; i++) {
        var copiaItem = copia[i];

        // se é da mesma unidade auxiliar, adiciona ao vetor
        if (copiaItem.unidade == aux) {
            nomes.push(copia[i].nome);
            continue;
        }
        
        // senão, adiciona ao resumo, dados e nomes inseridos em nomes[]
        resumo += aux;
        resumo += " Unidade(s) de cada: ";
        resumo += nomes.length;
        resumo += " Produto(s) - ";

        resumo += (nomes.length / copia.length * 100).toFixed(2) + "%\n";
        var join = nomes.join(", ");
        resumo += "(" + join + ")\n\n";
        aux = copia[i].unidade;         // obtém a nova unidade na ordem
        nomes = [];                   // limpa o vetor dos nomes
        nomes.push(copia[i].nome);    // adiciona o primeiro da nova unidade 
    }
    // adiciona os nomes da última unidade ordenada
    resumo += aux + " Unidade(s) de cada: " + nomes.length + " Produto(s) - ";
    resumo += (nomes.length / copia.length * 100).toFixed(2) + "%\n";
    resumo += "(" + nomes.join(", ") + ")\n\n";

    // altera conteúdo de outLista
    document.getElementById("outLista").textContent = resumo;
}
var btResumir = document.getElementById("btResumir");
btResumir.addEventListener("click", resumirLista);