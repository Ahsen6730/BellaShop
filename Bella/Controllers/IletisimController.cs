using Bella.Models;
using Bella.Models.CLS;
using Bella.Models.Data;
using Bella.Models.MDL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bella.Controllers
{
    public class IletisimController : Controller
    {
        // GET: Iletisim
        DatabaseContext db = new DatabaseContext();
        public ActionResult Index()
        {
            var iletisim = db.Iletisim.OrderBy(s => s.ID).ToList();
            return View(iletisim);
        
        }
        [HttpPost]
        public ActionResult Index(Mesaj mesaj)
        {
          
            db.Mesaj.Add(mesaj);
            db.SaveChanges();
            ViewBag.mesaj = "Mesaj Kaydedildi";


            return View();
        }


    }
}