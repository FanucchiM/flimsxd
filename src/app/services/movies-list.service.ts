import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Pelicula {
  Titulo: string;
  Genero: string;
  Anio: number;
  Descripcion: string;
  ImgPath: string;
  Duracion: number;
  agregadoAFavoritos?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesListService {
  
  private peliculas: Pelicula[] = [];
  private favoritos: Pelicula[] = [];
  private favoritosSubject: BehaviorSubject<Pelicula[]> = new BehaviorSubject<Pelicula[]>([]);

  constructor(private http: HttpClient) {
    this.getAll().subscribe(peliculas => {
      this.peliculas = peliculas;
    });
  }

  getAll(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>('data/peliculas.json').pipe(
      map(peliculas => peliculas || [])
    );
  }

  agregarFavorito(pelicula: Pelicula) {
    if (!this.favoritos.includes(pelicula)) {
      this.favoritos.push(pelicula);
      this.favoritosSubject.next(this.favoritos);
    } else {
      console.error('La película ya está en favoritos.');
    }
  }

  private actualizarEstadoFavoritos() {
    this.favoritosSubject.next(this.favoritos);
    // Actualizar la propiedad agregadoAFavoritos en la lista original de películas
    this.favoritos.forEach(favorito => {
      const peliculaOriginal = this.peliculas.find(p => p.Titulo === favorito.Titulo);
      if (peliculaOriginal) {
        peliculaOriginal.agregadoAFavoritos = true;
      }
    });
  }

  getFavorites(): Observable<Pelicula[]> {
    return this.favoritosSubject.asObservable();
  }

  quitarFavorito(pelicula: Pelicula) {
    const index = this.favoritos.findIndex(p => p.Titulo === pelicula.Titulo);
    if (index !== -1) {
      this.favoritos.splice(index, 1);
      this.actualizarEstadoFavoritos();
    } else {
      console.error('La película no está en la lista de favoritos.');
    }
  }


}
