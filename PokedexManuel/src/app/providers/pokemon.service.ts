import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Pokemon } from '../modelo/Pokemon';


@Injectable()

export class PokemonServiceProvider {


    private URL = "https://pokeapi.co/api/v2";


    constructor(public http: HttpClient) {

    }

    nombresPokemons(): Promise<String[]> {

        let promise = new Promise<String[]>((resolve, reject) => {

            this.http.get(this.URL + "/pokemon?limit=1304").toPromise()

                .then((data: any) => {

                    let nombres = new Array<String>();

                    data.results.forEach((poke: any) => {

                        nombres.push(poke.name);

                    });

                    resolve(nombres);

                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

        return promise;
    }

    getPokemons(offset: number, limit: number): Promise<Pokemon[]> {

        let promise = new Promise<Pokemon[]>((resolve, reject) => {

            this.http.get(this.URL + "/pokemon?limit=" + limit + "&offset=" + offset).toPromise()

                .then((data: any) => {

                    let pokemons = new Array<Pokemon>();

                    data.results.forEach((poke: any) => {

                        this.http.get(poke.url).toPromise()

                            .then((data: any) => {

                                let tipos = new Array<string>();

                                data.types.forEach((tipo: any) => {

                                    tipos.push(tipo.type.name);

                                });

                                let habilidades = new Array<string>();

                                data.abilities.forEach((habilidad: any) => {

                                    habilidades.push(habilidad.ability.name);

                                });

                                let img = data.sprites.other?.["showdown"]?.front_default ||
                                    data.sprites.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ||
                                    data.sprites.other?.["official-artwork"]?.front_default ||
                                    data.sprites.other?.["home"]?.front_default ||
                                    data.sprites.front_default;

                                let pokemon = new Pokemon(data.id, data.name, img, tipos, habilidades, data.weight, data.height);

                                pokemons.push(pokemon);

                                pokemons.sort((a, b) => a.id - b.id);

                            })

                            .catch((error: Error) => {

                                reject(error.message);

                            });

                    });


                    resolve(pokemons);


                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

        return promise;

    }//end_getPokemons

    buscarPokemon(buscado: String[]): Promise<Pokemon[]> {

        let promise = new Promise<Pokemon[]>((resolve, reject) => {

            let pokemons = new Array<Pokemon>();

            for (let i = 0; i < buscado.length; i++) {

                this.http.get(this.URL + "/pokemon/" + buscado[i]).toPromise()

                    .then((data: any) => {

                        let tipos = new Array<string>();

                        data.types.forEach((tipo: any) => {

                            tipos.push(tipo.type.name);

                        });

                        let habilidades = new Array<string>();

                        data.abilities.forEach((habilidad: any) => {

                            habilidades.push(habilidad.ability.name);

                        });

                        let img = data.sprites.other?.["showdown"]?.front_default ||
                            data.sprites.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ||
                            data.sprites.other?.["official-artwork"]?.front_default ||
                            data.sprites.other?.["home"]?.front_default ||
                            data.sprites.front_default;

                        let pokemon = new Pokemon(data.id, data.name, img, tipos, habilidades, data.weight, data.height);

                        pokemons.push(pokemon);

                        pokemons.sort((a, b) => a.id - b.id);

                    })

                    .catch((error: Error) => {

                        reject(error.message);

                    });

            }

            resolve(pokemons);

        });

        return promise;

    }//end_buscarPokemon

}