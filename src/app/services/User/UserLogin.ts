export class UserLogin {

  id: string = "";
  nome: string = "";
  telefone: string = "";
  email: string = "";
  senha: string = "";

  getNome(){

    return this.nome

  }

  setNome(nome:string){

    this.nome = nome;

  }

  getId(){

    return this.id

  }

  setId(id:string){

    this.id = id;

  }

  getTelefone(){

    return this.telefone

  }

  setTelefone(telefone:string){

    this.telefone = telefone;

  }

  getEmail(){

    return this.email

  }

  setEmail(email:string){

    this.email = email;

  }

  getSenha(){

    return this.senha

  }

  setSenha(senha:string){

    this.senha = senha;

  }

}