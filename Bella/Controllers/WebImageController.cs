using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bella.Controllers
{
    public class WebImageController : Controller
    {
        // GET: WebImage
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ImageUpload()
        { return View();

        }
        [HttpPost]
        public ActionResult ImageUpload(HttpPostedFileBase uploadfile)
        {
            if (uploadfile.ContentLength > 0)
            {
                string filePath = Path.Combine(Server.MapPath("~/assets/img"), Guid.NewGuid().ToString() + "_" + Path.GetFileName(uploadfile.FileName));
                uploadfile.SaveAs(filePath);
            }

            return View();
        }
    }
}