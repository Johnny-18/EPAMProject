﻿using System.Threading.Tasks;
using BLL_.DTO;
using BLL_.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private ICommentService _commentService;

        public CommentController(ICommentService serv)
        {
            _commentService = serv;
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var comment = await _commentService.Get(id);
            if (comment == null)
                return NotFound();

            return Ok(comment);
        }

        [HttpGet("id/{id}/user")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _commentService.GetUser(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        //[Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody]CommentDTO comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var res = await _commentService.Create(comment);
            if (res != null)
            {
                return Ok(comment);
            }

            return BadRequest();
        }

        //[Authorize]
        [HttpDelete("id/{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _commentService.Get(id);
            if (comment == null)
                return NotFound();

            var res = await _commentService.Remove(comment);
            if (res)
            {
                return Ok("Deleted");
            }

            return BadRequest("Didn't deleted");
        }
    }
}
