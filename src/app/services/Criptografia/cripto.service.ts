import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CriptoService {

  alphabet: string[]  = ['','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','t','u','v','w','y','z','1','2','3','4','5','6','7','8','9','@','!','#','$','%','&','*'];

  palavraFinal: string = "";

  constructor() { }

  Criptografar(palavra: string):string{

    this.palavraFinal = "";

    for(var i=0; i< palavra.length; i++){

      if(palavra.charAt(i) == '.'){
        this.palavraFinal.concat(".");
      }else{

        for(var j=0; j<40; j++){          
          if(palavra.charAt(i) == this.alphabet[j]){
            
            var aux = (6*j).toString();            
            this.palavraFinal = this.palavraFinal.concat(aux+"&")            
          }
        }

      }

    }

    return this.palavraFinal;

  }

  Descriptografar(palavra:string){

    var trecho = ""
    var palavraFinal = ""

    for(var i=0; i< palavra.length; i++){

      if(palavra.charAt(i) == '&'){

        var aux = +trecho
        aux = aux/6
        
        palavraFinal = palavraFinal.concat(this.alphabet[aux])

        trecho = ""

      }else{

        trecho = trecho.concat(palavra.charAt(i))

      }

    }

    return palavraFinal
  }

}
