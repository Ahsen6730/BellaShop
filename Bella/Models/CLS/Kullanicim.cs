
using Bella.Models.Data;
using Bella.Models.MDL;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;
//using UnityObjects;

namespace Bella.Models.CLS
{
    public class Kullanicim
    {
        static readonly string PasswordHash = "P@@Sw0rdkml";
        static readonly string SaltKey = "Tuzlukcu";
        static readonly string VIKey = "@1B2c3D4e5F6g7H8vs";

        public static string Hata;

        public static class ActiveSessions
        {
            private static List<string> _sessionInfo;
            private static readonly object padlock = new object();

            public static List<string> Sessions
            {
                get
                {
                    lock (padlock)
                    {
                        if (_sessionInfo == null)
                        {
                            _sessionInfo = new List<string>();
                        }
                        return _sessionInfo;
                    }
                }
            }

            public static int Count
            {
                get
                {
                    lock (padlock)
                    {
                        if (_sessionInfo == null)
                        {
                            _sessionInfo = new List<string>();
                        }
                        return _sessionInfo.Count;
                    }
                }
            }
        }

        //public static bool LogoLoginMi(string kull, string sifre)
        //{
        //    UnityApplication app = new UnityApplication();//n

        //    if (app == null)
        //    {
        //        app = new UnityApplication();
        //    }
        //    if (app.Connect())
        //    {
        //        if (app.UserLogin(kull, sifre))
        //        {
        //            Hata += "Kullanıcı Girişi Başarılı\n";
        //            app.Disconnect();
        //            app = null;
        //            GC.Collect();
        //            return true;
        //        }
        //        else
        //        {
        //            Hata += "Kullanıcı Bağlantısı Yapılamadı: " + app.GetLastErrorString();
        //            app.Disconnect();
        //            app = null;
        //            GC.Collect();
        //        }
        //    }
        //    else
        //    {
        //        Hata += "Temel Bağlantısı Yapılamadı: " + app.GetLastErrorString();
        //        app.Disconnect();
        //        app = null;
        //        GC.Collect();
        //    }

        //    return false;
        //}

        public static string Encrypt(string plainText)
        {
            byte[] plainTextBytes = Encoding.UTF8.GetBytes(plainText);

            byte[] keyBytes = new Rfc2898DeriveBytes(PasswordHash, Encoding.ASCII.GetBytes(SaltKey)).GetBytes(256 / 8);
            var symmetricKey = new RijndaelManaged() { Mode = CipherMode.CBC, Padding = PaddingMode.Zeros };
            var encryptor = symmetricKey.CreateEncryptor(keyBytes, Encoding.ASCII.GetBytes(VIKey));

            byte[] cipherTextBytes;

            using (var memoryStream = new MemoryStream())
            {
                using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                {
                    cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
                    cryptoStream.FlushFinalBlock();
                    cipherTextBytes = memoryStream.ToArray();
                    cryptoStream.Close();
                }
                memoryStream.Close();
            }
            return Convert.ToBase64String(cipherTextBytes);
        }

        public static string Decrypt(string encryptedText)
        {
            byte[] cipherTextBytes = Convert.FromBase64String(encryptedText);
            byte[] keyBytes = new Rfc2898DeriveBytes(PasswordHash, Encoding.ASCII.GetBytes(SaltKey)).GetBytes(256 / 8);
            var symmetricKey = new RijndaelManaged() { Mode = CipherMode.CBC, Padding = PaddingMode.None };

            var decryptor = symmetricKey.CreateDecryptor(keyBytes, Encoding.ASCII.GetBytes(VIKey));
            var memoryStream = new MemoryStream(cipherTextBytes);
            var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);
            byte[] plainTextBytes = new byte[cipherTextBytes.Length];

