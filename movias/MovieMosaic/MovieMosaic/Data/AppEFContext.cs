using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MovieMosaic.Data.Entities;
using MovieMosaic.Data.Entities.Identity;

namespace MovieMosaic.Data
{
    public class AppEFContext : IdentityDbContext<UserEntity, RoleEntity, int,
        IdentityUserClaim<int>, UserRoleEntity, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public AppEFContext(DbContextOptions<AppEFContext> options)
            : base(options)
        {

        }
        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<MoviesEntity> Movies { get; set; }
        public DbSet<SavedEntity> Saved { get; set; }
        public DbSet<MovieCategoryEntity> MovieCategories { get; set; } 

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRoleEntity>(ur =>
            {
                ur.HasKey(ur => new { ur.UserId, ur.RoleId });

                ur.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(r => r.RoleId)
                    .IsRequired();

                ur.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(u => u.UserId)
                    .IsRequired();
            });

            builder.Entity<SavedEntity>(ur =>
            {
                ur.HasKey(ur => new { ur.UserId, ur.MoviesId });
            });

            builder.Entity<MovieCategoryEntity>()
                .HasKey(mc => new { mc.MovieId, mc.CategoryId });

            builder.Entity<MovieCategoryEntity>()
                .HasOne(mc => mc.Movie)
                .WithMany(m => m.Categories)
                .HasForeignKey(mc => mc.MovieId);

            builder.Entity<MovieCategoryEntity>()
                .HasOne(mc => mc.Category)
                .WithMany(c => c.MovieCategories)
                .HasForeignKey(mc => mc.CategoryId);
        }
    }
}
