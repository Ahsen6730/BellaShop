using Bella.Models.MDL;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Bella.Models.Data
{
    public class DatabaseContext:DbContext
    {
        public DbSet<Firma> Firma { get; set; }
        public DbSet<CokSatan> CokSatan { get; set; }
        public DbSet<EnCokOneCikan> EnCokOneCikan { get; set; }
        public DbSet<EnCokOylanan> EnCokOylanan { get; set; }
        public DbSet<EnIyiAksesuar> EnIyiAksesuar { get; set; }
        public DbSet<EnYeni> EnYeni { get; set; }
        public DbSet<Iletisim> Iletisim { get; set; }
        public DbSet<Kampanya> Kampanya { get; set; }
        public DbSet<Reklam> Reklam { get; set; }
        public DbSet<Sepet> Sepet{ get; set; }
        public DbSet<Slides> Slides { get; set; }

        public DbSet<SonGonderimiz> SonGonderimiz { get; set; }
        public DbSet<Urun> Urun { get; set; }
        public DbSet<UrunFiyat> UrunFiyat { get; set; }
        public DbSet<UrunResim> UrunResim { get; set; }
        public DbSet<Uyari> Uyari{ get; set; }
        public DbSet<Hakkimizda> Hakkimizda { get; set; }
        public DbSet<UrunDuzenle> UrunDuzenle { get; set; }
        public DbSet<Mesaj> Mesaj { get; set; }
        public DbSet<YETKI_GRUBU_YETKI> YETKI_GRUBU_YETKI { get; set; }
        public DbSet<YETKI_GRUBU> YETKI_GRUBU { get; set; }
        public DbSet<MODULLER> MODULLER { get; set; }
        public DbSet<KULLANICI> KULLANICI { get; set; }
        public DbSet<GENEL_AYAR> GENEL_AYAR { get; set; }
       


    }
}