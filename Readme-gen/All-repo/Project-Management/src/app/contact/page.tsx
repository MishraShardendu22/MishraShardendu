'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Loading from '@/components/Loading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, User, Mail } from 'lucide-react';
import {
 Card,
 CardContent,
 CardHeader,
 CardTitle,
 CardDescription,
} from '@/components/ui/card';

const Contact = () => {
 const [loading, setLoading] = useState(false);
 const [form, setForm] = useState({ name: '', email: '', message: '' });

 const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
 const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
 const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
 ) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  if (!serviceID || !templateID || !publicKey) {
   toast.error('Service is not properly configured. Please try again later.');
   setLoading(false);
   return;
  }

  try {
   await emailjs.send(
    serviceID,
    templateID,
    {
     from_name: form.name,
     to_name: 'Shardendu Mishra',
     from_email: form.email,
     to_email: 'shardendumishra01@gmail.com',
     message: form.message,
    },
    publicKey
   );

   toast.success('Thank you for your message 😃');
   setForm({ name: '', email: '', message: '' });
  } catch (error) {
   toast.error("I didn't receive your message 😢");
   console.error('EmailJS Error:', error);
  } finally {
   setLoading(false);
  }
 };

 return (
  <section className="relative min-h-screen w-full py-20" id="contact">
   {/* Background Elements */}
   <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

   <div className="container px-4 mx-auto relative z-10">
    <div className="max-w-2xl mx-auto text-center mb-12">
     <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
     <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
      Let&lsquo;s talk
     </h1>
     <p className="text-lg text-muted-foreground">
      Whether you&lsquo;re looking to build a new website, improve your existing
      platform, or bring a unique project to life, I&lsquo;m here to help.
     </p>
    </div>

    <Card className="max-w-xl mx-auto border-none bg-card/50 backdrop-blur-sm shadow-lg">
     <CardHeader>
      <CardTitle>Send me a message</CardTitle>
      <CardDescription>
       Fill out the form below and I&#39;ll get back to you as soon as possible.
      </CardDescription>
     </CardHeader>
     <CardContent>
      <form onSubmit={handleSubmit} className="space-y-6">
       <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
         Full Name
        </label>
        <div className="relative">
         <Input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="pl-10"
          placeholder="Ex: Shardendu Mishra"
         />
         <User className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
        </div>
       </div>

       <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
         Email address
        </label>
        <div className="relative">
         <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="pl-10"
          placeholder="Ex: shardendumishra01@gmail.com"
         />
         <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
        </div>
       </div>

       <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
         Your message
        </label>
        <Textarea
         name="message"
         value={form.message}
         onChange={handleChange}
         required
         rows={5}
         placeholder="Write your thoughts here..."
         className="resize-none"
        />
       </div>

       <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loading /> : 'Send Message'}
       </Button>
      </form>
     </CardContent>
    </Card>
   </div>
  </section>
 );
};

export default Contact;
