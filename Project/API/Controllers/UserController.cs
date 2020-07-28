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
        private IUserService _userService;

        public UserController(IUserService userService)
        {
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

        [HttpGet]
        [Route("id/{id}/likes")]
        public async Task<IActionResult> GetLikes(int id)
        {
            var likes = await _userService.GetLikes(id);
            if(likes == null)
            {
                return NotFound();
            }

            return Ok(likes);
        }

        [HttpGet]
        [Route("id/{id}/comments")]
        public async Task<IActionResult> GetComments(int id)
        {
            var comments = await _userService.GetComments(id);
            if (comments == null)
            {
                return NotFound();
            }

            return Ok(comments);
        }

        [HttpGet]
        [Route("id/{id}/posts")]
        public async Task<IActionResult> GetPosts(int id)
        {
            var posts = await _userService.GetPosts(id);
            if (posts == null)
            {
                return NotFound();
            }

            return Ok(posts);
        }
    }
}
