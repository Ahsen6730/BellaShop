using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Bella.Models.MDL
{
    [Table("KULLANICI")]
    public class KULLANICI
    {
        public int ID { get; set; }
        public string KULLANICI_ADI { get; set; }
        public string SIFRE { get; set; }
        public string ADI { get; set; }
        public string SOYADI { get; set; }
        public int? LOGO_FIRMA { get; set; }
        public int? YETKI_GRUBUID { get; set; }
        public virtual YETKI_GRUBU YETKI_GRUBU { get; set; }
        public int? DURUM { get; set; }
        public DateTime? SIL_TARIH { get; set; }
        public int? SIL_KULLANICI { get; set; }
        public string LOGO_KULLANICI { get; set; }
        public string LOGO_SIFRE { get; set; }

      
    }
}