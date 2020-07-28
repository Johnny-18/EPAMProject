using System;
using System.Collections.Generic;
using System.Text;

namespace BLL_.DTO
{
    public class PostToCreateDTO
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public string TagName { get; set; }
        public int BlogId { get; set; }
    }
}
