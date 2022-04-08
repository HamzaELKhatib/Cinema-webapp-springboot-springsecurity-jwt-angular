import { Nationality } from "./nationality";
enum artistType {
  ACTOR,
  DIRECTOR,
  WRITER
}
export interface Artist {
    id: number;
    firstName: string;
    lastName: string;
  fullName: string;
  dateOfBirth: string;
  bio: string;
  photoUrl :string;
  type: artistType;
  nationality: Nationality;

}
