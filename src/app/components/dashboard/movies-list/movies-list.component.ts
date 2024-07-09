import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListService } from '../../../services/movies-list.service';
import { Pelicula } from '../../../services/movies-list.service';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent {

  peliculas: Pelicula [] = [];

  constructor(private moviesService: MoviesListService) { } 

  ngOnInit() {
    this.moviesService.getAll().subscribe(data => {
      this.peliculas = data;
      // Marcamos las películas que ya están en favoritos
      this.moviesService.getFavorites().subscribe(favoritos => {
        this.peliculas.forEach(pelicula => {
          pelicula.agregadoAFavoritos = favoritos.some(f => f.Titulo === pelicula.Titulo);
        });
      });
    });
  }
  agregarAFavoritos(pelicula: Pelicula) {
    console.log(pelicula)
    this.moviesService.agregarFavorito(pelicula);
    pelicula.agregadoAFavoritos = true;
  }
}
