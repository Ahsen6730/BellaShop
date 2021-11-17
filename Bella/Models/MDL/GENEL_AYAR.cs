using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Bella.Models.MDL
{
    [Table("GENEL_AYAR")]
    public class GENEL_AYAR
    {
        public int ID { get; set; }
        public string MERKEZ_DPO_NR { get; set; }
        public string PRJ_DPO_NR { get; set; }
        public string URT_DPO_NR { get; set; }
        public string LOGO_FIRMA { get; set; }
        public string LOGO_DB_ADI { get; set; }
        public string DONEM { get; set; }
        public string SUNUCU_ADI { get; set; }
        public string KULLANICI_ADI { get; set; }
        public string SIFRE { get; set; }
        public int LOGO_FIRMA_NO { get; set; }
        public string FIRMA_ADI { get; set; }
        public bool AKTIF { get; set; }

    }
}