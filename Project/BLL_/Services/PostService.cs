using AutoMapper;
using BLL_.DTO;
using BLL_.Interfaces;
using DAL_.Entyties;
using DAL_.Exceptions;
using DAL_.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLL_.Services
{
    public class PostService : IPostService
    {
        private IUnitOfWork unitOfWork;
        private IMapper mapper;

        public PostService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<PostDTO> Create(PostDTO item)
        {
            if (item == null)
                throw new ArgumentNullException();

            if (ValidatePostToCreate(item))
            {
                unitOfWork.PostRepository.Add(mapper.Map<Post>(item));
                if (await unitOfWork.SaveChangesAsync())
                {
                    return item;
                }
            }

            return null;
        }

        public async Task<PostDTO> Get(int id)
        {
            if (id <= 0)
                throw new InvalidIdException("Id must be more than 0");

            var post = await unitOfWork.PostRepository.GetById(id);
            return mapper.Map<PostDTO>(post);
        }

        public async Task<IEnumerable<PostDTO>> GetAll()
        {
            var posts = await unitOfWork.PostRepository.GetAll();
            return mapper.Map<IEnumerable<PostDTO>>(posts);
        }

        public async Task<BlogDTO> GetBlog(int id)
        {
            if (id <= 0)
                throw new InvalidIdException("Id must be more than 0");

            var blog = await unitOfWork.PostRepository.GetBlog(id);
            return mapper.Map<BlogDTO>(blog);
        }

        public async Task<IEnumerable<CommentDTO>> GetComments(int id)
        {
            if (id <= 0)
                throw new InvalidIdException("Id must be more than 0");

            var comments = await unitOfWork.PostRepository.GetComments(id);
            return mapper.Map<IEnumerable<CommentDTO>>(comments);
        }

        public async Task<IEnumerable<ImageDTO>> GetImages(int id)
        {
            if (id <= 0)
                throw new InvalidIdException("Id must be more than 0");

            var images = await unitOfWork.PostRepository.GetImages(id);
            return mapper.Map<IEnumerable<ImageDTO>>(images);
        }

        public async Task<IEnumerable<LikeDTO>> GetLikes(int id)
        {
            if (id <= 0)
                throw new InvalidIdException("Id must be more than 0");

            var likes = await unitOfWork.PostRepository.GetLikes(id);
            return mapper.Map<IEnumerable<LikeDTO>>(likes);
        }

        public async Task<TagDTO> GetTag(int id)
        {
            if (id <= 0)
                throw new InvalidIdException("Id must be more than 0");

            var tag = await unitOfWork.PostRepository.GetTag(id);
            return mapper.Map<TagDTO>(tag);
        }

        public async Task<bool> Remove(int id)
        {
            if (id <= 0)
                throw new InvalidIdException("Id must be more than 0");

            unitOfWork.PostRepository.Remove(id);
            if (await unitOfWork.SaveChangesAsync())
            {
                return true;
            }
            return false;
        }

        public async Task<bool> Remove(PostDTO item)
        {
            if (item == null)
                throw new ArgumentNullException();

            return await Remove(item.Id);
        }

        public async Task<bool> Update(PostDTO item)
        {
            if (item == null)
                throw new ArgumentNullException();

            unitOfWork.PostRepository.Update(mapper.Map<Post>(item));
            if (await unitOfWork.SaveChangesAsync())
            {
                return true;
            }

            return false;
        }

        public async Task<IEnumerable<PostDTO>> Search(string searchStr)
        {
            if (searchStr == null || searchStr == String.Empty)
                throw new ArgumentNullException();

            var posts = await unitOfWork.PostRepository.GetAll();
            var postDTOs = mapper.Map<IEnumerable<PostDTO>>(posts);

            var filtered = new List<PostDTO>();
            string searchStrModified = searchStr.ToLower().Replace(" ", "");

            if(searchStrModified.IndexOf('#') == -1)
            {
                return SearchByText(searchStrModified, postDTOs, filtered);
            }

            return SearchByTag(searchStrModified, postDTOs, filtered);
        }

        private IEnumerable<PostDTO> SearchByTag(string searchStr, 
                                                IEnumerable<PostDTO> postDTOs,
                                                List<PostDTO> filtered)
        {
            foreach (var postDTO in postDTOs)
            {
                string name = postDTO.Tag.Name.ToLower().Replace(" ", "");
                if (name.IndexOf(searchStr) != -1)
                {
                    filtered.Add(postDTO);
                }
            }

            return filtered;
        }

        private IEnumerable<PostDTO> SearchByText(string searchStr, 
                                                  IEnumerable<PostDTO> postDTOs,
                                                  List<PostDTO> filtered)
        {
            foreach (var postDTO in postDTOs)
            {
                string text = postDTO.Text.ToLower().Replace(" ", "");
                if (text.IndexOf(searchStr) != -1)
                {
                    filtered.Add(postDTO);
                }
            }

            return filtered;
        }

        private bool ValidatePostToCreate(PostDTO item)
        {
            var posts = unitOfWork.PostRepository.GetAll().Result;
            if (posts != null)
            {
                var findOverlapPost = posts.Where(x => x.Title == item.Title || x.Text == item.Text).FirstOrDefault();
                if (findOverlapPost != null)
                    return false;
            }

            return true;
        }
    }
}
