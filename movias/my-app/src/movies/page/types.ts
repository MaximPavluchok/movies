export {};
export interface IMovieGetItem{
    id:number;
    name: string;
    description: string;
    age: number;
    categoryIds: number[];
    saved: number[];
    imagesUrl: string;
    date_Release: string;
    ratings: string;
    originalName: string;
    categories: ICategory[];
}

export interface ICategory {
    id: number;
    name: string;
}

export interface ISaved {
    userId: number;
    moviesId: number;
    movies:IMovieGetItem[];
}

export interface IUser{
    firstName: string;
    lastName: string;
    image: string;
    saved: ISaved[];
}
