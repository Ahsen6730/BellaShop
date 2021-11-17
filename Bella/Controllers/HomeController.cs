using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Bella.Models;
using Bella.Models.CLS;
using Bella.Models.Data;
using Bella.Models.MDL;

namespace Bella.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        DatabaseContext db = new DatabaseContext();
        public ActionResult Index()
        {
           
            return View();
        }
        public ActionResult ShoppingCart()
        {
            
            List<Sepet> sepetlist = new List<Sepet>();
            List<Urun> Urunlist = new List<Urun>();

            if (Kullanicim.Kullanici != null)
            {
                var sp = db.Sepet.Where(s => s.KullanıcıId == Kullanicim.Kullanici.id).ToList();
                foreach (var item in sp)
                {
                    var ur = db.Urun.FirstOrDefault(s => s.ID == item.UrunID);
                    Urunlist.Add(ur);
                }

            }
            else if (Session["sepetlist"] != null)
            {
                var sepetim = (List<Sepet>)Session["sepetlist"];
                foreach (var item in sepetim)
                {
                    var ur = db.Urun.FirstOrDefault(s => s.ID == item.UrunID);
                    Urunlist.Add(ur);
                }

            }
            return View(Urunlist);
        }
        public JsonResult SepetEkle(int id)
        {
            string mesaj = "Sepete Eklendi";
            var Urun = db.Urun.FirstOrDefault(s => s.ID == id);
            if (Urun == null)
            {

                var result2 = new
                {
                    mesaj = "Böyle bir ürün yoktur",
                    success = true
                };
                return this.Json(result2, JsonRequestBehavior.AllowGet);


            }
            List<Sepet> sepetlist = new List<Sepet>();
            if (Session["sepetlist"] != null)
            {
                sepetlist = (List<Sepet>)Session["sepetlist"];


            }
            Sepet sepet = new Sepet();
            sepet.UrunID = Urun.ID;
            sepet.Tar = DateTime.Now;

            if (Kullanicim.Kullanici == null)
            {
                sepetlist.Add(sepet);
                Session["sepetlist"] = sepetlist;
                mesaj = Urun.UrunAdi + mesaj;


            }
            else
            {
                sepetlist.Add(sepet);
                foreach (var item in sepetlist)
                {
                    item.KullanıcıId = Kullanicim.Kullanici.id;
                    db.Sepet.Add(item);
                    db.SaveChanges();

                }

            }


            var result = new
            {
                mesaj = mesaj,
                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult SepetCountGetir()
        {
            int count = 0;
            List<Sepet> sepetlist = new List<Sepet>();
            if (Kullanicim.Kullanici != null)
            {
                var sp = db.Sepet.Where(s => s.KullanıcıId == Kullanicim.Kullanici.id).ToList();
                count = sp.Count;

            }
            else if (Session["sepetlist"] != null)
            {
                sepetlist = (List<Sepet>)Session["sepetlist"];
                count = sepetlist.Count();
            }

            var result = new
            {
                count = count,
                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult SepetIcerikGetir()
        {
            string icerik = "";
            List<Sepet> sepetlist = new List<Sepet>();
            List<Urun> Urunlist = new List<Urun>();

            if (Kullanicim.Kullanici != null)
            {
                var sp = db.Sepet.Where(s => s.KullanıcıId == Kullanicim.Kullanici.id).ToList();
                foreach (var item in sp)
                {
                    var ur = db.Urun.FirstOrDefault(s => s.ID == item.UrunID);
                    Urunlist.Add(ur);
                }

            }
            else if (Session["sepetlist"] != null)
            {
                var sepetim = (List<Sepet>)Session["sepetlist"];
                foreach (var item in sepetim)
                {
                    var ur = db.Urun.FirstOrDefault(s => s.ID == item.UrunID);
                    Urunlist.Add(ur);
                }

            }
            if (Urunlist.Count > 0)
            {
               // var a = SepetKartHtml(Urunlist);
            }

            var result = new
            {
                icerik = icerik,
                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);

        }

        public ActionResult HeaderTop()
        {
            return View();
        }
        public ActionResult Header()
        {
            return View();
        }
        public ActionResult Navigation()
        {
            return View();
        }
        public ActionResult Page()
        {
            return View();
        }
        public ActionResult PageSlides1()
        {

            var slide = db.Slides.OrderBy(s => s.ID).Skip(0).Take(1).ToList();
            return View(slide);

        }
        public ActionResult PageSlides2()
        {
            var slide = db.Slides.OrderBy(s => s.ID).Skip(1).Take(1).ToList();
            return View(slide);
        }
        public ActionResult PageSlides3()
        {
            var slide = db.Slides.OrderBy(s => s.ID).Skip(2).Take(1).ToList();
            return View(slide);

        }

        public ActionResult PageSection()
        {
            var slide = db.Slides.OrderBy(s => s.ID).Skip(3).Take(2).ToList();
            return View(slide);
        }
        public ActionResult PageSection2()
        {

            var coksatan = db.CokSatan.OrderBy(s => s.ID).ToList();
            return View(coksatan);

        }
        public ActionResult PageSection3()
        {
            var Reklam = db.Reklam.OrderBy(s => s.ID).ToList();
            return View(Reklam);
        }
        public ActionResult PageSection4()
        {

            var onecıkan = db.EnCokOneCikan.OrderBy(s => s.ID).ToList();
            return View(onecıkan);

        }
        public ActionResult PageSection5()
        {
            var SonGonderimiz = db.SonGonderimiz.OrderBy(s => s.ID).ToList();
            return View(SonGonderimiz);
        }
        public ActionResult PageSection6()
        {
            var Firma = db.Firma.OrderBy(s => s.ID).ToList();
            return View(Firma);
        }
        public ActionResult PageSection7()
        {
            return View();
        }
        public ActionResult PageSection7TSellers()
        {

            var enyeni = db.EnYeni.OrderBy(s => s.ID).ToList();
            return View(enyeni);
        }
        public ActionResult PageSection7Accessories()
        {
            var aksesuar = db.EnIyiAksesuar.OrderBy(s => s.ID).ToList();
            return View(aksesuar);
        }
        public ActionResult PageSection7Newest()
        {

            var oy = db.EnCokOylanan.OrderBy(s => s.ID).ToList();
            return View(oy);
        }
        public ActionResult PageSection8()
        {
            var Uyari = db.Uyari.OrderBy(s => s.ID).ToList();
            return View(Uyari);
        }
        public ActionResult Fotter()
        {
            return View();
        }
        public ActionResult FotterAboutUs()
        {
            var Hakkimizda = db.Hakkimizda.OrderBy(s => s.ID).ToList();
            return View(Hakkimizda);
        }
        public ActionResult FotterNewsLetter()
        {
            return View();
        }
        public ActionResult FotterInformation()
        {
            return View();
        }
        public ActionResult FotterItemTags()
        {
            return View();
        }
        public ActionResult about()
        {
            return View();
        }
    }
}