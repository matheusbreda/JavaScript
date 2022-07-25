
import {clientes} from './clientes.js'
import {produtos} from './produtos.js'

const listMenu = document.querySelectorAll("#listMenu > li")

let janelaAberta = []

listMenu.forEach(item =>{
    item.addEventListener('click', function(){

        if(janelaAberta.length != 0){
            let fecharJanela = document.querySelector(`#${janelaAberta[0]}`)
            fecharJanela.classList.add('fechar')
            janelaAberta = []
        }

        let janela = document.querySelector(`#${item.dataset.janela}`)
        janela.classList.remove('fechar');  
        janelaAberta.push(item.dataset.janela)

    });

})

//Clientes

const codCliente  = document.querySelector("#codCliente")
const nomeCliente = document.querySelector("#nomeCliente")
const dataCadCli  = document.querySelector("#dataCadCli")

let i=0

codCliente.value = clientes[i].codCliente
nomeCliente.value = clientes[i].nomeCliente
dataCadCli.value = clientes[i].dataCadCli

const btnA = document.querySelector('#proxCli')
const btnV = document.querySelector('#antCli')

btnA.addEventListener('click',function(){
    i++
    if(i < clientes.length){
        codCliente.value = clientes[i].codCliente
        nomeCliente.value = clientes[i].nomeCliente
        dataCadCli.value = clientes[i].dataCadCli
    }else{
        alert('nao ha mais registros')
        i--
    }
})

btnV.addEventListener('click',function(){
    i--
    if(i >= 0){
        codCliente.value = clientes[i].codCliente
        nomeCliente.value = clientes[i].nomeCliente
        dataCadCli.value = clientes[i].dataCadCli
    }else{
        alert('nao ha mais registros')
        i++
    }
})

const novoCli   = document.querySelector('#novoCli')
const salvarCli = document.querySelector('#salvarCli')
let salvarStatus;

novoCli.addEventListener('click', function(){
    const data = new Date()
    const dataFormatada = data.toLocaleDateString('pt-BR',{timeZone: 'UTC'})
    codCliente.value = clientes.length + 1
    nomeCliente.value ='';
    dataCadCli.value = dataFormatada
    salvarStatus = true;
})

salvarCli.addEventListener('click', function(){

    if(salvarStatus){
        clientes.push({
            'codCliente': codCliente.value,
            'nomeCliente': nomeCliente.value,
            'dataCadCli': dataCadCli.value
        })

        alert('Dados cadastrados com sucesso!')
        codCliente.value = clientes[i].codCliente
        nomeCliente.value = clientes[i].nomeCliente
        dataCadCli.value = clientes[i].dataCadCli        
        salvarStatus=false;

    }else{
        alert('Clique em Novo para adicionar um novo registro')
    }
})

//Produtos

const codProduto        = document.querySelector("#codProduto")
const descProduto       = document.querySelector("#descProduto")
const precoProduto      = document.querySelector("#precoProduto")
const qtdEstoqueProd    = document.querySelector("#qtdEstoqueProd")

let j=0

codProduto.value = produtos[j].codProduto
descProduto.value = produtos[j].descProduto
precoProduto.value = produtos[j].precoProduto
qtdEstoqueProd.value = produtos[j].qtdEstoqueProd

const btnAv = document.querySelector('#proxProd')
const btnVo = document.querySelector('#antProd')

btnAv.addEventListener('click',function(){
    j++
    if(j < produtos.length) {
        codProduto.value = produtos[j].codProduto
        descProduto.value = produtos[j].descProduto
        precoProduto.value = produtos[j].precoProduto
        qtdEstoqueProd.value = produtos[j].qtdEstoqueProd
    }else{
        alert('nao ha mais registros')
        j--
    }
})

btnVo.addEventListener('click',function(){
    j--
    if(j >= 0) {
        codProduto.value = produtos[j].codProduto
        descProduto.value = produtos[j].descProduto
        precoProduto.value = produtos[j].precoProduto
        qtdEstoqueProd.value = produtos[j].qtdEstoqueProd
    }else{
        alert('nao ha mais registros')
        j++
    }
})

const novoProd   = document.querySelector('#novoProd')
const salvarProd = document.querySelector('#salvarProd')

let salvarStatusProd;

