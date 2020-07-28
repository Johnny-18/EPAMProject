using AutoMapper;
using BLL_.DTO;
using BLL_.Helpers;
using BLL_.Interfaces;
using BLL_.Services;
using DAL_.Entyties;
using DAL_.Interfaces;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.Tests
{
    public class PostServiceTest
    {
        private Mock<IUnitOfWork> _unitOfWork;
        private IPostService _postService;

        [SetUp]
        public void Setup()
        {
            var mappingConfig = new MapperConfiguration(mc => mc.AddProfile(new AutoMapperProfiles()));

            _unitOfWork = new Mock<IUnitOfWork>();
            _postService = new PostService(_unitOfWork.Object, mappingConfig.CreateMapper());
        }

        [Test]
        public void CreateNewPost_WhenPostIsNotNull_ThenReturnNotNull()
        {
            var post = new PostDTO() { Id = 1 };

            var actual = _postService.Create(post);

            Assert.IsTrue(actual != null);
        }

        [Test]
        public void GetAllPosts_ThenReturnCorrectList()
        {
            var expected = new List<Post>() { new Post(), new Post(), new Post() };

            _unitOfWork.Setup(x => x.PostRepository.GetAll())
                .Returns(Task.FromResult(expected.AsEnumerable()));

            var actual = _postService.GetAll().Result;

            Assert.AreEqual(expected.Count, actual.Count());
        }

        [Test]
        public void GetPostById_ThenReturnCorrectPost()
        {
            const int id = 1;

            _unitOfWork.Setup(x => x.PostRepository.GetById(id))
                .Returns(Task.FromResult(new Post() { Id = id }));

            var actual = _postService.Get(id).Result;

            Assert.True(actual.Id == 1);
        }
    }
}