using MovieMosaic.Data.Entities;
using MovieMosaic.Models;

namespace MovieMosaic.Models
{
    public class CategoryViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }


    public class MoviesCreateViewModel
    {
        public string Name { get; set; }
        public string OriginalName { get; set; }
        public DateOnly Date_Release { get; set; }
        public string Ratings { get; set; }
        public string ImagesUrl { get; set; }
        public string Description { get; set; }
        public List<int> CategoryId { get; set; }
        public int Age { get; set; }

    }


    public class MoviesGetViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string OriginalName { get; set; }
        public DateOnly Date_Release { get; set; }
        public string Ratings { get; set; }
        public string ImagesUrl { get; set; }
        public string Description { get; set; }
        public List<CategoryViewModel> Categories { get; set; }
        public int Age { get; set; }
    }


}
