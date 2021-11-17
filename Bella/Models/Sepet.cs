using Bella.Models.MDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bella.Models
{
    public class Sepet
    {
        public int ID { get; set; }
        public int UrunID { get; set; }
        public virtual KULLANICI KULLANICI { get; set; }

        public virtual  Urun Urun { get; set; }
        public int KullanıcıId { get; set; }

        public DateTime Tar { get; set; }
       
    }
}