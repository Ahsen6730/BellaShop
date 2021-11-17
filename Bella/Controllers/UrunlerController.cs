using Bella.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bella.Controllers
{
    public class UrunlerController : Controller
    {
        // GET: Urunler
        DatabaseContext db = new DatabaseContext();
        public ActionResult IndexUrun()
        {
            var Urun = db.Urun.OrderBy(s => s.ID).ToList();
            return View(Urun);
        }

        public ActionResult UrunDetay(int Id)
        {
            var Urun = db.Urun.Where(s => s.ID == Id).FirstOrDefault();
            return View(Urun);
        }

    }
}