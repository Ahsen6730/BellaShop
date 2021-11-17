using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bella.Models
{
    public class CokSatan
    {
        public int ID { get; set; }
        public int UrunID { get; set; }
        public virtual Urun Urun { get; set; }
        public int Durum { get; set; }
    }
}