using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bella.Models
{
    public class Uyari
    {
        public int ID { get; set; }
        public string UyariYazi{ get; set; }
        public string UyariIkon { get; set; }
        public string UyariBaslik{ get; set; }
         public int Durum { get; set; }
    }
}