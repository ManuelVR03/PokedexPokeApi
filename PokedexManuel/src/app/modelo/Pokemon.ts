import { PokemonInterface } from "./PokemonInterface";

export class Pokemon implements PokemonInterface {
    constructor(
        public id: number,
        public nombre: string, 
        public imagen: string, 
        public tipos: string[], 
        public habilidades: string[], 
        public peso: number, 
        public altura: number
    ){}
}