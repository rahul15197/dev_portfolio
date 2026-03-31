import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_a41ro9b';
const EMAILJS_TEMPLATE_ID = 'template_apram3s';
const EMAILJS_PUBLIC_KEY = 'gW3LDzI-tY0Vu1dQZ';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [showReplyHint, setShowReplyHint] = useState(false);
  const { toast } = useToast();
  const headerReveal = useScrollReveal();
  const leftReveal = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });
  const rightReveal = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !message) {
      toast({
        title: 'Missing details',
        description: 'Please fill in your name and message before sending.',
        variant: 'destructive',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({ title: 'Invalid email', description: 'Please enter a valid email address.', variant: 'destructive' });
      return;
    }

    try {
      setIsSending(true);

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name,
          email,
          message,
          from_name: name,
          from_email: email,
          reply_to: email,
          to_name: 'Rahul',
        },
        EMAILJS_PUBLIC_KEY,
      );

      toast({
        title: 'Message sent!',
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setShowReplyHint(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: 'Failed to send message',
        description: 'Something went wrong while sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    { icon: Mail, title: 'Email', value: 'rahul.maheshmaheshwari@gmail.com', href: 'mailto:rahul.maheshmaheshwari@gmail.com' },
    { icon: Phone, title: 'Phone', value: '+917566636036', href: 'tel:+917566636036' },
    { icon: MapPin, title: 'Location', value: 'Bengaluru, India', href: 'https://www.google.com/maps?q=12.9716,77.5946' },
  ];

  return (
    <section id="contact" className="py-16 relative">
      <div className="container mx-auto px-6">
        <div
          ref={headerReveal.ref}
          className={`text-center mb-16 reveal ${headerReveal.isVisible ? 'visible' : ''}`}
        >
          <p className="section-kicker mb-4">Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="hero-gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Have a query/project in mind? I'd love to hear about it.</p>
        </div>

        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-8 xl:gap-10 mx-auto items-center">
          <div
            ref={leftReveal.ref}
            className={`reveal-left ${leftReveal.isVisible ? 'visible' : ''}`}
          >
            <div className="flex h-full flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-6 hero-gradient-text">Let's Start a Conversation</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="glass-card soft-panel surface-subtle p-5 hover:translate-y-[-2px] hover:shadow-lg transition-all duration-500 ease-out cursor-pointer"
                    onClick={() => {
                      if (info.href.startsWith('http')) window.open(info.href, '_blank', 'noopener,noreferrer');
                      else window.location.href = info.href;
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{info.title}</h4>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass-card soft-panel surface-subtle p-5 mt-5">
                <h4 className="font-semibold mb-4 text-foreground">Quick Response</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">I typically respond within 24 hours.</p>
              </div>
            </div>
          </div>

          <div
            ref={rightReveal.ref}
            className={`glass-card soft-panel surface-subtle p-7 md:p-8 reveal-right ${rightReveal.isVisible ? 'visible' : ''}`}
          >
            <div className="mb-7 space-y-3">
              <p className="section-kicker">Direct Email</p>
              <h3 className="text-3xl font-semibold tracking-tight text-foreground">Tell me what you're building.</h3>
              <p className="text-muted-foreground leading-relaxed">
                Share the context, timeline, and what you need help with. I read every message personally.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="glass-card border-border/50 focus:border-primary transition-all duration-500 ease-out min-h-12" placeholder="Your full name" disabled={isSending} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="glass-card border-border/50 focus:border-primary transition-all duration-500 ease-out min-h-12" placeholder="your.email@example.com" disabled={isSending} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={6} className="glass-card border-border/50 focus:border-primary transition-all duration-500 ease-out resize-none min-h-40" placeholder="Tell me about your project..." disabled={isSending} />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" size="lg" className="w-full btn-glow transition-spring min-h-12 text-base" disabled={isSending}>
                  <Send className="mr-2 h-5 w-5" /> {isSending ? 'Sending...' : 'Send Message'}
                </Button>
                <div className={`reveal-note ${showReplyHint ? 'visible' : ''}`} aria-live="polite">
                  <p className="text-sm text-muted-foreground">Expect a reply via mail typically within 24 hrs.</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
