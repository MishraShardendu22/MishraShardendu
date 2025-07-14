import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground px-6 md:px-12 lg:px-24">
      <header className="w-full bg-gradient-to-r from-primary to-secondary rounded-4xl my-18 py-16 md:py-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 0.6 }}>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground">
            Welcome to Our Platform
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-6 text-2xl md:text-3xl text-primary-foreground max-w-4xl mx-auto">
            Connecting people, simplifying processes, and making life easier.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
            <Button onClick={() => navigate('/patient/survey')} className="rounded-2xl px-8 py-4 text-xl shadow-lg hover:shadow-xl transition-all cursor-pointer">
              Login <ArrowRight className="ml-2 h-6 w-6 cursor-pointer" />
            </Button>
            <Button onClick={() => navigate('/patient/survey')} variant="secondary" className="rounded-2xl px-8 py-4 text-xl shadow-lg hover:shadow-xl transition-all cursor-pointer">
              Register <ArrowRight className="ml-2 h-6 w-6 cursor-pointer" />
            </Button>
          </motion.div>
        </motion.div>
      </header>

      <section className="w-full max-w-7xl mx-auto mt-16 md:mt-24 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-5xl font-semibold">Why Choose Us?</h2>
          <p className="mt-4 text-2xl text-muted-foreground max-w-4xl mx-auto">
            Our platform offers top-notch services tailored to your needs.
          </p>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Seamless user experience',
              'Fast and secure transactions',
              '24/7 customer support',
              'Cutting-edge technology',
              'User-friendly interface',
              'Trusted by thousands',
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp} className="p-8 border rounded-4xl bg-card shadow-lg hover:shadow-xl transition-all flex items-center gap-4">
                <CheckCircle className="h-8 w-8 text-primary flex-shrink-0" />
                <span className="text-2xl text-card-foreground">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full max-w-7xl mx-auto mt-20 text-center pb-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-5xl font-semibold">Stroke Data Insights</h2>
          <p className="mt-4 text-2xl text-muted-foreground max-w-4xl mx-auto">
            Leveraging verified global stroke data from reputable sources.
          </p>
          {/* Reduced grid columns to force wider boxes */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              { title: 'Stroke Incidence', data: '15 million cases/year' },
              { title: 'Stroke Mortality', data: '5 million deaths/year' },
              { title: 'Stroke Disabilities', data: '5 million permanently disabled' },
              { title: 'Recurrent Stroke Rate', data: '25% within 5 years' },
            ].map((item, index) => (
              <div key={index} className="p-8 border rounded-4xl bg-card shadow-lg hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-xl mt-2">{item.data}</p>
                <p className="text-sm mt-1 text-muted-foreground">Global Estimate</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="w-full max-w-7xl mx-auto mt-20 text-center pb-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-5xl font-semibold">Detailed Stroke Analytics</h2>
          <p className="mt-4 text-2xl text-muted-foreground max-w-4xl mx-auto">
            In-depth analytics reflecting current global stroke challenges.
          </p>
          {/* Adjusted grid layout for wider presentation */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              'Ischemic stroke accounts for 87% of all stroke cases',
              'Hemorrhagic stroke constitutes about 13% of stroke cases',
              'Stroke risk doubles every decade after 55',
              'Early intervention reduces long-term disability',
              'Rehabilitation significantly improves recovery outcomes',
              'Public awareness can reduce stroke risk factors',
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp} className="p-8 border rounded-4xl bg-card shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
                <span className="text-2xl text-card-foreground">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;