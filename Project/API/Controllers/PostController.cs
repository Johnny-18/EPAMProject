using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BLL_.DTO;
using BLL_.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private IPostService _postService;
        private ILikeService _likeService;
        private ITagService _tagService;

        public PostController(
            IPostService postService, 
            ILikeService likeService,
            ITagService tagService)
        {
            _postService = postService;
            _likeService = likeService;
            _tagService = tagService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            var posts = await _postService.GetAll();
            if(posts == null)
            {
                return NotFound();
            }

            return Ok(posts);
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _postService.Get(id);
            if (post == null)
                return NotFound();

            return Ok(post);
        }

        [HttpGet("id/{id}/comments")]
        public async Task<IActionResult> GetComments(int id)
        {
            var comments = await _postService.GetComments(id);
            if (comments == null)
                return NotFound();

            return Ok(comments);
        }

        [HttpGet("id/{id}/likes")]
        public async Task<IActionResult> GetLikes(int id)
        {
            var likes = await _postService.GetLikes(id);
            if (likes == null)
                return NotFound();

            return Ok(likes);
        }

        [HttpGet("id/{id}/images")]
        public async Task<IActionResult> GetImages(int id)
        {
            var images = await _postService.GetImages(id);
            if (images == null)
                return NotFound();

            return Ok(images);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search()
        {
            var searchStr = Request.Query["search"];

            var posts = await _postService.Search(searchStr);
            if (posts == null)
                return NotFound();

            return Ok(posts);
        }

        //[Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody]PostToCreateDTO newPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            TagDTO tagToCreate = await _tagService.GetByName(newPost.TagName);
            if (tagToCreate == null)
            {
                await _tagService.Create(new TagDTO{ Name = newPost.TagName });
                tagToCreate = await _tagService.GetByName(newPost.TagName);
            }

            var postDTO = new PostDTO
            {
                Tag_Id = tagToCreate.Id,
                Title = newPost.Title,
                Text = newPost.Text,
                Blog_Id = newPost.BlogId
            };

            var res = await _postService.Create(postDTO);
            if (res != null)
            {
                return Ok(newPost);
            }

            return BadRequest();
        }

        //[Authorize]
        [HttpPut]
        public async Task<IActionResult> ChangePost([FromBody]PostDTO updatedPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var res = await _postService.Update(updatedPost);
            if (res)
            {
                return Ok(updatedPost);
            }

            return BadRequest();
        }

        [Authorize]
        [HttpPut("id/{id}")]
        public async Task<IActionResult> SetLike(int id)
        {
            var user_id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var post = await _postService.Get(id);
            if (post == null)
                return NotFound();

            var res = await _likeService.SetLike(user_id, id);
            if (res)
            {
                return NoContent();
            }

            return BadRequest();
        }

        [Authorize]
        [HttpPut("id/{id}")]
        public async Task<IActionResult> DeleteLike(int id)
        {
            var user_id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var post = await _postService.Get(id);
            if (post == null)
                return NotFound();

            var res = await _likeService.DeleteLike(user_id, id);
            if (res)
            {
                return NoContent();
            }

            return BadRequest();
        }

        //[Authorize]
        [HttpDelete("id/{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _postService.Get(id);
            if (post.Blog_Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return BadRequest();

            if (post == null)
                return NotFound();

            var res = await _postService.Remove(id);
            if (res)
            {
                return Ok("Deleted");
            }

            return BadRequest("Didn't deleted");
        }
    }
}
