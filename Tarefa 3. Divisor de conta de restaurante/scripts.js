var pessoas = [];
var produtos = []; //0 - nome / 1 - preco
var quantidade_produtos = {}; //isso eh um mapinha muito bonito e cheiroso
var total_a_pagar = {};
var taxa10 = {};


function AdicionaProduto(){
    //pega a referencia do produto
    var produto = document.getElementById("produto").value;
    //pega a referencia do preço do produto
    var valorProduto = document.getElementById("valor-produto").value;

    console.log(produto);

    //se um dos dois estiver vazio, retorna e nao faz nada.
    if(produto=="" || valorProduto == "")
        return;

    //adiciona o produto na nossa var de produtos
    var prod = [produto, valorProduto];
    produtos.push(prod);
    console.log(prod);
    quantidade_produtos[produto] = 0;

    //reseta os campos
    document.getElementById("produto").value = "";
    document.getElementById("valor-produto").value = "";
    
    //adiciona o produto na nossa lista no html!
    var lista_pessoas = document.getElementById("lista-produtos");
    var li = document.createElement("li");
    li.innerHTML = produto + " - R$" + valorProduto;
    lista_pessoas.append(li);

    BuildTable();

}

function AdicionaPessoa(){

    //pega a referencia da pessoa
    var pessoa = document.getElementById("pessoa").value;

    //se a pessoa nao digitou nada e clicou em add, retorna e nao faz nada!
    if(pessoa == "")
        return;

    //adiciona a pessoa na nossa var de pessoas
    pessoas.push(pessoa);

    //reseta o valor do input para vazio
    document.getElementById("pessoa").value = ""; 

    //adiciona a pessoa na nossa lista no html!
    var lista_pessoas = document.getElementById("lista-pessoas");
    var li = document.createElement("li");
    li.innerHTML = pessoa;
    lista_pessoas.append(li);

    BuildTable();
}

function BuildTable(){
    var tableDiv = document.getElementById("table-div");

    var oldTable = document.getElementById("table-conta");
    if(oldTable != null) oldTable.remove();

    var table = document.createElement("table");
    table.id = "table-conta";



    var firsttr = document.createElement("tr");
    var firsttd = document.createElement("td");
    
    firsttd.innerHTML = "-";

    firsttr.append(firsttd);

    //popula a primeira linha
    for(var i = 0; i < produtos.length; i++){
        var td = document.createElement("td");
        td.innerHTML = produtos[i][0];
        firsttr.append(td);
    }
    var td = document.createElement("td");
    td.innerHTML = "Taxa 10%";
    firsttr.append(td);
    table.append(firsttr);

    
    for(var i = 0; i < pessoas.length; i++){
        var tr = document.createElement("tr");
        var td = document.createElement("td");

        td.innerHTML = pessoas[i];
        tr.append(td);

        for(var j = 0; j < produtos.length; j++){
            var tdcheck = document.createElement("td");
            var checkbox = document.createElement("INPUT");
            checkbox.setAttribute("type", "checkbox");
            checkbox.id = pessoas[i] + "_" + produtos[j][0];
            checkbox.addEventListener("click", ToogleCheckBox);

            tdcheck.append(checkbox);

            tr.append(tdcheck);
        }
        var tdcheck = document.createElement("td");
        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.id = pessoas[i] + "_taxa";
        checkbox.addEventListener("click", ToogleCheckBoxTaxa);

        tdcheck.append(checkbox);

        tr.append(tdcheck);
        table.append(tr);
    }

    tableDiv.append(table);
}

function ToogleCheckBoxTaxa(){
    var data = this.id.split("_");
    var pessoa = data[0];

    taxa10[pessoa] = this.checked;
    CalculateBill();
}

function ToogleCheckBox(){

    var data = this.id.split("_");
    var prod = data[1];

    if(this.checked == 1){
        quantidade_produtos[prod]++;
        console.log(prod + ": " + quantidade_produtos[prod]);
    }
    else{
        quantidade_produtos[prod]--;
        if(quantidade_produtos[prod] < 0) quantidade_produtos[prod] = 0;

        console.log(prod + ": " + quantidade_produtos[prod]);
    }
    CalculateBill();
}

function CalculateBill(){
    for(var i = 0; i < pessoas.length; i++){
        var total = 0;

        for(var j = 0; j < produtos.length; j++){
            var data = document.getElementById(pessoas[i] + "_" + produtos[j][0]);
            if(data.checked == 1){
                var precoDoItem = produtos[j][1];
                var pessoasQueConsumiram = quantidade_produtos[produtos[j][0]];

                total += precoDoItem / pessoasQueConsumiram;
            }
        }
        if(taxa10[pessoas[i]] == 1){
            total *= 1.10;
        }
        total_a_pagar[pessoas[i]] = (Math.round(total * 100) / 100).toFixed(2);
    }
    BuildBillTable();
}

function BuildBillTable(){
    var tableDiv = document.getElementById("table-bill");

    var oldTable = document.getElementById("table-bill-filled");
    if(oldTable != null) oldTable.remove();

    var table = document.createElement("table");
    table.id = "table-bill-filled";

    var firsttr = document.createElement("tr");
    var tdname = document.createElement("td");
    tdname.innerHTML = "Nome";

    var tdtotal = document.createElement("td");
    tdtotal.innerHTML = "Total";

    firsttr.append(tdname);
    firsttr.append(tdtotal);
    table.append(firsttr);

    //popula a primeira linha
    for(var i = 0; i < pessoas.length; i++){
        var tr = document.createElement("tr");

        var tdnome = document.createElement("td");
        tdnome.innerHTML = pessoas[i];
        tr.append(tdnome);

        var tdcusto = document.createElement("td");
        tdcusto.innerHTML = "R$: "+ total_a_pagar[pessoas[i]];
        tr.append(tdcusto);

        table.append(tr);
    }
    tableDiv.append(table);
}