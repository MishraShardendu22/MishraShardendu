import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageCircle, Loader2 } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast'; // Change import to react-hot-toast
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value.trimStart() }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { VITE_APP_EMAILJS_SERVICE_ID, VITE_APP_EMAILJS_TEMPLATE_ID, VITE_APP_EMAILJS_PUBLIC_KEY } = import.meta.env;

    if (!VITE_APP_EMAILJS_SERVICE_ID || !VITE_APP_EMAILJS_TEMPLATE_ID || !VITE_APP_EMAILJS_PUBLIC_KEY) {
      toast.error('Service is not properly configured.');
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        VITE_APP_EMAILJS_SERVICE_ID,
        VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name.trim(),
          to_name: 'Vasini Singh',
          from_email: form.email.trim(),
          to_email: 'tovasinisingh@gmail.com',
          message: form.message.trim(),
        },
        VITE_APP_EMAILJS_PUBLIC_KEY
      );

      toast.success('Message sent successfully! 🎉');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error("Couldn't send message. Please try again.");
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="relative py-16 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto space-y-8"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-blue-400">
            Get In Touch
          </h2>
          <p className="text-gray-400">
            Have a question or want to collaborate? Drop me a message!
          </p>
        </motion.div>

        <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-400">
              <Send className="w-6 h-6" />
              Contact Form
            </CardTitle>
            <CardDescription className="text-gray-400">
              Share your thoughts and ideas with me
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label className="text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Vasini Singh"
                  className="bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label className="text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Ex: vasinisingh01@gmail.com"
                  className="bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label className="text-gray-300 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Your Message
                </Label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Write your thoughts here..."
                  className="bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-gray-900 to-blue-900 text-white hover:from-gray-800 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <Toaster />
    </div>
  );
};

export default Contact;
