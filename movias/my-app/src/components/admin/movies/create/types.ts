export interface IMoviesCreate {
    name: string;
    description: string;
    age: number;
    categoryId: number[];
    saved: number[];
    imagesUrl: string; 
}
