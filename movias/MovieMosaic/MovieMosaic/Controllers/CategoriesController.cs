using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using MovieMosaic.Data;
using MovieMosaic.Data.Entities;
using MovieMosaic.Helpers;
using MovieMosaic.Models;

namespace MovieMosaic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AppEFContext _appEFContext;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public CategoriesController(AppEFContext appEFContext, IConfiguration configuration,
            IMapper mapper)
        {
            _appEFContext = appEFContext;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpGet("list")]
        public async Task<IActionResult> List()
        {
            var result = await _appEFContext.Categories
                .Select(x => _mapper.Map<CategoryItemViewModel>(x))
                .ToListAsync();
            return Ok(result);
        }
        [HttpGet("{categoryIds}")]
        public async Task<IActionResult> GetCategoryNames(string categoryIds)
        {
            var categoryIdArray = categoryIds.Split(',').Select(int.Parse).ToList();

            var categoryNames = await _appEFContext.Categories
                .Where(c => categoryIdArray.Contains(c.Id))
                .Select(c => c.Name)
                .ToListAsync();

            return Ok(categoryNames);
        }


        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _appEFContext.Categories
                .Where(x => x.Id == id)
                .Select(x => _mapper.Map<CategoryItemViewModel>(x))
                .ToListAsync();
            if (result.Count > 0)
            {
                return Ok(result[0]);
            }
            else { return NotFound(); }
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromForm] CategoryCreateViewModel model)
        {
            var category = _mapper.Map<CategoryEntity>(model);
            await _appEFContext.AddAsync(category);
            await _appEFContext.SaveChangesAsync();
            return Ok(category);
        }

        [HttpPut("edit")]
        public async Task<IActionResult> Edit([FromForm] CategoryEditViewModel model)
        {
            var category = await _appEFContext.Categories.SingleOrDefaultAsync(x => x.Id == model.Id);
            if (category == null)
                return NotFound();

            String imageNewName = string.Empty;
            category.Name = model.Name; 
            await _appEFContext.SaveChangesAsync();
            return Ok(category);
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _appEFContext.Categories.SingleOrDefaultAsync(x => x.Id == id);
            if (category == null)
                return NotFound();

            var dirSave = Path.Combine(Directory.GetCurrentDirectory(), "images");
            string[] sizes = ((string)_configuration.GetValue<string>("ImageSizes")).Split(" ");
            _appEFContext.Categories.Remove(category);
            await _appEFContext.SaveChangesAsync();
            return Ok();
        }

    }
}
