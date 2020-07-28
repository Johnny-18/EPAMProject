using AutoMapper;
using BLL_.Interfaces;
using DAL_.Entyties;
using DAL_.Exceptions;
using DAL_.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace BLL_.Services
{
    public class LikeService : ILikeService
    {
        private IUnitOfWork unitOfWork;

        public LikeService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<bool> DeleteLike(int userId, int postId)
        {
            var likes = await unitOfWork.LikeRepository.GetAll();
            var like = likes.Where(s => s.User_Id == userId && s.Post_Id == postId).FirstOrDefault();
            if(like == null)
            {
                throw new LikeException("Like don't exsist.");
            }

            unitOfWork.LikeRepository.Remove(like);

            return await unitOfWork.SaveChangesAsync();
        }

        public async Task<bool> SetLike(int userId, int postId)
        {
            var likes = await unitOfWork.LikeRepository.GetAll();
            var like = likes.Where(s => s.User_Id == userId && s.Post_Id == postId).FirstOrDefault();
            if(like != null)
            {
                throw new LikeException("Like already exsist.");
            }

            Like newLike = new Like
            {
                User_Id = userId,
                Post_Id = postId
            };

            unitOfWork.LikeRepository.Add(newLike);
            return await unitOfWork.SaveChangesAsync();
        }
    }
}
