window.onload = function(){

    let frutas = [
        {item : 'Abacaxi', valor : 3.00},
        {item : 'Banana', valor : 2.25},
        {item : 'Goiaba', valor : 3.50},
        {item : 'Laranja', valor : 1.80},
        {item : 'Limão', valor : 1.50}   
    ]  

    const cestaDoCliente = document.querySelector("#cestaDoCliente");
    const mostraTotalCompra = document.querySelector("#mostraTotalCompra");
    const produtos = document.querySelector("#produtos");
    
    ( ()=>{
        
        let total = 0;
        
        for (let prod of frutas) {
            let liItem = document.createElement('li');

            for(listaProd in prod) {
                if(listaProd == 'valor') {
                    produtos.appendChild(liItem).setAttribute('data-valor', prod[listaProd]);                       
                } else {
                    produtos.appendChild(liItem).textContent = `${prod[listaProd]}`; 
                }
            } 

            let verificarItem = [];  

            liItem.addEventListener('click', ()=>{

                if(verificarItem.indexOf(cestaDoCliente) == -1) { 
                    let cestaItem = document.createElement('li'); 
                        
                    for(listaProd in prod) {
                        if(listaProd == 'valor') {
                            cestaDoCliente.appendChild(cestaItem).setAttribute('data-valor', prod[listaProd]);   
                            total += prod[listaProd];
                        } else {
                            cestaDoCliente.appendChild(cestaItem).textContent = `${prod[listaProd]}`; 
                        }
                    } 
                    verificarItem.push(cestaDoCliente);
                } else {  
                    for(listaProd in prod) {
                        if(listaProd == 'valor') {
                            produtos.appendChild(liItem).setAttribute('data-valor', prod[listaProd]);                       
                        } else {
                            produtos.appendChild(liItem).textContent = `${prod[listaProd]}`; 
                            alert(`Este item ${prod[listaProd]} ja esta na sua cesta`);                     
                        } 
                    }
                } 
                mostraTotalCompra.value = total.toFixed(2);    
            })
        }       
    })(frutas)
}
