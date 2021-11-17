using Bella.Models;
using Bella.Models.CLS;
using Bella.Models.Data;
using Bella.Models.MDL;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bella.Controllers

{
    [Authorize]

    public class AdminController : Controller
    {
        DatabaseContext db = new DatabaseContext();
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AltMenu()
        {
            return View();
        }
        public ActionResult SolMenu()
        {
            return View();
        }
        public ActionResult UstMenu()
        {
            return View();
        }


        //-----------------Urun Ekle------------------------
        public ActionResult Urunekle()
        {
            var Urun = db.Urun.ToList();
            return View(Urun);


        }

        public ActionResult Uruneklekismi()
        {
            return View();

        }
        private string ResimYukle(HttpPostedFileBase Resim)
        {
            string filePath = "";
            string Id = Guid.NewGuid().ToString();
            if (Resim.ContentLength > 0)
            {
                filePath = Path.Combine(Server.MapPath("~/assets/img/"), Id + "_" + Path.GetFileName(Resim.FileName));
                Resim.SaveAs(filePath);
            }
            return "/assets/img/" + Id + "_" + Resim.FileName;
        }

        [HttpPost]
        public ActionResult Uruneklekismi(Urun a, HttpPostedFileBase resim)
        {
            if (resim != null)

            {
                a.Resim = ResimYukle(resim);
            }
            if (a.ID == 0)
            {
                db.Urun.Add(a);
                db.SaveChanges();
                ViewBag.mesaj = "Ürün Eklendi";

            }
            else
            {
                var Urun = db.Urun.FirstOrDefault(s => s.ID == a.ID);
                Urun.UrunAdi = a.UrunAdi;
                Urun.UrunAciklama = a.UrunAciklama;
                Urun.UrunDetayliAciklama = a.UrunDetayliAciklama;
                Urun.YildizSayisi = a.YildizSayisi;


                if (a.Resim != null)

                {

                    Urun.Resim = a.Resim;

                }


                Urun.Fiyat = a.Fiyat;

                Urun.ID = a.ID;
                db.SaveChanges();
                ViewBag.mesaj = "Ürün Güncellendi";



            }

            var uf = db.UrunFiyat.Where(s => s.UrunID == a.ID).OrderByDescending(s => s.ID).FirstOrDefault();
            if (uf.Fiyat != a.Fiyat || uf == null)
            {
                UrunFiyat ufiyat = new UrunFiyat();
                ufiyat.Fiyat = a.Fiyat;
                ufiyat.Durum = 1;
                ufiyat.UrunID = a.ID;
                db.UrunFiyat.Add(ufiyat);
                db.SaveChanges();
            }

            return Redirect("/Admin/Urunekle");
        }

        public JsonResult UrunGetir(int id)
        {

            var Sonuc = db.Urun.Where(p => p.Durum == 0).Where(a => a.ID == id).Select(x => new
            {
                ID = x.ID,
                UrunAdi = x.UrunAdi,
                UrunAciklama = x.UrunAciklama,
                UrunDetayliAciklama = x.UrunDetayliAciklama,
                YildizSayisi = x.YildizSayisi,
                Fiyat = x.UrunFİyatları.Count() > 0 ? x.UrunFİyatları.OrderByDescending(b => b.ID).FirstOrDefault().Fiyat : "0",


            })
                .ToList();
            return this.Json(Sonuc, JsonRequestBehavior.AllowGet);

        }

        public JsonResult UrunListGetir(int limit, int offset, string search, string order)
        {
            if (search == null) { search = ""; }

            var satirlar = db.Urun.Where(p => p.Durum == 0).Where(a => a.UrunAdi.Contains(search) || a.UrunAciklama.Contains(search) || a.UrunDetayliAciklama.Contains(search) || a.YildizSayisi.Contains(search) || a.Fiyat.Contains(search) || a.Resim.Contains(search))
                .OrderByDescending(a => a.ID).Skip(offset).Take(limit).Select(x => new
                {
                    ID = x.ID,
                    UrunAdi = x.UrunAdi,
                    UrunAciklama = x.UrunAciklama,
                    UrunDetayliAciklama = x.UrunDetayliAciklama,
                    YildizSayisi = x.YildizSayisi,
                    Fiyat = x.UrunFİyatları.Count() > 0 ? x.UrunFİyatları.OrderByDescending(b => b.ID).FirstOrDefault().Fiyat : "0",
                    Resim = x.Resim
                })
                .ToList();
            int cnt = db.Urun.Where(p => p.Durum == 0).Where(a => a.UrunAdi.Contains(search) || a.UrunAciklama.Contains(search) || a.UrunDetayliAciklama.Contains(search) || a.YildizSayisi.Contains(search) || a.Fiyat.Contains(search) || a.Resim.Contains(search)).Count();

            var result = new
            {

                rows = satirlar,
                total = cnt,
                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ProjePasif(int ID)
        {
            Urun Urun = new Urun();
            Urun = db.Urun.Find(ID);
            Urun.Durum = 2;
            if (ModelState.IsValid)
            {
                db.Entry(Urun).State = EntityState.Modified;
                db.SaveChanges();

            }
            var result = new
            {


                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        //-----------------SLİDES EKLE------------------------
        public ActionResult SlidesEkle()
        {
            var slide = db.Slides.ToList();
            return View(slide);

        }
        [HttpPost]
        public ActionResult SlidesEkle(Slides a, HttpPostedFileBase resim)
        {
            if (resim != null)

            {
                a.Resim = ResimYukle(resim);
            }
            if (a.ID == 0)
            {
                db.Slides.Add(a);
                db.SaveChanges();
                ViewBag.mesaj = "Slide Eklendi";
            }
            else
            {
                var slide = db.Slides.FirstOrDefault(s => s.ID == a.ID);
                slide.Baslik = a.Baslik;
                slide.Butonyazi = a.Butonyazi;
                slide.Orta = a.Orta;

                if (a.Resim != null)

                {

                    slide.Resim = a.Resim;

                }
               slide.ID = a.ID;
                db.SaveChanges();
                ViewBag.mesaj = "Slide Güncellendi";

            }

            return Redirect("/Admin/SlidesEkle");
        }


        public JsonResult SlideGetir(int id)
        {

            var Sonuc = db.Slides.Where(p => p.Durum == 0).Where(a => a.ID == id).Select(x => new
            {
                ID = x.ID,
                Baslik = x.Baslik,
                Orta = x.Orta,
                Butonyazi = x.Butonyazi,


            })
                .ToList();
            return this.Json(Sonuc, JsonRequestBehavior.AllowGet);

        }

        public JsonResult SlideListGetir(int limit, int offset, string search, string order)
        {
            if (search == null) { search = ""; }

            var satirlar = db.Slides.Where(p => p.Durum == 0).Where(a => a.Baslik.Contains(search) || a.Butonyazi.Contains(search) || a.Orta.Contains(search) || a.Resim.Contains(search))
                .OrderByDescending(a => a.ID).Skip(offset).Take(limit).Select(x => new
                {
                    ID = x.ID,
                    Baslik = x.Baslik,
                    Orta = x.Orta,
                    Butonyazi = x.Butonyazi,
                    Resim = x.Resim
                })
                .ToList();
            int cnt = db.Slides.Where(a => a.Baslik.Contains(search) || a.Orta.Contains(search) || a.Butonyazi.Contains(search) || a.Resim.Contains(search)).Count();


            var result = new
            {

                rows = satirlar,
                total = cnt,
                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SlidesPasif(int ID)
        {
            Slides slide = new Slides();
            slide = db.Slides.Find(ID);
            slide.Durum = 2;
            if (ModelState.IsValid)
            {
                db.Entry(slide).State = EntityState.Modified;
                db.SaveChanges();

            }
            var result = new
            {


                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        //-----------------Cok satan EKLE------------------------
        public ActionResult CokSatan()
        {

            return View();

        }
        [HttpPost]
        public ActionResult CokSatan(CokSatan a)
        {

            if (a.ID == 0)
            {
                db.CokSatan.Add(a);
                db.SaveChanges();
                ViewBag.mesaj = "cok satan Eklendi";

            }
            else
            {
                var cok = db.CokSatan.FirstOrDefault(s => s.ID == a.ID);
                cok.UrunID = a.UrunID;
                cok.ID = a.ID;
                db.SaveChanges();
                ViewBag.mesaj = "cok satan Güncellendi";

            }


            return Redirect("/Admin/CokSatan");
        }


        public JsonResult CokSatanGetir(int id)
        {

            var Sonuc = db.CokSatan.Where(p => p.Durum == 0).Where(a => a.ID == id).Select(x => new
            {
                ID = x.ID,
                UrunID = x.UrunID,


            })
                .ToList();
            return this.Json(Sonuc, JsonRequestBehavior.AllowGet);

        }

        public JsonResult CokSatanListGetir(int limit, int offset, string search, string order)
        {
            if (search == null) { search = ""; }

            var satirlar = db.CokSatan.Where(p => p.Durum == 0)
                .OrderByDescending(a => a.ID).Skip(offset).Take(limit).Select(x => new
                {
                    ID = x.ID,
                    UrunID = x.UrunID,

                })
                .ToList();



            var result = new
            {

                rows = satirlar,

                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CokSatanPasif(int ID)
        {
            CokSatan cok = new CokSatan();
            cok = db.CokSatan.Find(ID);
            cok.Durum = 2;
            if (ModelState.IsValid)
            {
                db.Entry(cok).State = EntityState.Modified;
                db.SaveChanges();

            }
            var result = new
            {


                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        //---------------EN Cok One Cıkan------------------------
        public ActionResult Onecikan()
        {

            return View();

        }
        [HttpPost]
        public ActionResult Onecikan(EnCokOneCikan a)
        {

            if (a.ID == 0)
            {
                db.EnCokOneCikan.Add(a);
                db.SaveChanges();
                ViewBag.mesaj = "Eklendi";

            }
            else
            {
                var one = db.EnCokOneCikan.FirstOrDefault(s => s.ID == a.ID);
                one.UrunID = a.UrunID;
                one.ID = a.ID;
                db.SaveChanges();
                ViewBag.mesaj = " Güncellendi";

            }


            return Redirect("/Admin/Onecikan");
        }


        public JsonResult OnecikanGetir(int id)
        {

            var Sonuc = db.EnCokOneCikan.Where(p => p.Durum == 0).Where(a => a.ID == id).Select(x => new
            {
                ID = x.ID,
                UrunID = x.UrunID,


            })
                .ToList();
            return this.Json(Sonuc, JsonRequestBehavior.AllowGet);

        }

        public JsonResult OnecikanListGetir(int limit, int offset, string search, string order)
        {
            if (search == null) { search = ""; }

            var satirlar = db.EnCokOneCikan.Where(p => p.Durum == 0)
                .OrderByDescending(a => a.ID).Skip(offset).Take(limit).Select(x => new
                {
                    ID = x.ID,
                    UrunID = x.UrunID,

                })
                .ToList();



            var result = new
            {

                rows = satirlar,

                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult OnecikanPasif(int ID)
        {
            EnCokOneCikan one = new EnCokOneCikan();
            one = db.EnCokOneCikan.Find(ID);
            one.Durum = 2;
            if (ModelState.IsValid)
            {
                db.Entry(one).State = EntityState.Modified;
                db.SaveChanges();

            }
            var result = new
            {


                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        //-----------------Son Gönderimiz Ekle------------------------
        public ActionResult Songonderiekle()
        {
            var son = db.SonGonderimiz.ToList();
            return View(son);


        }



        [HttpPost]
        public ActionResult Songonderiekle(SonGonderimiz a, HttpPostedFileBase resim)
        {
            if (resim != null)

            {
                a.Resim = ResimYukle(resim);
            }
            if (a.ID == 0)
            {
                db.SonGonderimiz.Add(a);
                db.SaveChanges();
                ViewBag.mesaj = " Eklendi";

            }
            else
            {
                var son = db.SonGonderimiz.FirstOrDefault(s => s.ID == a.ID);
                son.Orta = a.Orta;
                son.Yazi = a.Yazi;
                son.Baslik = a.Baslik;




                if (a.Resim != null)

                {

                    son.Resim = a.Resim;

                }




                son.ID = a.ID;
                db.SaveChanges();
                ViewBag.mesaj = " Güncellendi";



            }



            return Redirect("/Admin/Songonderiekle");
        }

        public JsonResult SongonderiGetir(int id)
        {

            var Sonuc = db.SonGonderimiz.Where(p => p.Durum == 0).Where(a => a.ID == id).Select(x => new
            {
                ID = x.ID,
                Baslik = x.Baslik,
                Yazi = x.Yazi,
                Orta = x.Orta


            })
                .ToList();
            return this.Json(Sonuc, JsonRequestBehavior.AllowGet);

        }

        public JsonResult SongonderiListGetir(int limit, int offset, string search, string order)
        {
            if (search == null) { search = ""; }

            var satirlar = db.SonGonderimiz.Where(p => p.Durum == 0).Where(a => a.Orta.Contains(search) || a.Yazi.Contains(search) || a.Baslik.Contains(search) || a.Resim.Contains(search))
                .OrderByDescending(a => a.ID).Skip(offset).Take(limit).Select(x => new
                {
                    ID = x.ID,
                    Baslik = x.Baslik,
                    Yazi = x.Yazi,
                    Orta = x.Orta,
                    Resim = x.Resim
                })
                .ToList();
            int cnt = db.SonGonderimiz.Where(p => p.Durum == 0).Where(a => a.Orta.Contains(search) || a.Yazi.Contains(search) || a.Baslik.Contains(search) || a.Resim.Contains(search)).Count();

            var result = new
            {

                rows = satirlar,
                total = cnt,
                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SongonderiPasif(int ID)
        {
            SonGonderimiz son = new SonGonderimiz();
            son = db.SonGonderimiz.Find(ID);
            son.Durum = 2;
            if (ModelState.IsValid)
            {
                db.Entry(son).State = EntityState.Modified;
                db.SaveChanges();

            }
            var result = new
            {


                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        //-----------------Firma Ekle------------------------
        public ActionResult Firmaekle()
        {
            var fir = db.Firma.ToList();
            return View(fir);


        }
        [HttpPost]
        public ActionResult Firmaekle(Firma a, HttpPostedFileBase resim)
        {
            if (resim != null)

            {
                a.FirmaLogo = ResimYukle(resim);
            }
            if (a.ID == 0)
            {
                db.Firma.Add(a);
                db.SaveChanges();
                ViewBag.mesaj = " Eklendi";

            }
            else
            {
                var son = db.Firma.FirstOrDefault(s => s.ID == a.ID);

                if (a.FirmaLogo != null)

                {

                    son.FirmaLogo = a.FirmaLogo;

                }

                son.ID = a.ID;
                db.SaveChanges();
                ViewBag.mesaj = " Güncellendi";



            }



            return Redirect("/Admin/Firmaekle");
        }

        public JsonResult FirmaGetir(int id)
        {

            var Sonuc = db.Firma.Where(a => a.ID == id).Select(x => new
            {
                ID = x.ID,



            })
                .ToList();
            return this.Json(Sonuc, JsonRequestBehavior.AllowGet);

        }

        public JsonResult FirmaListGetir(int limit, int offset, string search, string order)
        {
            if (search == null) { search = ""; }

            var satirlar = db.Firma.Where(a => a.FirmaLogo.Contains(search))
                .OrderByDescending(a => a.ID).Skip(offset).Take(limit).Select(x => new
                {
                    ID = x.ID,
                    FirmaLogo = x.FirmaLogo
                })
                .ToList();
            int cnt = db.Firma.Where(a => a.FirmaLogo.Contains(search)).Count();

            var result = new
            {

                rows = satirlar,
                total = cnt,
                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        } 

        //-----------------Alt EN YEni Ekle------------------------
        public ActionResult Altenyeniekle()
        {
            var yeni = db.EnYeni.ToList();
            return View(yeni);


        }


        [HttpPost]
        public ActionResult Altenyeniekle(EnYeni a)
        {

            if (a.ID == 0)
            {
                db.EnYeni.Add(a);
                db.SaveChanges();
                ViewBag.mesaj = " Eklendi";

            }
            else
            {
                var yeni = db.EnYeni.FirstOrDefault(s => s.ID == a.ID);
                yeni.UrunID = a.UrunID;
                yeni.ID = a.ID;
                db.SaveChanges();
                ViewBag.mesaj = " Güncellendi";

            }



            return Redirect("/Admin/Altenyeniekle");
        }

        public JsonResult AltenyeniekleGetir(int id)
        {

            var Sonuc = db.EnYeni.Where(p => p.Durum == 0).Where(a => a.ID == id).Select(x => new
            {
                ID = x.ID,
                UrunID = x.UrunID,



            })
                .ToList();
            return this.Json(Sonuc, JsonRequestBehavior.AllowGet);

        }

        public JsonResult AltyeniListGetir(int limit, int offset, string search, string order)
        {
            if (search == null) { search = ""; }

            var satirlar = db.EnYeni.Where(p => p.Durum == 0)
                .OrderByDescending(a => a.ID).Skip(offset).Take(limit).Select(x => new
                {
                    ID = x.ID,
                    UrunID = x.UrunID,

                })
                .ToList();

            var result = new
            {

                rows = satirlar,

                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AltyeniListPasif(int ID)
        {
           EnYeni one = new EnYeni();
            one = db.EnYeni.Find(ID);
            one.Durum = 2;
            if (ModelState.IsValid)
            {
                db.Entry(one).State = EntityState.Modified;
                db.SaveChanges();

            }
            var result = new
            {


                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        //-----------------Alt aksesuar Ekle------------------------
        public ActionResult Altaksesuarekle()
        {
            var yeni = db.EnIyiAksesuar.ToList();
            return View(yeni);


        }


        [HttpPost]
        public ActionResult Altaksesuarekle(EnIyiAksesuar a)
        {

            if (a.ID == 0)
            {
                db.EnIyiAksesuar.Add(a);
                db.SaveChanges();
                ViewBag.mesaj = " Eklendi";

            }
            else
            {
                var yeni = db.EnIyiAksesuar.FirstOrDefault(s => s.ID == a.ID);
                yeni.UrunID = a.UrunID;
                yeni.ID = a.ID;
                db.SaveChanges();
                ViewBag.mesaj = " Güncellendi";

            }



            return Redirect("/Admin/Altaksesuarekle");
        }

        public JsonResult AltaksesuarekleGetir(int id)
        {

            var Sonuc = db.EnIyiAksesuar.Where(p => p.Durum == 0).Where(a => a.ID == id).Select(x => new
            {
                ID = x.ID,
                UrunID = x.UrunID,



            })
                .ToList();
            return this.Json(Sonuc, JsonRequestBehavior.AllowGet);

        }

        public JsonResult AltaksesuarekleListGetir(int limit, int offset, string search, string order)
        {
            if (search == null) { search = ""; }

            var satirlar = db.EnIyiAksesuar.Where(p => p.Durum == 0)
                .OrderByDescending(a => a.ID).Skip(offset).Take(limit).Select(x => new
                {
                    ID = x.ID,
                    UrunID = x.UrunID,

                })
                .ToList();

            var result = new
            {

                rows = satirlar,

                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AltaksesuareklePasif(int ID)
        {
            EnIyiAksesuar one = new EnIyiAksesuar();
            one = db.EnIyiAksesuar.Find(ID);
            one.Durum = 2;
            if (ModelState.IsValid)
            {
                db.Entry(one).State = EntityState.Modified;
                db.SaveChanges();

            }
            var result = new
            {


                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        //-----------------Alt aksesuar Ekle------------------------
        public ActionResult Altoylananekle()
        {
            var yeni = db.EnCokOylanan.ToList();
            return View(yeni);
           
        }


        [HttpPost]
        public ActionResult Altoylananekle(EnCokOylanan a)
        {

            if (a.ID == 0)
            {
                db.EnCokOylanan.Add(a);
                db.SaveChanges();
                ViewBag.mesaj = " Eklendi";

            }
            else
            {
                var yeni = db.EnCokOylanan.FirstOrDefault(s => s.ID == a.ID);
                yeni.UrunID = a.UrunID;
                yeni.ID = a.ID;
                db.SaveChanges();
                ViewBag.mesaj = " Güncellendi";

            }



            return Redirect("/Admin/Altaksesuarekle");
        }

        public JsonResult AltoylananekleGetir(int id)
        {

            var Sonuc = db.EnCokOylanan.Where(p => p.Durum == 0).Where(a => a.ID == id).Select(x => new
            {
                ID = x.ID,
                UrunID = x.UrunID,



            })
                .ToList();
            return this.Json(Sonuc, JsonRequestBehavior.AllowGet);

        }

        public JsonResult AltoylananekleListGetir(int limit, int offset, string search, string order)
        {
            if (search == null) { search = ""; }

            var satirlar = db.EnCokOylanan.Where(p => p.Durum == 0)
                .OrderByDescending(a => a.ID).Skip(offset).Take(limit).Select(x => new
                {
                    ID = x.ID,
                    UrunID = x.UrunID,

                })
                .ToList();

            var result = new
            {

                rows = satirlar,

                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AltoylananeklePasif(int ID)
        {
            EnCokOylanan one = new EnCokOylanan();
            one = db.EnCokOylanan.Find(ID);
            one.Durum = 2;
            if (ModelState.IsValid)
            {
                db.Entry(one).State = EntityState.Modified;
                db.SaveChanges();

            }
            var result = new
            {


                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        //-----------------Uyarı EKle------------------------
        public ActionResult Uyarıekle()
        {
            var yeni = db.Uyari.ToList();
            return View(yeni);


        }


        [HttpPost]
        public ActionResult Uyarıekle(Uyari a)
        {

            if (a.ID == 0)
            {
                db.Uyari.Add(a);
                db.SaveChanges();
                ViewBag.mesaj = " Eklendi";

            }
            else
            {
                var yeni = db.Uyari.FirstOrDefault(s => s.ID == a.ID);
                yeni.UyariBaslik= a.UyariBaslik;
                yeni.UyariYazi = a.UyariYazi;
                yeni.UyariIkon = a.UyariIkon;
               
                yeni.ID = a.ID;
                db.SaveChanges();
                ViewBag.mesaj = " Güncellendi";

            }



            return Redirect("/Admin/Altaksesuarekle");
        }

        public JsonResult UyarıekleGetir(int id)
        {

            var Sonuc = db.Uyari.Where(p => p.Durum == 0).Where(a => a.ID == id).Select(x => new
            {
                ID = x.ID,
                UyariBaslik = x.UyariBaslik,
                UyariYazi = x.UyariYazi,
                UyariIkon = x.UyariIkon



            })
                .ToList();
            return this.Json(Sonuc, JsonRequestBehavior.AllowGet);

        }

        public JsonResult UyarıeklelistGetir(int limit, int offset, string search, string order)
        {
            if (search == null) { search = ""; }

            var satirlar = db.Uyari.Where(p => p.Durum == 0).Where(a => a.UyariYazi.Contains(search) || a.UyariBaslik.Contains(search) || a.UyariIkon.Contains(search))
                .OrderByDescending(a => a.ID).Skip(offset).Take(limit).Select(x => new
                {
                    ID = x.ID,
                    UyariBaslik = x.UyariBaslik,
                    UyariYazi = x.UyariYazi,
                    UyariIkon = x.UyariIkon
                })
                .ToList();
            int cnt = db.Uyari.Where(p => p.Durum == 0).Where(a => a.UyariYazi.Contains(search) || a.UyariBaslik.Contains(search) || a.UyariIkon.Contains(search)).Count();

            var result = new
            {

                rows = satirlar,
                total = cnt,
                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UyarıeklePasif(int ID)
        {
            Uyari one = new Uyari();
            one = db.Uyari.Find(ID);
            one.Durum = 2;
            if (ModelState.IsValid)
            {
                db.Entry(one).State = EntityState.Modified;
                db.SaveChanges();

            }
            var result = new
            {


                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        //-----------------İletişim Bölümü  Ekle------------------------
        public ActionResult Iletisimekle()
        {
            var ile= db.Iletisim.ToList();
            return View(ile);


        }

      

        [HttpPost]
        public ActionResult Iletisimekle(Iletisim a)
        {
           
            if (a.ID == 0)
            {
                db.Iletisim.Add(a);
                db.SaveChanges();
                ViewBag.mesaj = " Eklendi";

            }
            else
            {
                var Iletisim = db.Iletisim.FirstOrDefault(s => s.ID == a.ID);
                Iletisim.Aciklama = a.Aciklama;
                Iletisim.Adres = a.Adres;
                Iletisim.FirmaAdi = a.FirmaAdi;
                Iletisim.Telefon = a.Telefon;
                Iletisim.ID = a.ID;
                db.SaveChanges();
                ViewBag.mesaj = " Güncellendi";



            }

      
            return Redirect("/Admin/Iletısımekle");
        }

        public JsonResult IletisimekleGetir(int id)
        {

            var Sonuc = db.Iletisim.Where(p => p.Durum == 0).Where(a => a.ID == id).Select(x => new
            {
                ID = x.ID,
                Aciklama= x.Aciklama,
                Adres = x.Adres,
                FirmaAdi=x.FirmaAdi,
                Telefon=x.Telefon


            })
                .ToList();
            return this.Json(Sonuc, JsonRequestBehavior.AllowGet);

        }

        public JsonResult IletisimekleListGetir(int limit, int offset, string search, string order)
        {
            if (search == null) { search = ""; }

            var satirlar = db.Iletisim.Where(p => p.Durum == 0).Where(a => a.Adres.Contains(search) || a.Aciklama.Contains(search) || a.FirmaAdi.Contains(search) || a.Telefon.Contains(search))
                .OrderByDescending(a => a.ID).Skip(offset).Take(limit).Select(x => new
                {
                    ID = x.ID,
                    Aciklama = x.Aciklama,
                    Adres = x.Adres,
                    FirmaAdi = x.FirmaAdi,
                    Telefon = x.Telefon
                })
                .ToList();
            int cnt = db.Iletisim.Where(p => p.Durum == 0).Where(a => a.Adres.Contains(search) || a.Aciklama.Contains(search) || a.FirmaAdi.Contains(search) || a.Telefon.Contains(search)).Count();

            var result = new
            {

                rows = satirlar,
                total = cnt,
                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult IletisimeklePasif(int ID)
        {
            Iletisim Iletisim = new Iletisim();
            Iletisim = db.Iletisim.Find(ID);
            Iletisim.Durum = 2;
            if (ModelState.IsValid)
            {
                db.Entry(Iletisim).State = EntityState.Modified;
                db.SaveChanges();

            }
            var result = new
            {


                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
        //-----------------Hakkkımızda Bölümü  Ekle------------------------
        public ActionResult Hakkimizdaekle()
        {
            var hakkimizda = db.Hakkimizda.ToList();
            return View(hakkimizda);


        }



        [HttpPost]
        public ActionResult Hakkimizdaekle(Hakkimizda a)
        {

            if (a.ID == 0)
            {
                db.Hakkimizda.Add(a);
                db.SaveChanges();
                ViewBag.mesaj = " Eklendi";

            }
            else
            {
                var Hakkimizda = db.Hakkimizda.FirstOrDefault(s => s.ID == a.ID);
                Hakkimizda.Yazi= a.Yazi;
               
                Hakkimizda.ID = a.ID;
                db.SaveChanges();
                ViewBag.mesaj = " Güncellendi";



            }


            return Redirect("/Admin/Hakkimizdaekle");
        }

        public JsonResult HakkimizdaekleGetir(int id)
        {

            var Sonuc = db.Hakkimizda.Where(p => p.Durum == 0).Where(a => a.ID == id).Select(x => new
            {
                ID = x.ID,
                Yazi = x.Yazi
              


            })
                .ToList();
            return this.Json(Sonuc, JsonRequestBehavior.AllowGet);

        }

        public JsonResult HakkimizdaekleListGetir(int limit, int offset, string search, string order)
        {
            if (search == null) { search = ""; }

            var satirlar = db.Hakkimizda.Where(p => p.Durum == 0).Where(a => a.Yazi.Contains(search))
                .OrderByDescending(a => a.ID).Skip(offset).Take(limit).Select(x => new
                {
                    ID = x.ID,
                    Yazi = x.Yazi

                })
                .ToList();
            int cnt = db.Hakkimizda.Where(p => p.Durum == 0).Where(a => a.Yazi.Contains(search)).Count();

            var result = new
            {

                rows = satirlar,
                total = cnt,
                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HakkimizdaeklePasif(int ID)
        {
            Hakkimizda Hakkimizda = new Hakkimizda();
            Hakkimizda = db.Hakkimizda.Find(ID);
            Hakkimizda.Durum = 2;
            if (ModelState.IsValid)
            {
                db.Entry(Hakkimizda).State = EntityState.Modified;
                db.SaveChanges();

            }
            var result = new
            {


                success = true
            };
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}

