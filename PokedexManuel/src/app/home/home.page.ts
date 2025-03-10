import { Component, OnInit } from '@angular/core';
import { PokemonServiceProvider } from '../providers/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../modelo/Pokemon';
import { ModalController } from '@ionic/angular';
import { DetallesPage } from '../detalles/detalles.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  public pokemons = new Array<Pokemon>();
  public paginaActual = 1;
  public limitePagina = 9;
  public totalPokemons = 1304;
  public namesPokemons = new Array<String>();
  public buscado = '';

  constructor(private pokemonService: PokemonServiceProvider,
    private Http: HttpClient, private modalController: ModalController) { }

  ngOnInit(): void {

    this.nombresPokemons();
    this.loadPokemons();

  }

  nombresPokemons() {
    this.pokemonService.nombresPokemons()
      .then((total: String[]) => {
        this.namesPokemons = total;
        console.log(this.namesPokemons);
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  buscarPokemon(buscado: string) {
    buscado = buscado.toLowerCase();
    if (buscado === '') {
      this.loadPokemons();
      return;
    }
    let pokemonsBuscar = new Array<String>();
    for (let i = 0; i < this.namesPokemons.length; i++) {
      if (this.namesPokemons[i].includes(buscado)) {
        pokemonsBuscar.push(this.namesPokemons[i]);
      }
    }
    if (pokemonsBuscar.length === 0) {
      alert('No se ha encontrado ningun pokemon con ese nombre');
      this.loadPokemons();
      this.buscado = '';
    }else {
    this.pokemonService.buscarPokemon(pokemonsBuscar)
      .then((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
        console.log(this.pokemons);
      })
      .catch((error: string) => {
        console.log(error);
      });
    }
  }

  loadPokemons() {
    this.pokemonService.getPokemons((this.paginaActual - 1) * this.limitePagina, this.limitePagina)
      .then((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
        console.log(this.pokemons);
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  primeraPagina() {
    if (this.paginaActual === 1) {
      return;
    }
    this.paginaActual = 1;
    this.loadPokemons();
  }

  ultimaPagina() {
    if (this.paginaActual === Math.ceil(this.totalPokemons / this.limitePagina)) {
      return;
    }
    this.paginaActual = Math.ceil(this.totalPokemons / this.limitePagina);
    this.loadPokemons();
  }

  paginaSiguiente() {
    if (this.paginaActual === Math.ceil(this.totalPokemons / this.limitePagina)) {
      return;
    }
    this.paginaActual++;
    this.loadPokemons();
  }

  paginaAnterior() {
    if (this.paginaActual === 1) {
      return;
    }
    this.paginaActual--;
    this.loadPokemons();
  }

  async detallesPokemon(pokemon: Pokemon) {
    const modal = await this.modalController.create({
      component: DetallesPage,
      componentProps: {
        pokemon: pokemon
      }
    });
    await modal.present();
  }

}

