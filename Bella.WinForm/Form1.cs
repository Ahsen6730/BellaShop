using Bella.MailDll;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Bella.WinForm
{
    public partial class Form1 : Form
    {
        
        public Form1()
        {
            InitializeComponent();
        }
        MailGonder mail = new MailGonder();
        private void Form1_Load(object sender, EventArgs e)
        {
            timer1.Start();

        }
        private void Baslat()
        {DatabaseContext db = new DatabaseContext();
            var mesaj = db.Mesaj.Where(s => s.MailDurum == false).ToList();
            foreach (var item in mesaj)
            {
              var a=mail.Gonder(item);
                item.MailDurum = true;
                db.Entry(item).State=System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }

        private void Timer1_Tick(object sender, EventArgs e)
        {
            Baslat();
        }
    }
}
