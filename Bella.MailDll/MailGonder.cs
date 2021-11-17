using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Bella.MailDll
{
    public class MailGonder
    {

        public int Gonder(Mesaj a)
        {
            SmtpClient sc = new SmtpClient();
            sc.Port = 587;
            sc.Host = "smtp.gmail.com";
            sc.EnableSsl = true;

            sc.Credentials = new NetworkCredential("aslanahsen62@gmail.com", "ahsen123*");

            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(a.Email, a.Ad);
            mail.To.Add("aslanahsen62@gmail.com");
            mail.Subject = "AA Shopp "; mail.IsBodyHtml = true; mail.Body = a.message;
           sc.Send(mail);

            return 1;
        }



    }
}
