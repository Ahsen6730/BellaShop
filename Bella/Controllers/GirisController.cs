using Bella.Models.CLS;
using Bella.Models.Data;
using Bella.Models.MDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace Bella.Controllers
{
  
    public class GirisController : Controller
    {
        // GET: /Giris/
        private DatabaseContext db = new DatabaseContext();
        static bool durum = true;
        [AllowAnonymous]
        public ActionResult Login()
        {


            return this.View();
        }


        [AllowAnonymous]
        public ActionResult Hata()
        {
            if (durum)
            {
                return Redirect("/Giris/Giriş");
            }
            else { ViewBag.mesaj = Session["LisansKontrol"]; durum = true; }
            return this.View();
        }
        private bool LSKontrolEt()
        {
            //LisansKontrolSonuc aa = Islemler.LisansKontrol("11111", "elektra_crm", "0824336191425909");
            //// LisansKontrolSonuc aa = Islemler.LisansKontrol("11111", "elektra_crm", "4444281");
            //if (aa.sonuc != true){Session["LisansKontrol"] = aa.mesaj;}
            //else
            //{
            //    PARAMETRE PR = new PARAMETRE();
            //    PR.DEGER = Islemler.Encrypt(aa.gecerlilik_tarihi.ToString());
            //    PR.HATAKOD = Islemler.Encrypt(aa.hatakodu.ToString());
            //    PR.MESAJ = Islemler.Encrypt(aa.mesaj.ToString());
            //    PR.PARAMS = Islemler.Encrypt(aa.moduller.ToString());
            //    PR.SONUC = Islemler.Encrypt(aa.sonuc.ToString());
            //    db.PARAMETRE.Add(PR); db.SaveChanges();
            //    return true;
            //}
            return true;
        }



        [AllowAnonymous]
        [AcceptVerbs(HttpVerbs.Post)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1054:UriParametersShouldNotBeStrings",
            Justification = "Needs to take same parameter type as Controller.Redirect()")]
        public ActionResult Login(string Username, string Password, string returnUrl)
        {

            // Verify the fields.
            if (ModelState.IsValid)
            {
                // Authenticate the user.
                LoginModel lm = new LoginModel();
                lm.UserName = Username;
                lm.Password = Password;
                if (Kullanicim.ValidateUser(lm, Response))
                {
                    if (Kullanicim.Kullanici.YETKI_KODU== 1)
                         
                    {
                       return Redirect("/Admin/Index");
                    }
                    else
                    { return Redirect("/Home/Index");
                        
                    }
                }
                else
                { ViewBag.mesaj ="Hatalı Giriş";
                    return Redirect("/Giris/Giris");
                }
            }
            return this.View();
        }

        public ActionResult Logout()
        {
            Kullanicim.Logoff(Session, Response);
            return RedirectToAction("Index", "Ana");
        }

        [Authorize]
        public ActionResult Kilit()
        {
            string kim = Kullanicim.Kullanici.KODU;
            ViewBag.kimo = kim;
            //Kullanicim.Logoff(Session, Response);
            KullaniciModel kul = Kullanicim.Kullanici;
            kul.Kilitli = true;
            Kullanicim.updateData(kul, this.Response);
            return this.View();
        }

        [AllowAnonymous]
        [AcceptVerbs(HttpVerbs.Post)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1054:UriParametersShouldNotBeStrings",
            Justification = "Needs to take same parameter type as Controller.Redirect()")]
        public ActionResult Kilit(string Username, string Password, string returnUrl)
        {
            // Verify the fields.
            if (ModelState.IsValid)
            {
                // Authenticate the user.
                LoginModel lm = new LoginModel();
                lm.UserName = Username;
                lm.Password = Password;
                string x = Kullanicim.Encrypt(lm.Password);
                string y = Kullanicim.Decrypt(x);
                KULLANICI kull = db.KULLANICI.SingleOrDefault(a => a.KULLANICI_ADI == lm.UserName && a.SIFRE == x);
                if (kull != null)
                {
                    x += y;
                    KullaniciModel kul = Kullanicim.Kullanici;
                    kul.Kilitli = false;
                    Kullanicim.updateData(kul, this.Response);
                    return RedirectToAction("Index", "Ana");
                }
                else
                {
                    string kim = Kullanicim.Kullanici.KODU;
                    ViewBag.kimo = kim;
                    return this.View();
                }
            }
            return this.View();
        }

        public ActionResult LogOff()
        {
            Kullanicim.Logoff(Session, Response);
            return RedirectToAction("Login", "Giris");
        }

        [Authorize]
        public ActionResult Elektra(string u, string s)
        {
            if (u == "elektra" && s == "elektra")
            {
                return View();
            }
            else
            {
                return Redirect("/Ortak/Yetkisiz");
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Ana");
            }
        }

        public void KontrolEt()
        {
        }
        public bool YetkiKontrol(string yetkino, int tip)
        {
            return false;
        }


        /*--------------Hesap Oluşturma----------------------------*/
        public ActionResult HesapOlustur()
        {

            return View();

        }

        [HttpPost]
        public ActionResult HesapOlustur(KULLANICI a)
        {
            var KULLANICI = db.KULLANICI.Where(s => s.KULLANICI_ADI == a.KULLANICI_ADI || s.SIFRE == a.SIFRE || s.ADI == a.ADI).FirstOrDefault();
            if (KULLANICI == null)
            {KULLANICI b = new KULLANICI();
                b = a;
                b.SIFRE = Kullanicim.Encrypt(a.SIFRE);
                db.KULLANICI.Add(b);
                db.SaveChanges();
                return Redirect("/Home/Index");
               

            }
            else
            {
               ViewBag.mesaj = "Yanlış Hesap adı veya şifresi";
                return Redirect("/Giris/Login");
                

            }


        }

        /*--------------------WEb sayfası Giriş ve kaydol kısmı------------------------*/
        public ActionResult Kaydol()
        {

            return View();

        }
        [HttpPost]
        public ActionResult Kaydol(KULLANICI a)
        {
            var KULLANICI = db.KULLANICI.Where(s => s.KULLANICI_ADI == a.KULLANICI_ADI || s.SIFRE == a.SIFRE || s.ADI == a.ADI).FirstOrDefault();
            if (KULLANICI == null)
            {
                KULLANICI b = new KULLANICI();
                b = a;
                b.SIFRE = Kullanicim.Encrypt(a.SIFRE);
                db.KULLANICI.Add(b);
                db.SaveChanges();
                return Redirect("/Home/Index");


            }
            else
            {
                
                ViewBag.mesaj = "BU KULLANICI ZATEN VAR ";
                return this.View();


            }


        }

        [AllowAnonymous]
        public ActionResult Giris()
        {

            return View();

        }

    }
}