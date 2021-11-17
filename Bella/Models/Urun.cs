using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bella.Models
{
    public class Urun
    {
        public int ID { get; set; }
        public string UrunAdi   { get; set; }
        public string UrunAciklama { get; set; }
        public string YildizSayisi { get; set; }
        public string  ButonAd{ get; set; }
        public string UrunDetayliAciklama{ get; set; }
        public string Resim{ get; set; }
        public string Fiyat{ get; set; }

        public int Durum { get; set; }

        public virtual List<UrunFiyat> UrunFİyatları { get; set; }
      

    }
}