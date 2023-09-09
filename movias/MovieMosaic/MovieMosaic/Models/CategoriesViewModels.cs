using System.ComponentModel.DataAnnotations;

namespace MovieMosaic.Models
{
    public class CategoryItemViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class CategoryCreateViewModel
    {
        public string Name { get; set; }
    }

    public class CategoryEditViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
