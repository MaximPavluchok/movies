using MovieMosaic.Data.Entities.Identity;

namespace MovieMosaic.Abstract
{
    public interface IJwtTokenService
    {
        Task<string> CreateToken(UserEntity user);
    }
}
