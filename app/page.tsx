"use client"

import { useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Code,
  Database,
  Github,
  Linkedin,
  Mail,
  Server,
  Zap,
  Smartphone,
  ShoppingCart,
  Calculator,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import CustomCursor from "@/components/custom-cursor"
import DigitalGlobe from "@/components/digital-globe"
import CanvasReveal from "@/components/canvas-reveal"
import Meteors from "@/components/meteors"
import ecommerceImage from "../app/assets/ecommerce.png";
import chatapp from "../app/assets/chaapp.png";
//import ecommerceImage from "../app/assets/ecommerce.png"; // Adjust based on your setup

export default function Portfolio() {
  const { toast } = useToast()
  const [activeProject, setActiveProject] = useState(0)
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const projects = [
    {
      title: "Chat Website ",
      description: "Connect and chat in real-time with friends and colleagues on our vibrant, dynamic chat platform. Enjoy a customizable experience with colorful themes that brighten every conversation!",
      technologies: ["React", "Java Script", " CSS","Mongo DB","Express Js"],
      image: chatapp,
      icon: <Calculator className="h-5 w-5" />,
      link: "https://chatapp-lovat-chi.vercel.app",
    },
    
    {
      title: "E-commerce Website",
      description: "A full-featured e-commerce platform with Add Our Products .",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      image: ecommerceImage,
      icon: <ShoppingCart className="h-5 w-5" />,
      link: "https://ecommerce-ruby-psi.vercel.app",
    },
    {
      title: "Survey Mobile App",
      description: "A cross-platform mobile application for creating and conducting surveys with real-time analytics.",
      technologies: ["React Native", "Mongo DB","Express JS","Node JS"],
      image: "/placeholder.svg?height=300&width=500",
      icon: <Smartphone className="h-5 w-5" />,
      link: "#",
    },
    {
      title: "Badminton Tournament App",
      description: "A mobile application for managing badminton tournaments, players, and match schedules.",
      technologies: ["React Native", "Node.js", "MongoDB/FireBase", "Express JS"],
      image: "/placeholder.svg?height=300&width=500",
      icon: <Smartphone className="h-5 w-5" />,
      link: "#",
    },
  ]

  const skills = [
    {
      name: "Frontend Development",
      icon: <Code className="h-6 w-6" />,
      items: [
        "HTML5",
        "CSS3",
        "JavaScript ",
        "TypeScript",
        "React.js",
        "React Native",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      name: "Backend Development",
      icon: <Server className="h-6 w-6" />,
      items: ["Node.js", "Express.js", "RESTful APIs", "Authentication/JWT"],
    },
    {
      name: "Database",
      icon: <Database className="h-6 w-6" />,
      items: ["MongoDB",  "Firebase", ],
    },
    {
      name: "Tools & Deployment",
      icon: <Zap className="h-6 w-6" />,
      items: ["Git/GitHub", "API'S", "Vercel", "Webpack/Vite","Testing"],
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const formData = new FormData(e.target)
  //   const name = formData.get("name")
  //   const email = formData.get("email")
  //   const subject = formData.get("subject")
  //   const message = formData.get("message")

    // In a real implementation, you would send this data to a server
    // For now, we'll just show a success toast
    // toast({
    //   title: "Message sent!",
    //   description: `Thanks for reaching out, ${name}. I'll get back to you soon.`,
    // })
  //   e.target.reset()

    // Reset the form
  // }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
  
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("Error sending message.");
    }
  };
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <>
      <CustomCursor />
       <div className="min-h-screen bg-gradient-to-b from-background to-background overflow-hidden"> 
        {/* Hero Section */}

<section className="relative min-h-screen flex items-center py-20 md:py-0 overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
  <Meteors />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_40%)] z-0"></div>

  <div className="container relative z-10 px-4 md:px-6">
    <motion.div
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
    >
      {/* Left Section: Text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center space-y-6"
      >
        <CanvasReveal>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg space-y-4 max-w-2xl">
            <Badge className="mb-2 text-white border border-yellow-400 bg-yellow-400/10 shadow-md" variant="outline">
              Full Stack Developer
            </Badge>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-teal-300"
            >
              Jerald Raphel
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-neutral-300 max-w-xl"
            >
              Building innovative digital experiences with modern technologies and a focus on user experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              {/* Projects Button */}
              <Button
                asChild
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all shadow-md"
              >
                <a
                  href="#projects"
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("projects");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  See Projects <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              {/* Contact Button with Black Text */}
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-black bg-white hover:bg-white/90 transition-all"
              >
                Contact Me
              </Button>
            </motion.div>
          </div>
        </CanvasReveal>
      </motion.div>

      {/* Right Section: Single Globe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex justify-center lg:justify-end"
      >
        <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
          <DigitalGlobe />
        </div>
      </motion.div>
    </motion.div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center items-start p-1">
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        className="w-1 h-1 rounded-full bg-white"
      />
    </div>
  </div>
</section>

        {/* Skills Section */}

<section className="py-16 md:py-24 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-[#1A0D31] to-[#09090B] z-0"></div> {/* Dark professional gradient */}
  <div className="container relative z-10 px-4 md:px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
    >
      <div className="space-y-2">
        <Badge variant="outline" className="border-[#FFD700]/20 bg-[#FFD700]/5 text-white">
          Expertise
        </Badge>
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#00796B] to-[#FFD700]">
          My Skillset
        </h2>
        <p className="max-w-[700px] text-[#B0B0B0] md:text-xl font-sans">
          A comprehensive toolkit for building modern web and mobile applications from front to back.
        </p>
      </div>
    </motion.div>

    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {skills.map((skill, index) => (
        <motion.div key={index} variants={item}>
          <Card className="h-full transition-all hover:shadow-xl border-[#FFD700]/20 bg-gradient-to-b from-[#1A0D31] to-[#09090B]/5 hover:bg-gradient-to-b hover:from-[#1A0D31] hover:to-[#00796B]/10">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-[#00796B]/10 text-white">{skill.icon}</div> {/* White icons */}
                <CardTitle className="text-white">{skill.name}</CardTitle> {/* White text for skill name */}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-[#E0E0E0]"> {/* Lighter gray text for content */}
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#FFD700]"></div> {/* Gold accent for items */}
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>


        {/* Projects Section */}

      <section id="projects" className="py-16 md:py-24 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-[#1A0D31] to-[#09090B] z-0"></div> {/* Professional dark background gradient */}
  <div className="container relative z-10 px-4 md:px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
    >
      <div className="space-y-2">
        <Badge variant="outline" className="border-[#00796B]/20 bg-[#00796B]/5 text-white">
          Portfolio
        </Badge>
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#00796B] to-[#FF6F00]">
          Featured Projects
        </h2>
        <p className="max-w-[700px] text-[#B0B0B0] md:text-xl font-sans">
          A selection of my recent work showcasing my skills and expertise.
        </p>
      </div>
    </motion.div>
    <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`cursor-pointer p-4 rounded-lg transition-all ${
              activeProject === index
                ? "bg-gradient-to-r from-[#00796B]/10 to-[#FF6F00]/10 border border-[#00796B]/20"
                : "hover:bg-[#00796B]/5"
            }`}
            onClick={() => setActiveProject(index)}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-full bg-[#00796B]/10 text-white">{project.icon}</div> {/* Logo color set to white */}
              <h3 className="text-xl font-semibold text-white">{project.title}</h3> {/* Project name set to white */}
            </div>
            <p className="text-[#D1D1D1] mt-1">{project.description}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-xl border border-[#00796B]/20 bg-gradient-to-b from-[#09090B] to-[#1A0D31]/5 p-2"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="overflow-hidden rounded-lg">
              <motion.img
                src={typeof projects[activeProject].image === "string" ? projects[activeProject].image : projects[activeProject].image?.src || "/placeholder.svg"}
                alt={projects[activeProject].title}
                className="w-full h-auto object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="p-2">
              <h3 className="text-xl font-semibold text-white">{projects[activeProject].title}</h3> {/* Project name set to white */}
              <div className="flex flex-wrap gap-2 mt-3">
                {projects[activeProject].technologies.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-[#00796B]/10 text-white hover:bg-[#00796B]/20"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="mt-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-[#00796B] to-[#FF6F00] hover:from-[#00796B] hover:to-[#FF6F00]"
                >
                  <a href={projects[activeProject].link} target="_blank" rel="noopener noreferrer">
                    View Project <ArrowRight className="ml-2 h-4 w-4 text-white" /> {/* Arrow icon color set to white */}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  </div>
</section>


        {/* Contact Section */}
         
         <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-[#0c0f1a] via-[#101726] to-[#0c0f1a]">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,150,0.04),transparent_60%)] z-0"></div>
  <div className="container relative z-10 px-4 md:px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
    >
      {/* Left: Info */}
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <Badge variant="outline" className="border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
            Get in Touch
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-400">
            Let's Work Together
          </h2>
          <p className="max-w-[600px] text-neutral-300 md:text-xl">
            I'm currently open to freelance work and full-time opportunities. If you're interested in collaborating, reach out!
          </p>
        </div>

        {/* Contact Info List */}
        <ul className="space-y-4 mt-4">
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-3 text-neutral-200"
          >
            <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400">
              <Mail className="h-5 w-5" />
            </div>
            <a href="mailto:jjeraldraphel@gmail.com" className="hover:underline">
              jjeraldraphel@gmail.com
            </a>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3 text-neutral-200"
          >
            <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400">
              <Github className="h-5 w-5" />
            </div>
            <a href="https://github.com/jerald-raphel/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              github.com/jeraldraphel
            </a>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-3 text-neutral-200"
          >
            <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400">
              <Linkedin className="h-5 w-5" />
            </div>
            <a
              href="https://linkedin.com/in/jeraldraphel"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              linkedin.com/in/jeraldraphel
            </a>
          </motion.li>
        </ul>
      </div>

      {/* Right: Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#101726]/70 rounded-xl border border-emerald-400/20 p-6 shadow-2xl backdrop-blur-md"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-neutral-200">Name</label>
              <input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-emerald-500/20 bg-black/30 text-white px-3 py-2 text-sm placeholder:text-neutral-500"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-200">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-emerald-500/20 bg-black/30 text-white px-3 py-2 text-sm placeholder:text-neutral-500"
                placeholder="Your email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-neutral-200">Subject</label>
            <input
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-emerald-500/20 bg-black/30 text-white px-3 py-2 text-sm placeholder:text-neutral-500"
              placeholder="Subject"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-neutral-200">Message</label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              className="flex min-h-[120px] w-full rounded-md border border-emerald-500/20 bg-black/30 text-white px-3 py-2 text-sm placeholder:text-neutral-500"
              placeholder="Your message"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold"
          >
            Send Message
          </Button>
          {status && (
            <p className="text-sm text-center text-emerald-400 pt-2">{status}</p>
          )}
        </form>
      </motion.div>
    </motion.div>
  </div>
</section>

        {/* Footer */}

      <footer className="py-8 relative bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-900 text-white">
  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500 via-indigo-600 to-transparent"></div>
  <div className="container relative z-10 flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
    <div className="flex items-center gap-2">
      <Code className="h-6 w-6 text-violet-400" />
      <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-indigo-400">
        Jerald Raphel
      </span>
    </div>
    <p className="text-sm text-gray-300">
      © {new Date().getFullYear()} Jerald Raphel. All rights reserved.
    </p>
    <div className="flex gap-4">
      <a
        href="https://github.com/jerald-raphel"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors"
      >
        <Github className="h-5 w-5" />
        <span className="sr-only">GitHub</span>
      </a>
      <a
        href="https://linkedin.com/in/jeraldraphel"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors"
      >
        <Linkedin className="h-5 w-5" />
        <span className="sr-only">LinkedIn</span>
      </a>
      <a
        href="mailto:jjeraldraphel@gmail.com"
        className="text-gray-400 hover:text-white transition-colors"
      >
        <Mail className="h-5 w-5" />
        <span className="sr-only">Email</span>
      </a>
    </div>
  </div>
</footer>


      </div>
      <Toaster />
    </>
  )
}

