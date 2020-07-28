using BLL_.DTO;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL_.Interfaces
{
    public interface IUserService : IService<UserDTO>
    {
        Task<IEnumerable<LikeDTO>> GetLikes(int id);
        Task<IEnumerable<CommentDTO>> GetComments(int id);
        Task<IEnumerable<PostDTO>> GetPosts(int id);
    }
}
