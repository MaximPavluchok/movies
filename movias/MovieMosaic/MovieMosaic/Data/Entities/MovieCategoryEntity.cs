using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace MovieMosaic.Data.Entities
{
    [Keyless]
    public class MovieCategoryEntity
    {
        public int MovieId { get; set; }
        public MoviesEntity Movie { get; set; }

        public int CategoryId { get; set; }
        public CategoryEntity Category { get; set; }
    }
}
