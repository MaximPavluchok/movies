using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Eventing.Reader;
using MovieMosaic.Data.Entities.Identity;

namespace MovieMosaic.Data.Entities
{
    [Table("tblSaved")]
    public class SavedEntity
    {
        /// <summary>
        /// Користувач
        /// </summary>
        [ForeignKey("User")]
        public int UserId { get; set; }

        /// <summary>
        /// Фільм
        /// </summary>
        [ForeignKey("Movies")]
        public int MoviesId { get; set; }

        public virtual UserEntity User { get; set; }
        public virtual MoviesEntity Movies { get; set; }
    }
}
