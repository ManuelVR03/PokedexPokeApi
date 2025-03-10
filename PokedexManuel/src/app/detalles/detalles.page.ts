import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pokemon } from '../modelo/Pokemon';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: false
})
export class DetallesPage{

  pokemon?: Pokemon;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.pokemon) {
      this.playPokemonCry(this.pokemon.id);
    }
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  playPokemonCry(pokemonId: number) {
      const audio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`);
      audio.play().catch(error => console.error('Error al reproducir el sonido:', error));
  }

}
