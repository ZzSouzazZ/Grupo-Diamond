import { User } from 'ionic';
import { CriptoService } from './../Criptografia/cripto.service';
import { ToastServiceService } from './../toastService/toast-service.service';
import { UserLogin } from './../User/UserLogin';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth"
import { AngularFireDatabase } from "@angular/fire/database"
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  usuario: UserLogin = new UserLogin;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private db: AngularFirestore,
    private toastService: ToastServiceService,
    private cripto: CriptoService

  ) { }

    logOut(){

      this.afAuth.signOut();

    }

    login(email: string, senha: string){

      this.afAuth.signInWithEmailAndPassword(email,senha)
      .then (
        () =>{
          this.router.navigate(['/homeApp']);
          
        })
        .catch(err => {
          var auxString = err.code;
          if(auxString == "auth/network-request-failed"){
            this.toastService.mostrarToast(
              "|ERRO| Verifique sua conexão com a internet",
              3000,
              'bottom'
            )
          }
        })
    }

    criarConta(email:any, senha:any,nome:string,telefone:string){

      var qnt = 0;

      this.db.collection('/Usuarios')
      .snapshotChanges()
      .subscribe(response => {

        qnt = response.length;
        console.log(qnt);                       

        this.afAuth.createUserWithEmailAndPassword(email,senha)
      .then(() => {
         
        for(var i=0;i<4;i++){
          if(i == 0){
            this.usuario.setNome(nome)
          }
          if(i == 1){
            this.usuario.setTelefone(telefone);
          }
          if(i == 2){
            this.usuario.setEmail(email);
          }
          if(i == 3){
            this.usuario.setEmail(senha)
          }
        }   

        for(var i=0;i<4;i++){
          if(i == 0){
            nome=  this.cripto.Criptografar(nome.toString()).toString();
          }
          if(i == 1){
            telefone = this.cripto.Criptografar(telefone.toString()).toString();
          }
          if(i == 2){
            email = this.cripto.Criptografar(email.toString())            
          }
          if(i == 3){
            senha = this.cripto.Criptografar(senha.toString()).toString();
          }
        }               
  
          this.db.collection('/Usuarios').doc((qnt).toString()).set({
            Nome: nome,            
            Telefone: telefone,
            Email: email,
            Senha: senha            
          })
  
          this.router.navigate(['/home'])

      }).catch(err =>{
  
        var auxString: string;
        var Error: string;
  
        auxString = err.code;
        console.log(auxString)
        console.log(err.code)
  
        if(auxString == "auth/email-already-in-use"){
  
          Error = "O email já possui cadastro";
          this.toastService.mostrarToast(Error,3000,'bottom');
  
        }else if(auxString == "auth/invalid-email"){

          Error = "O E-mail não pôde ser localizado";
          this.toastService.mostrarToast(Error,3000,'bottom');

        }else{

          Error = "| ERRO | Tente novamente mais tarde";
          this.toastService.mostrarToast(Error,3000,'bottom');

        }
      })

      })      
  
    }

    InformacoesUsuario(userDB: UserLogin){

     
      this.afAuth.onAuthStateChanged(usuario => {

        if(usuario){

          userDB.setEmail(usuario.email!)
          var emailCripto = this.cripto.Criptografar(userDB.getEmail())
          var desc = this.cripto.Descriptografar(emailCripto)
          
          
          this.db.collection('/Usuarios')
          .snapshotChanges()
          .subscribe(users => {

            users.map(map => {

              if(emailCripto == map.payload.doc.get('Email')){

                userDB.setId('1');
                userDB.setNome(this.cripto.Descriptografar(map.payload.doc.get('Nome')))
                userDB.setTelefone(this.cripto.Descriptografar(map.payload.doc.get('Telefone')))
                userDB.setSenha(this.cripto.Descriptografar(map.payload.doc.get('Senha')))
                userDB.setEmail(this.cripto.Descriptografar(map.payload.doc.get('Email')))

              }else if(map.payload.doc.get('Email') == 'asarmond82@gmail.com'){

                userDB.setId('0');
                userDB.setNome(map.payload.doc.get('Nome'))
                userDB.setTelefone(map.payload.doc.get('Telefone'))
                userDB.setSenha(map.payload.doc.get('Senha'))
                userDB.setEmail(map.payload.doc.get('Email'))
                
              }

            })

          })

        }else{

          console.log("Usuario Não logado")
          this.router.navigate(['/login'])

        }

      })
      
      return userDB;

    }

}
