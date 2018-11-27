var produtos = [];

function adicionarProdutos() {

    var inProduto = document.getElementById("inProduto");
    var inValor = document.getElementById("inValor");

    var nome = inProduto.value;              
    var unidade = inValor.valueAsNumber;

    if (nome == "" || inValor.value == "" || isNaN(unidade)) {
        alert("Informe corretamente os dados");
        inProduto.focus();
        return;
    }

    produtos.push({ nome: nome, unidade: unidade });

    inProduto.value = "";        
    inValor.value = "";
    inProduto.focus();

    listarProdutos();          
}

var btAdicionar = document.getElementById("btAdicionar");
btAdicionar.addEventListener("click", adicionarProdutos);

function listarProdutos() {

    if (produtos.length == 0) {
        alert("Não há produtos na lista");
        return;
    }

    var lista = "";


    for (var i = 0; i < produtos.length; i++) {
        lista += produtos[i].nome + " - " + produtos[i].unidade + " unidade(s)\n";
    }

    document.getElementById("outLista").textContent = lista;
}
var btListar = document.getElementById("btListar");
btListar.addEventListener("click", listarProdutos);

function resumirLista() {

    if (produtos.length == 0) {
        alert("Não há produtos na lista");
        return;
    }

    var copia = produtos.slice();


    copia.sort(function (a, b) { return a.unidade - b.unidade });

    var resumo = "";

    var aux = copia[0].unidade;        

    var nomes = [];                       

    for (var i = 0; i < copia.length; i++) {
        var copiaItem = copia[i];

        if (copiaItem.unidade == aux) {
            nomes.push(copia[i].nome);
            continue;
        }
        
        resumo += aux;
        resumo += " Unidade(s) de cada: ";
        resumo += nomes.length;
        resumo += " Produto(s) - ";

        resumo += (nomes.length / copia.length * 100).toFixed(2) + "%\n";
        var join = nomes.join(", ");
        resumo += "(" + join + ")\n\n";
        aux = copia[i].unidade; 
        nomes = [];
        nomes.push(copia[i].nome); 
    }
    resumo += aux + " Unidade(s) de cada: " + nomes.length + " Produto(s) - ";
    resumo += (nomes.length / copia.length * 100).toFixed(2) + "%\n";
    resumo += "(" + nomes.join(", ") + ")\n\n";
    document.getElementById("outLista").textContent = resumo;
}
var btResumir = document.getElementById("btResumir");
btResumir.addEventListener("click", resumirLista);