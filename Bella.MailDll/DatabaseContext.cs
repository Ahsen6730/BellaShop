using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bella.MailDll
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Mesaj> Mesaj { get; set; }
    }
}
