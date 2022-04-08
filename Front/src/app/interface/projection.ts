import { Hall } from "./hall";
import { Movie } from "./movie";

export interface Projection {
    id : number; 
    startTime : Date;
    movie : Movie;
    hall : Hall;
}