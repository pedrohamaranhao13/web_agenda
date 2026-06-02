import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-autenticar',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar.html',
  styleUrl: './autenticar.css',
})
export class Autenticar {

  http = inject(HttpClient);

  mensagemErro = signal<string>('');

  formAutenticar = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    senha : new FormControl('', [Validators.required])
  });

  autenticar() {

    this.mensagemErro.set('');

    this.http.post('http://localhost:8082/api/usuario/autenticar', this.formAutenticar.value)
      .subscribe({ 
            next: (data: any) => { 
              this.formAutenticar.reset();  

              sessionStorage.setItem('usuario', JSON.stringify(data));
              location.href = "/dashboard"
            }, 
            error: (e) => { 
              this.mensagemErro.set(e.error); 
            } 
      });
  }

}
