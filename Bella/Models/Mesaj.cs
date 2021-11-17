using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bella.Models
{
    public class Mesaj
    {
        public int ID { get; set; }
        public string Ad { get; set; }
        public string Email { get; set; }
        public string message { get; set; }
        public bool MailDurum { get; set; }
    }
}