using System.Threading.Tasks;
using BLL_.DTO;
using BLL_.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;
        public readonly IConfiguration _configuration;

        public AuthController(IAuthService authService,
            IUserService userService, IConfiguration configuration)
        {
            _configuration = configuration;
            _userService = userService;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]UserForRegisterDTO user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model invalid");
            }

            var createdUser = await _authService.Register(user);
            if (createdUser is null)
            {
                return BadRequest("Fail to create user");
            }

            return Ok(createdUser);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]UserForLoginDTO user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model invalid");

            }
            //check for valid
            var userFromDb = await _authService.LogIn(user);
            if (userFromDb == null)
            {
                return NoContent();
            }

            //generate token
            var userToken = await _authService.GenerateToken(userFromDb,
                _configuration.GetSection("AuthKey:Token").Value);

            return Ok(new
            {
                userToken,
                userFromDb
            });
        }
    }
}
