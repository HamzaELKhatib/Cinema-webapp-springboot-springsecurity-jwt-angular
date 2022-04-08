import { Artist } from "./artist";
import { Genre } from "./genre";
import { Nationality } from "./nationality";

export interface Movie {
    id: number;
    title: string;
    releaseYear: number;
    runtime: number;
    plot: string;
    poster: string;
    boxOffice: number;
    genre: Genre;
    nationality: Nationality;
    director: Artist;
    writer: Artist;
    actors: Artist[];
}
