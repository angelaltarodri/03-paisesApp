import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent {

  termino: string = "Peru"
  hayError: boolean = false;
  paises: Country [] = []

  paisesSugeridos: Country [] = []
  mostrarSugerencias: boolean = false;

  constructor (private paisService: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.paisService.buscarPais(this.termino)
      .subscribe( (res) => {
        console.log(res)
        this.paises = [...res]
      }, (err) => {
        this.hayError = true;
        this.paises = [];
      });
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.paisService.buscarPais(termino)
      .subscribe(paises => this.paisesSugeridos = paises.splice(0,5),
      (err) => this.paisesSugeridos = [])
  }

  buscarSugerido(termino:string ) {
    this.buscar(termino);
    this.mostrarSugerencias = false;
  }
}
