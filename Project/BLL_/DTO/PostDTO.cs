﻿using System;
using System.Collections.Generic;

namespace BLL_.DTO
{
    public class PostDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int User_Id { get; set; }
        public int Tag_Id { get; set; }
        public DateTime Created { get; set; }
    }
}
