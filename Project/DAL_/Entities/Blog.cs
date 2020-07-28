//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace DAL_.Entyties
//{
//    public class Blog
//    {
//        [Key]
//        [ForeignKey("User")]
//        public int Id { get; set; }
//        public string BlogName { get; set; }
//        public User User { get; set; }
//        public ICollection<Post> Posts { get; set; }

//        public Blog()
//        {
//            Posts = new List<Post>();
//        }
//    }
//}
