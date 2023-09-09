using AutoMapper;
using MovieMosaic.Data.Entities;
using MovieMosaic.Models;

namespace MovieMosaic.Mapper
{
    public class AppMapProfile : Profile
    {
        public AppMapProfile()
        {
            CreateMap<CategoryEntity, CategoryItemViewModel>();

            CreateMap<CategoryCreateViewModel, CategoryEntity>();

            CreateMap<MoviesCreateViewModel, MoviesEntity>();


        }
    }
}
