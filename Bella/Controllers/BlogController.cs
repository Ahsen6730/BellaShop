using Bella.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bella.Controllers
{
    public class BlogController : Controller
    {
        // GET: Blog
        DatabaseContext db = new DatabaseContext();
        public ActionResult IndexBlog()
        {
            var Hakkimizda = db.Hakkimizda.OrderBy(s => s.ID).ToList();
            return View(Hakkimizda);
        }
    }
}