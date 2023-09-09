using MovieMosaic.Data.Entities.Identity;
using MovieMosaic.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace MovieMosaic.Models
{
    public class UserGetViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Image { get; set; }
        public ICollection<SavedEntity> Saved { get; set; }

    }
}
