export interface IMoviesGetItem{
    id:number;
    name: string;
    description: string;
    age: number;
    saved: number[];
    imagesUrl: string;
    date_Release: string;
    ratings: string;
    originalName: string
    categories: ICategory[];
    categoryIds: number[];
}

export interface ICategory {
    id: number;
    name: string;
}