using DAL_.Entyties;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL_.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<IEnumerable<Like>> GetLikes(int id);
        Task<IEnumerable<Post>> GetPosts(int id);
        Task<IEnumerable<Comment>> GetComments(int id);
    }
}
