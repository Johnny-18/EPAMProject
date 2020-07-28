//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;
//using AutoMapper;
//using BLL_.DTO;
//using BLL_.Interfaces;
//using DAL_.Entyties;
//using DAL_.Exceptions;
//using DAL_.Interfaces;

//namespace BLL_.Services
//{
//    public class BlogService : IBlogService
//    {
//        private IUnitOfWork unitOfWork;
//        private IMapper mapper;

//        public BlogService(IUnitOfWork unitOfWork, 
//            IMapper mapper)
//        {
//            this.unitOfWork = unitOfWork;
//            this.mapper = mapper;
//        }

//        public async Task<BlogDTO> Create(BlogDTO item)
//        {
//            if (item == null)
//                throw new ArgumentNullException();

//            var blog = mapper.Map<BlogDTO, Blog>(item);

//            unitOfWork.BlogRepository.Add(blog);
//            if(await unitOfWork.SaveChangesAsync())
//            {
//                return item;
//            }

//            return null;
//        }

//        public async Task<BlogDTO> Get(int id)
//        {
//            if (id <= 0)
//                throw new InvalidIdException("Id must be more than 0");

//            var blog = await unitOfWork.BlogRepository.GetById(id);

//            return mapper.Map<Blog, BlogDTO>(blog);
//        }

//        public async Task<IEnumerable<BlogDTO>> GetAll()
//        {
//            var blogs = await unitOfWork.BlogRepository.GetAll();

//            return mapper.Map<IEnumerable<Blog>, IEnumerable<BlogDTO>>(blogs);
//        }

//        public async Task<IEnumerable<PostDTO>> GetPosts(int id)
//        {
//            if (id <= 0)
//                throw new InvalidIdException("Id must be more than 0");

//            var posts = await unitOfWork.BlogRepository.GetPosts(id);

//            return mapper.Map<IEnumerable<Post>, IEnumerable<PostDTO>>(posts);
//        }

//        public async Task<bool> Remove(int id)
//        {
//            if (id <= 0)
//                throw new InvalidIdException("Id must be more than 0");

//            var blog = await unitOfWork.BlogRepository.GetById(id);

//            unitOfWork.BlogRepository.Remove(blog);
//            if (await unitOfWork.SaveChangesAsync())
//            {
//                return true;
//            }

//            return false;
//        }

//        public async Task<bool> Remove(BlogDTO item)
//        {
//            if (item == null)
//                throw new ArgumentNullException();

//            var blog = mapper.Map<BlogDTO, Blog>(item);

//            unitOfWork.BlogRepository.Remove(blog);
//            if (await unitOfWork.SaveChangesAsync())
//            {
//                return true;
//            }

//            return false;
//        }

//        public async Task<bool> Update(BlogDTO item)
//        {
//            if (item == null)
//                throw new ArgumentNullException();

//            var blog = mapper.Map<BlogDTO, Blog>(item);

//            unitOfWork.BlogRepository.Update(blog);
//            if(await unitOfWork.SaveChangesAsync())
//            {
//                return true;
//            }

//            return false;
//        }
//    }
//}
