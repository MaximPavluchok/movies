using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Drawing;
using MovieMosaic.Data;
using MovieMosaic.Data.Entities;
using MovieMosaic.Helpers;
using MovieMosaic.Models;
using static System.Net.Mime.MediaTypeNames;
using System.Net.Cache;

namespace MovieMosaic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly AppEFContext _appContext;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public MoviesController(AppEFContext appEFContext, IConfiguration configuration, IMapper mapper)
        {
            _appContext = appEFContext;
            _configuration = configuration;
            _mapper = mapper;

        }

        [HttpGet("list")]
        public async Task<IActionResult> List()
        {
            var model = await _appContext.Movies
                .Include(x => x.Categories)
                .Select(x => new MoviesGetViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    OriginalName = x.OriginalName,
                    Date_Release = x.Date_Release,
                    Ratings = x.Ratings,
                    Age = x.Age,
                    ImagesUrl = x.ImagesUrl,
                    Categories = x.Categories.Select(c => new CategoryViewModel
                    {
                        Id = c.Category.Id,
                        Name = c.Category.Name
                    }).ToList()
                })
                .ToListAsync();

            return Ok(model);
        }

        [HttpPost("AddMovies")]
        public async Task<IActionResult> AddMovies([FromForm] MoviesCreateViewModel model)
        {
            if (model.Name != null)
            {
                var movies = new MoviesEntity
                {
                    Name = model.Name,
                    Description = model.Description,
                    Age=model.Age,
                    ImagesUrl = model.ImagesUrl,
                    OriginalName = model.OriginalName,
                    Date_Release = model.Date_Release,
                    Ratings = model.Ratings,
                };
                _appContext.Add(movies);
                _appContext.SaveChanges();

                movies.Categories = new List<MovieCategoryEntity>();
                foreach (var categoryId in model.CategoryId)
                {
                    var movieCategory = new MovieCategoryEntity
                    {
                        MovieId = movies.Id,
                        CategoryId = categoryId
                    };
                    movies.Categories.Add(movieCategory);
                }
                _appContext.SaveChanges();

                return Ok(movies);
            }
            return BadRequest(404);
        }
        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetMovie(int id)
        {
            try
            {
                var movie = await _appContext.Movies
                    .Include(x => x.Categories)
                    .Where(x => x.Id == id)
                    .Select(x => new MoviesGetViewModel
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        OriginalName = x.OriginalName,
                        Date_Release = x.Date_Release,
                        Ratings = x.Ratings,
                        Age = x.Age,
                        ImagesUrl = x.ImagesUrl,
                        Categories = x.Categories.Select(c => new CategoryViewModel
                        {
                            Id = c.Category.Id,
                            Name = c.Category.Name
                        }).ToList()
                    })
                    .FirstOrDefaultAsync();

                if (movie == null)
                {
                    return NotFound();
                }

                return Ok(movie);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("search/name")]
        public async Task<IActionResult> SearchByName([FromQuery] string query)
        {
            try
            {
                var movies = await _appContext.Movies
                    .Include(x => x.Categories)
                    .Where(x => x.Name.Contains(query))
                    .Select(x => new MoviesGetViewModel
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        OriginalName = x.OriginalName,
                        Date_Release = x.Date_Release,
                        Ratings = x.Ratings,
                        Age = x.Age,
                        ImagesUrl = x.ImagesUrl,
                        Categories = x.Categories.Select(c => new CategoryViewModel
                        {
                            Id = c.Category.Id,
                            Name = c.Category.Name
                        }).ToList()
                    })
                    .ToListAsync();

                return Ok(movies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteMovie(int id)
        {
            try
            {
                var movie = _appContext.Movies.Find(id);

                if (movie == null)
                {
                    return NotFound();
                }

                _appContext.Movies.Remove(movie);
                _appContext.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
