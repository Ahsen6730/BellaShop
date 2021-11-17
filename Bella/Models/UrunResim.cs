using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bella.Models
{
    public class UrunResim
    {
        public int ID { get; set; }
        public int UrunID { get; set; }
        public string UrnResim { get; set; }
        public string ResimSirasi{ get; set; }
    }
}