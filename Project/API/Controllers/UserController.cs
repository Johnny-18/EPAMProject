using System.Threading.Tasks;
using AutoMapper;
using BLL_.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IMapper _mapper;
        private IUserService _userService;

        public UserController(IMapper mapper, IUserService userService)
        {
            _mapper = mapper;
            _userService = userService;
        }

        [HttpGet]
        [Route("id/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.Get(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetAll();
            if (users == null)
                return NotFound();

            return Ok(users);
        }
    }
}
