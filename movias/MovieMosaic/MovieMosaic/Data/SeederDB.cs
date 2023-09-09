using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MovieMosaic.Constants;
using MovieMosaic.Data.Entities;
using MovieMosaic.Data.Entities.Identity;

namespace MovieMosaic.Data
{
    public static class SeederDB
    {
        public static void SeedData(this IApplicationBuilder app)
        {
            using(var scope=app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var service = scope.ServiceProvider;
                var context = service.GetRequiredService<AppEFContext>();
                var userNamager = service.GetRequiredService<UserManager<UserEntity>>();
                var roleNamager = service.GetRequiredService<RoleManager<RoleEntity>>();
                context.Database.Migrate();

                if (!context.Categories.Any())
                {
                    CategoryEntity categoryEntity = new CategoryEntity()
                    {
                        Name = "Комедія",
                    };
                    context.Categories.Add(categoryEntity);
                    context.SaveChanges();
                }
                if (!context.Roles.Any())
                {
                    foreach (string name in Roles.All)
                    {
                        var role = new RoleEntity
                        {
                            Name = name
                        };
                        var result = roleNamager.CreateAsync(role).Result;
                    }
                }
                if (!context.Users.Any())
                {
                    var user = new UserEntity()
                    {
                        FirstName = "Максим",
                        LastName = "Павлючок",
                        Email = "admin@gmail.com",
                        UserName = "admin@gmail.com",
                        Image = "https://cdn.discordapp.com/attachments/965645827035000862/1148379196280799342/lolo-foto.png"
                    };
                    var result = userNamager.CreateAsync(user, "123456").Result;
                    if (result.Succeeded)
                    {
                        result = userNamager.AddToRoleAsync(user, Roles.Admin).Result;
                    }
                }

            }
        }
    }
}
