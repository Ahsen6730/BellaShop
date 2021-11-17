using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bella.Models
{
    public class Iletisim
    {
        public int ID { get; set; }
        public string  FirmaAdi { get; set; }
        public string  Telefon { get; set; }
        public string  Adres { get; set; }

        public int Durum { get; set; }
        public string  Aciklama{ get; set; }
 
    }
}