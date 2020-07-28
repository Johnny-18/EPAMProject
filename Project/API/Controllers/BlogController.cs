using System.Threading.Tasks;
using AutoMapper;
using BLL_.DTO;
using BLL_.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/blogs")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private IMapper _mapper;
        private IBlogService _blogservice;

        public BlogController(IMapper mapper, IBlogService blogservice)
        {
            _mapper = mapper;
            _blogservice = blogservice;
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetBlog(int id)
        {
            var blog = await _blogservice.Get(id);

            if (blog == null)
                return NotFound();

            return Ok(blog);
        }

        [HttpGet("id/{id}/posts")]
        public async Task<IActionResult> GetPosts(int id)
        {
            var posts = await _blogservice.GetPosts(id);
            if (posts == null)
                return NotFound();

            return Ok(posts);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search()
        {
            var searchStr = Request.Query["search"];

            var blogs = await _blogservice.Search(searchStr);
            if (blogs == null)
                return NotFound();

            return Ok(blogs);
        }

        //[Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateBlog([FromBody]BlogDTO blog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var res = await _blogservice.Create(blog);
            if (res != null)
            {
                return Ok(res);
            }

            return BadRequest("Don't created");   
        }

        //[Authorize]
        [HttpPut]
        public async Task<IActionResult> ChangeBlog([FromBody]BlogDTO updatedBlog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var res = await _blogservice.Update(updatedBlog);
            if (res)
            {
                return Ok(updatedBlog);
            }

            return BadRequest();
        }
    }
}
