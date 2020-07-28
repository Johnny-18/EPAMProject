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
    public class UserServiceTest
    {
        private Mock<IUnitOfWork> _unitOfWork;
        private IUserService _userService;

        [SetUp]
        public void Setup()
        {
            var mappingConfig = new MapperConfiguration(mc => mc.AddProfile(new AutoMapperProfiles()));

            _unitOfWork = new Mock<IUnitOfWork>();
            _userService = new UserService(_unitOfWork.Object, mappingConfig.CreateMapper());
        }

        [Test]
        public void GetUserById_ThenReturnCorrectUser()
        {
            const int id = 1;

            _unitOfWork.Setup(x => x.UserRepository.GetById(id))
                .Returns(Task.FromResult(new User() { Id = id }));

            var actual = _userService.Get(id).Result;

            Assert.True(actual.Id == 1);
        }

        [Test]
        public void GetAllUsers_ThenReturnCorrectList()
        {
            var expected = new List<User>() { new User(), new User() };

            _unitOfWork.Setup(x => x.UserRepository.GetAll())
                .Returns(Task.FromResult(expected.AsEnumerable()));

            var actual = _userService.GetAll().Result;

            Assert.AreEqual(expected.Count, actual.Count());
        }
    }
}
