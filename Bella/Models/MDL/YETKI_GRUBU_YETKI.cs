using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Bella.Models.MDL
{
    [Table("YETKI_GRUBU_YETKI")]
    public class YETKI_GRUBU_YETKI
    {
        public int ID { get; set; }
        public int? YETKI_GRUBUID { get; set; }
        public virtual YETKI_GRUBU YETKI_GRUBU { get; set; }
        public int? MODULID { get; set; }
        public virtual MODULLER MODUL { get; set; }
        public bool? VARMI { get; set; }  
    }
}