novoProd.addEventListener('click',function(){
    codProduto.value = produtos.length + 1
    descProduto.value = '';
    precoProduto.value = '';
    qtdEstoqueProd.value = '';
    salvarStatusProd = true;
})

salvarProd.addEventListener('click', function(){
    if(salvarStatusProd){
        produtos.push({
            'codProduto' : codProduto.value,
            'descProduto' : descProduto.value,
            'precoProduto' : precoProduto.value,
            'qtdEstoqueProd' : qtdEstoqueProd.value
        })

        alert('Dados cadastrados com sucesso!')
        codProduto.value = produtos[j].codProduto
        descProduto.value = produtos[j].descProduto
        precoProduto.value = produtos[j].precoProduto
        qtdEstoqueProd.value = produtos[j].qtdEstoqueProd
        salvarStatusProd = false;
    }else{
        alert('Clique em Novo para adicionar um novo registro')
    }
})

//pedidos

const codCliPedido = document.querySelector("#codCliPedido");
const nomeCliPedido= document.querySelector("#nomeCliPedido");
const iCodProduto  = document.querySelector("#iCodProduto");
const iDecProduto  = document.querySelector("#iDecProduto");
const iPrecoProduto = document.querySelector("#iPrecoProduto");
const iQtdProduto = document.querySelector("#iQtdProduto");
const valorTotal = document.querySelector("#valorTotal");

codCliPedido.addEventListener('blur', function(){

    for(let cli of clientes){
        if(codCliPedido.value == cli.codCliente){
            nomeCliPedido.value = cli.nomeCliente
        }
    }

})

iCodProduto.addEventListener('blur', function(){
    for(let pro of produtos){
        if(iCodProduto.value == pro.codProduto){
            iDecProduto.value = pro.descProduto
            iPrecoProduto.value = pro.precoProduto
        }
    }
})

const lancarItemPedido = document.querySelector('#lancarItemPedido')
const tabelaItensPedido= document.querySelector('.tabelaItensPedido')

let subtotal=0;
let totalGeral=0;
let verificaItemPedido = []

lancarItemPedido.addEventListener('click', function(){
    if(verificaItemPedido.indexOf(iCodProduto.value)== -1){
        let trNova = document.createElement('tr')
        let tdItem = document.createElement('td')
        let tdDesc = document.createElement('td')
        let tdPreco = document.createElement('td')
        let tdQtd = document.createElement('td')
        let tdSubTotal = document.createElement('td')
        let tdAcao = document.createElement('td')
        
        trNova.appendChild(tdItem)
        trNova.appendChild(tdDesc)
        trNova.appendChild(tdPreco)
        trNova.appendChild(tdQtd)
        trNova.appendChild(tdSubTotal)

        tdItem.textContent =  iCodProduto.value
        tdDesc.textContent =  iDecProduto.value
        tdPreco.textContent=  iPrecoProduto.value
        tdQtd.textContent  =  iQtdProduto.value
        subtotal =  Number(iPrecoProduto.value) * Number(iQtdProduto.value)
        tdSubTotal.textContent = subtotal.toFixed(2)
        totalGeral = (totalGeral + subtotal)
        valorTotal.textContent = `R$ ${totalGeral.toFixed(2)}`

        tabelaItensPedido.appendChild(trNova)

        verificaItemPedido.push(iCodProduto.value)
    } else {
        alert('Item ja cadastrado')
    }
})

// botão fechar

const fecharJanCliente = document.querySelector('.fecharJanCliente')
const fecharJanProduto = document.querySelector('.fecharJanProduto')
const fecharJanPedido = document.querySelector('.fecharJanPedido')

fecharJanCliente.addEventListener('click', function(){
    let fecharJanela = document.querySelector(`#${janelaAberta[0]}`)
    fecharJanela.classList.add('fechar')
    janelaAberta = []
})
fecharJanProduto.addEventListener('click', function(){
    let fecharJanela = document.querySelector(`#${janelaAberta[0]}`)
    fecharJanela.classList.add('fechar')
    janelaAberta = []
})
fecharJanPedido.addEventListener('click', function(){
    let fecharJanela = document.querySelector(`#${janelaAberta[0]}`)
    fecharJanela.classList.add('fechar')
    janelaAberta = []
})

    








