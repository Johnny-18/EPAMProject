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
    public class TagService : ITagService
    {
        private IUnitOfWork unitOfWork;
        private IMapper mapper;

        public TagService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }
        public async Task<TagDTO> Create(TagDTO item)
        {
            if (item == null)
                throw new ArgumentNullException();

            unitOfWork.TagRepository.Add(mapper.Map<Tag>(item));
            if (await unitOfWork.SaveChangesAsync())
            {
                return item;
            }

            return null;
        }

        public async Task<TagDTO> Get(int id)
        {
            if (id <= 0)
                throw new InvalidIdException("Id must be more than 0");

            var tag = await unitOfWork.TagRepository.GetById(id);
            return mapper.Map<TagDTO>(tag);
        }

        public async Task<TagDTO> GetByName(string tagName)
        {
            if (tagName == null)
                throw new ArgumentNullException();

            var tags = await unitOfWork.TagRepository.GetAll();
            var tag = tags.Where(x => x.Name == tagName).FirstOrDefault();

            return mapper.Map<TagDTO>(tag);
        }

        public async Task<IEnumerable<TagDTO>> GetAll()
        {
            var tags = await unitOfWork.TagRepository.GetAll();
            return mapper.Map<IEnumerable<TagDTO>>(tags);
        }

        public async Task<IEnumerable<PostDTO>> GetPosts(int id)
        {
            if (id <= 0)
                throw new InvalidIdException("Id must be more than 0");

            var posts = await unitOfWork.TagRepository.GetPosts(id);
            return mapper.Map<IEnumerable<PostDTO>>(posts);
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

        public async Task<bool> Remove(TagDTO item)
        {
            if (item == null)
                throw new ArgumentNullException();

            return await Remove(item.Id);
        }

        public async Task<bool> Update(TagDTO item)
        {
            if (item == null)
                throw new ArgumentNullException();

            unitOfWork.TagRepository.Update(mapper.Map<Tag>(item));
            if (await unitOfWork.SaveChangesAsync())
            {
                return true;
            }

            return false;
        }
    }
}
