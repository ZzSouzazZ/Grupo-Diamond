import { ToastServiceService } from './../../services/toastService/toast-service.service';
import { AuthServiceService } from './../../services/AuthService/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  formularioCriarConta: FormGroup;

  LogIf: boolean = false;
  ChoseIf: boolean = true;
  CreateIf: boolean = false;

  constructor( 
    private formBuilder: FormBuilder,
    private auth: AuthServiceService,
    private toast: ToastServiceService
    ) { 

    this.formulario = formBuilder.group({
        email: formBuilder.control('',Validators.required),
        senha: formBuilder.control('',Validators.required),
    })

    this.formularioCriarConta = formBuilder.group({
      nome: formBuilder.control('Arthur',Validators.required),
      email: formBuilder.control('asarmond82@gmail.com',Validators.required),
      telefone: formBuilder.control('31975547967',Validators.required),
      senha: formBuilder.control('Arthur@1',Validators.required),
      confirmacao: formBuilder.control('Arthur@1',Validators.required),
  })

   }

  ngOnInit(): void {

  }

  onSubmit(){



  }

  onCreteNewAccount(){

    var email;
    var senha;
    var confirmacao;

    email = this.formularioCriarConta.get('email')?.value;
    senha =  this.formularioCriarConta.get('senha')?.value;
    confirmacao = this.formularioCriarConta.get('confirmacao')?.value;

    if(senha.length >= 2){

      if(senha == confirmacao){

        var simbolo: boolean = false;
        var numero: boolean = false;
        var maiuscula: boolean = false;
  
        for(var i=0; i<senha.length;i++){
  
          if(senha.charAt(i) == '@' || senha.charAt(i) == '!' || senha.charAt(i) == '$' || senha.charAt(i) == '%' || senha.charAt(i) == '*' || senha.charAt(i) == '&'){

            simbolo = true
            console.log("Simbolo"+i)

          }else if(senha.charAt(i) == '1' || senha.charAt(i) == '2' || senha.charAt(i) == '3' || senha.charAt(i) == '4' || senha.charAt(i) == '5' || senha.charAt(i) == '6' || senha.charAt(i) == '7' || senha.charAt(i) == '8' || senha.charAt(i) == '9' || senha.charAt(i) == '0'){

            numero = true
            console.log("Numero: "+i)

          }else if(senha.charAt(i).toUpperCase() == senha.charAt(i)){

            maiuscula = true
            console.log("Maiuscula: "+i)

          }
  
        }

        if(simbolo == true){
          if(numero == true){
            if(maiuscula == true){

              this.auth.criarConta(
                this.formularioCriarConta.get('email')?.value,
                this.formularioCriarConta.get('senha')?.value,
                this.formularioCriarConta.get('nome')?.value,
                this.formularioCriarConta.get('telefone')?.value,
              )

            }else{
              this.toast.mostrarToast("A senha deve conter 1 letra maiuscula",3000,'bottom')
            }
          }else{
            this.toast.mostrarToast("A senha deve conter 1 número",3000,'bottom')
          }
        }else{
          this.toast.mostrarToast("A senha deve conter 1 simbolo",3000,'bottom')
        }
  
      }else{
  
        this.toast.mostrarToast("As senhas não são iguais",3000,'bottom')
  
      }

    }else{

      this.toast.mostrarToast("A senha deve ter mais 8 caracteres",3000,'bottom')

    }        

  }

  CriarNova(){

    this.CreateIf = true;
    this.ChoseIf = false;
    this.LogIf = false

  }


  LogIn(){

    this.LogIf = true;
    this.ChoseIf = false;
    this.CreateIf = false

  }

}
