using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Bella.Models.MDL
{
    [Table("MODULLER")]
    public class MODULLER
    {
        public int ID { get; set; }
        public int? PARENTID { get; set; }
        public virtual MODULLER PARENT { get; set; }
        public string MODUL_ADI { get; set; }
        public string BAGLANTI { get; set; }
        public string ICON { get; set; }
        public int? SIRA { get; set; }
        public int? YER { get; set; }
        public bool? VARMI { get; set; }

        public virtual List<MODULLER> AltModul_LISTESI { get; set; }
    }
}