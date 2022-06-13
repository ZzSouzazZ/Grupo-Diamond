import { AuthServiceService } from './../../services/AuthService/auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserLogin } from './../../services/User/UserLogin';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: UserLogin = new UserLogin;
  title = ""

  constructor(
    private auth: AngularFireAuth,
    private authService: AuthServiceService
  ) {

    this.usuario = this.authService.InformacoesUsuario(this.usuario)
    console.log(this.usuario.getNome)
    this.title = this.usuario.getNome()


   }

  ngOnInit(): void {
  }

}
