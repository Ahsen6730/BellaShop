
using Bella.Models.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Principal;

namespace Bella.Models.CLS
{
    public class HesapModel
    {
    }
    public class LoginModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    #region SeckinPrincipal

    public class ElektraPrincipal : IPrincipal
    {
        public ElektraPrincipal(IIdentity identity)
        {
            Identity = identity;
        }

        public IIdentity Identity
        {
            get;
            private set;
        }

        public KullaniciModel Kullanici { get; set; }

        public bool IsInRole(string role)
        {
            return true;
        }

    }

    public class KullaniciModel
    {
        public int id { get; set; }
        public int BAGLIFIRMA { get; set; }
        public int YETKI_KODU { get; set; }
        public string YETKI_KODU_ADI { get; set; }
        public string ADI { get; set; }
        public string SOYADI { get; set; }
        public string KODU { get; set; }
        public string GOREVI { get; set; }
        public string EPOSTA { get; set; }
        public string CARIADI { get; set; }
        public string TELEFON { get; set; }
        public string DAHILI { get; set; }
        public string CEPTELEFONU { get; set; }
        public bool BAYI { get; set; }
        public bool SUBE { get; set; }
        public bool PLASIYER { get; set; }
        public int LG_FIRMA { get; set; }
        public int LG_ISYERI { get; set; }
        public int LG_FABRIKA { get; set; }
        public int LG_AMBAR { get; set; }
        public bool Kilitli { get; set; }
        public string CARIKODU { get; set; }
        public string KASAKODU { get; set; }
        public string PLASIYERKODU { get; set; }
        public int ROL { get; set; }
        public string ROLKULLANICI { get; set; }
        public string DEPO { get; set; }
        public string PAGE { get; set; }

    }
    #endregion

    public class YetkiTree
    {
        public int id { get; set; }
        public string text { get; set; }
        public string icon { get; set; }
        public List<YetkiTree> nodes { get; set; }
        public bool isaretli { get; set; }
        public int kullid { get; set; }
        public string baglanti { get; set; }
        public string href { get; set; }
    }

    public class ExcelSatir
    {
        public int masterID { get; set; }
        public string barkod { get; set; }
        public string kod { get; set; }
        public int adet { get; set; }
    }

    public class WebSiparis
    {
        DatabaseContext db = new DatabaseContext();

        public bool AmbarFisi()
        {
            string logref = "";
            using (var context = new DatabaseContext())
            {
                string sql = "SELECT  LOGICALREF from LG_" +
                                   Kullanicim.Kullanici.LG_FIRMA.ToString().PadLeft(3, '0')
                                   + "_02"
                                   + "_STFICHE WHERE FICHENO='" + this.no.ToString() + "'";
                logref = context.Database.SqlQuery<int>(sql).FirstOrDefault().ToString();
            }
            if (logref != null)
            {
                this.AmbarFisRef = int.Parse(logref);
                return true;
            }
            else
            {
                return false;
            }
        }


        #region Alanlar
        public int id { get; set; }
        public string no { get; set; }
        public int kargodurum { get; set; }
        public DateTime siparistarih { get; set; }
        public string musterino { get; set; }
        public string mail { get; set; }
        public string ad { get; set; }
        public string soyad { get; set; }
        public DateTime temin { get; set; }
        public DateTime havaletarihi { get; set; }
        public double havaletutar { get; set; }
        public string sevkiyatsekli { get; set; }
        public string kargofirmasi { get; set; }
        public string odemesekli { get; set; }
        public string banka { get; set; }
        public int taksit { get; set; }
        public string siparisturu { get; set; }
        public string odemeaciklama { get; set; }
        public string ceptel { get; set; }
        public string siparistakipno { get; set; }
        public string siparismusterinot { get; set; }
        public double siparistutar { get; set; }
        public List<SipIndirim> Indirimler { get; set; }
        public List<SipEkucret> Ekucretler { get; set; }
        public List<Sipurunler> Urunler { get; set; }
        public double ektoplam { get; set; }
        public double indirimtoplam { get; set; }
        public Sipadres Teslim { get; set; }
        public Sipadres Fatura { get; set; }
        public int HareketRef { get; set; }
        public int AmbarFisRef { get; set; }
        public int clientref { get; set; }
        public string HataMesaji { get; set; }
        public string AltHataMesaji { get; set; }
        public string logoref { get; set; }
        #endregion
    }

    public class SiparisSonuc
    {

        public int Okunan { get; set; }
        public int Bekleyen { get; set; }
        public int Onsiparis { get; set; }
        public int LogoSiparis { get; set; }
        public int Reserve { get; set; }
        public int ReserveEk { get; set; }
        public string Mesaj { get; set; }
        public int Kayitsiz { get; set; }
    }
    public class LogoSonuc
    {
        public int Logicalref { get; set; }
        public string Fisno { get; set; }
        public string Mesaj { get; set; }
        public bool Sonuc { get; set; }
    }
    public class SipIndirim
    {
        public string aciklama { get; set; }
        public double tutar { get; set; }
    }
    public class SipEkucret
    {
        public string aciklama { get; set; }
        public double tutar { get; set; }
    }
    public class Sipurunler
    {
        public string siteurunno { get; set; }
        public string name { get; set; }
        public string barkod { get; set; }
        public string yayinevi { get; set; }
        public string baski { get; set; }
        public string kod { get; set; }
        public string aciklama { get; set; }
        public int temin { get; set; }
        public int adet { get; set; }
        public double uruntutar { get; set; }
        public double indirim { get; set; }
        public int setmi { get; set; }
        public string setbarkod { get; set; }
        public bool setdetay { get; set; }
        public string LogoKod { get; set; }
    }
    public class Sipadres
    {
        public int Tur { get; set; }
        public int adresid { get; set; }
        public string ad { get; set; }
        public string adres1 { get; set; }
        public string adres2 { get; set; }
        public string ilce { get; set; }
        public string sehir { get; set; }
        public string ulke { get; set; }
        public string postakodu { get; set; }
        public string vergidairesi { get; set; }
        public string vergino { get; set; }
        public string tanim { get; set; }
    }
}