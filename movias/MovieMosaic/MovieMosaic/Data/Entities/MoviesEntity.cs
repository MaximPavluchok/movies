using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieMosaic.Data.Entities
{
    [Table("tblMovies")]
    public class MoviesEntity
    {
        [Key]
        public int Id { get; set; }
        [Required, StringLength(255)]
        public string Name { get; set; }
        [StringLength(4000)]
        public string Description { get; set; }
        public bool IsDelete { get; set; }
        public int Age { get; set; }
        public string OriginalName { get; set; }
        public DateOnly Date_Release { get; set; }
        public string Ratings { get; set; }
        public string ImagesUrl { get; set; }
        public virtual ICollection<SavedEntity> Saved { get; set; }
        public virtual ICollection<MovieCategoryEntity> Categories { get; set; }
    }
}