            int decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);
            memoryStream.Close();
            cryptoStream.Close();
            return Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount).TrimEnd("\0".ToCharArray());
        }

        /// <summary>
        /// Returns the User from the Context.User.Identity by decrypting the forms auth ticket and returning the user object.
        /// </summary>
        public static KullaniciModel Kullanici
        {
            get
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    // The user is authenticated. Return the user from the forms auth ticket.
                    // HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName].Value;
                    HttpCookie authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
                    FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                    // var identity = new GenericIdentity(authTicket.Name, "Forms");
                    // var principal = new ElektraPrencip(identity);
                    string userData = authTicket.UserData;

                    var serializer = new JavaScriptSerializer();
                    ///principal.User = (KullaniciModel)serializer.Deserialize(userData, typeof(KullaniciModel));
                    var kullum = (KullaniciModel)serializer.Deserialize(userData, typeof(KullaniciModel));
                    return kullum;
                }
                else if (HttpContext.Current.Items.Contains("User"))
                {
                    // The user is not authenticated, but has successfully logged in.
                    return (KullaniciModel)HttpContext.Current.Items["User"];
                }
                else
                {
                    return null;
                }
            }
        }

        /// <returns>User</returns>
        public static KullaniciModel AuthenticateUser(string username, string password)
        {
            KullaniciModel user = null;

            DatabaseContext db = new DatabaseContext();

            string x = Encrypt(password);
            KULLANICI kull = db.KULLANICI.SingleOrDefault(a => a.KULLANICI_ADI == username && a.SIFRE == x);

            if (kull == null)
            {
                return user;
            }
            var context = ((IObjectContextAdapter)db).ObjectContext;
            //((IObjectContextAdapter)db).ObjectContext.Refresh(System.Data.Objects.RefreshMode.StoreWins, kull);
            context.Refresh(System.Data.Entity.Core.Objects.RefreshMode.StoreWins, kull);
            kull = db.KULLANICI.SingleOrDefault(a => a.KULLANICI_ADI == username && a.SIFRE == x);
            if (kull.ID > 0)
            {
                user = new KullaniciModel();
                user.id = kull.ID;
                user.KODU = kull.KULLANICI_ADI;
                user.YETKI_KODU = (int)kull.YETKI_GRUBUID;
                user.ADI = kull.ADI;
                user.SOYADI = kull.SOYADI;
                user.GOREVI = "";
                user.Kilitli = false;
                user.YETKI_KODU_ADI = kull.YETKI_GRUBU.YETKI_GRUBU_ADI;
                return user;
            }
            return user;
        }

        /// <returns>bool</returns>
        public static bool ValidateUser(LoginModel logon, HttpResponseBase response)
        {
            bool result = false;
            MemProvider memPro = new MemProvider();
            if (memPro.ValidateUser(logon.UserName, logon.Password))
            {
                // Create the authentication ticket with custom user data.
                var serializer = new JavaScriptSerializer();
                string userData = serializer.Serialize(Kullanicim.Kullanici);

                FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1,
                        logon.UserName,
                        DateTime.Now,
                        DateTime.Now.AddDays(30),
                        true,
                        userData,
                        FormsAuthentication.FormsCookiePath);

                // Encrypt the ticket.
                string encTicket = FormsAuthentication.Encrypt(ticket);

                // Create the cookie.
                response.Cookies.Add(new HttpCookie(FormsAuthentication.FormsCookieName, encTicket));

                result = true;
            }
            return result;
        }

        public static bool updateData(KullaniciModel model, HttpResponseBase response)
        {
            HttpCookie authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
            var serializer = new JavaScriptSerializer();
            //authTicket.UserData = serializer.Serialize(model);
            if (HttpContext.Current.User.Identity.IsAuthenticated)
            {
                string userData = serializer.Serialize(model);

                FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1,
                        HttpContext.Current.User.Identity.Name,
                        DateTime.Now,
                        DateTime.Now.AddDays(30),
                        true,
                        userData,
                        FormsAuthentication.FormsCookiePath);

                // Encrypt the ticket.
                string encTicket = FormsAuthentication.Encrypt(ticket);

                response.Cookies.Clear();

                // Create the cookie.
                response.Cookies.Set(new HttpCookie(FormsAuthentication.FormsCookieName, encTicket));
            }
            return true;
        }

        /// <param name="response">HttpResponseBase</param>
        public static void Logoff(HttpSessionStateBase session, HttpResponseBase response)
        {
            // Delete the user details from cache.
            session.Abandon();

            // Delete the authentication ticket and sign out.
            FormsAuthentication.SignOut();
            //HttpContext.Current.Items["User"] = null;
            // Clear authentication cookie.
            HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName, "");
            cookie.Expires = DateTime.Now.AddYears(-1);
            response.Cookies.Add(cookie);
            //response.Cookies.Set(new HttpCookie(FormsAuthentication.FormsCookieName, null));
        }

        public static bool UpdateUser()
        {
            return true;
        }

      

        /// <returns></returns>
        public static bool YetkiKontrol(int yetkino, int tip)
        {
            DatabaseContext db = new DatabaseContext();
            var x = db.KULLANICI.SingleOrDefault(a => a.ID == Kullanicim.Kullanici.id);
            var yetki = x.YETKI_GRUBU.YETKI_LISTESI.SingleOrDefault(a => a.YETKI_GRUBUID == x.YETKI_GRUBUID && a.MODULID == yetkino);
            if (yetki == null)
            {
                return false;
            }
            if (tip == 1)
            {
                return (bool)yetki.VARMI;
            }
            return false;
        }

        public static bool YetkiKontrolu(string yetki_adi)
        {
            DatabaseContext db = new DatabaseContext();
            var x = db.KULLANICI.SingleOrDefault(a => a.ID == Kullanicim.Kullanici.id);
            var yetki = x.YETKI_GRUBU.YETKI_LISTESI.SingleOrDefault(a => a.YETKI_GRUBUID == x.YETKI_GRUBUID && a.MODUL.MODUL_ADI == yetki_adi);
            if (yetki == null)
            {
                return false;
            }
            else
            {
                return (bool)yetki.VARMI;
            }         
        }
        /**************************************/
    }
}