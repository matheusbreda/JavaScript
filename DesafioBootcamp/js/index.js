
const btnloginEnter = document.querySelector("#loginEnter")
const txtUser = document.querySelector("#user")
const txtPassword = document.querySelector("#password")

btnloginEnter.addEventListener('click',function(){
  
    fetch('./js/usuario.json').then( resposta => {
        
        let usuario = resposta.json()
            for(let idx in reg){
                if( reg.user == txtUser.value && reg.pws == txtPassword.value){
                    location.href = 'http'
                }else{
                    alert("Usuario ou senha invalida")
                }

            }

    }).catch( deuRuim => alert(""+deuRuim))


})