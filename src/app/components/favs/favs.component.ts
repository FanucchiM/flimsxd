import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListService, Pelicula } from '../../services/movies-list.service'; // Importa Pelicula desde el servicio

@Component({
  selector: 'app-favs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favs.component.html',
  styleUrl: './favs.component.css'
})

export class FavsComponent implements OnInit {
  
  peliculas: Pelicula[] = [];

  constructor(private moviesService: MoviesListService) { }

  ngOnInit() {
    this.moviesService.getFavorites().subscribe(data => {
      console.log('Películas favoritas:', data);
      this.peliculas = data;
    });
  }
  
  quitarDeFavoritos(pelicula: Pelicula) {
    this.moviesService.quitarFavorito(pelicula);
  }
}
