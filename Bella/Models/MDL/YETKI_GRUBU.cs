using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Bella.Models.MDL
{
    [Table("YETKI_GRUBU")]
    public class YETKI_GRUBU
    {
        public int ID { get; set; }
        public string YETKI_GRUBU_ADI { get; set; }
        public int? DURUM { get; set; }

        public virtual List<YETKI_GRUBU_YETKI> YETKI_LISTESI { get; set; }
    }
}