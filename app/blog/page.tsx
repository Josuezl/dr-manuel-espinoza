"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, User, BookOpen, X, ChevronRight } from "lucide-react";
import { blogPostsData, BlogPost } from "@/data/blogPosts";

export default function Blog() {
  const [filter, setFilter] = useState<"todos" | "articulo" | "caso-clinico">("todos");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Filter posts
  const filteredPosts = blogPostsData.filter(post => {
    if (filter === "todos") return true;
    return post.type === filter;
  });

  return (
    <div className="pb-20 bg-cold-white">
      
      {/* Header Banner */}
      <section className="bg-primary text-white pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,151,178,0.1),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-accent font-semibold text-xs uppercase tracking-widest block">
              Educación Cardiovascular
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-serif">
              Blog & Artículos Científicos
            </h1>
            <p className="text-white/80 max-w-2xl text-sm sm:text-base font-sans font-light leading-relaxed">
              Material didáctico e innovaciones médicas elaboradas por el Dr. Manuel Espinoza para pacientes y la comunidad clínica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-wrap items-center gap-3 border-b border-pearl-grey pb-6">
          <button
            onClick={() => setFilter("todos")}
            className={`px-5 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-wider transition-all duration-300 ${
              filter === "todos"
                ? "bg-primary text-white shadow-md"
                : "bg-white text-primary border border-pearl-grey hover:border-primary/50"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("articulo")}
            className={`px-5 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-wider transition-all duration-300 ${
              filter === "articulo"
                ? "bg-primary text-white shadow-md"
                : "bg-white text-primary border border-pearl-grey hover:border-primary/50"
            }`}
          >
            Artículos Educativos
          </button>
          <button
            onClick={() => setFilter("caso-clinico")}
            className={`px-5 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-wider transition-all duration-300 ${
              filter === "caso-clinico"
                ? "bg-primary text-white shadow-md"
                : "bg-white text-primary border border-pearl-grey hover:border-primary/50"
            }`}
          >
            Casos Clínicos
          </button>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col bg-white rounded-2xl overflow-hidden border border-pearl-grey shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-accent/30 transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-primary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale-[30%] brightness-[95%] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-color" />
                <span className={`absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm ${
                  post.type === "caso-clinico"
                    ? "bg-accent text-primary"
                    : "bg-secondary text-white"
                }`}>
                  {post.type === "caso-clinico" ? "Caso Clínico" : "Artículo"}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center space-x-4 text-[11px] text-primary/50 mb-3 font-sans">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-primary leading-snug mb-3 group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-primary/70 text-xs leading-relaxed mb-6 font-sans">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-primary group-hover:text-accent transition-colors"
                  >
                    <span>Leer Artículo Completo</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </motion.article>
          ))}
        </div>
      </section>

      {/* Reader Dialog Overlay */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-primary/95 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-pearl-grey max-h-[90vh] flex flex-col"
            >
              
              {/* Image banner inside reader */}
              <div className="relative h-60 sm:h-72 w-full bg-primary shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover grayscale-[20%] brightness-[90%]"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-color" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                {/* Back / Close button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full backdrop-blur-md transition-colors"
                  aria-label="Cerrar artículo"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="inline-block bg-accent text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {selectedPost.type === "caso-clinico" ? "Caso Clínico" : "Educativo"}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif leading-tight">
                    {selectedPost.title}
                  </h2>
                </div>
              </div>

              {/* Scrollable text content */}
              <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-primary/50 border-b border-pearl-grey pb-4 font-sans">
                  <span className="flex items-center space-x-1.5">
                    <User className="h-4 w-4 text-accent" />
                    <span>Por {selectedPost.author}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>Publicado el {selectedPost.date}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{selectedPost.readTime}</span>
                  </span>
                </div>

                {/* Excerpt callout */}
                <p className="text-primary font-sans text-sm font-semibold border-l-4 border-accent pl-4 leading-relaxed py-1 bg-cold-white rounded-r-xl">
                  {selectedPost.excerpt}
                </p>

                {/* Full Article Content */}
                <div className="font-sans text-sm sm:text-base text-primary/85 leading-relaxed space-y-4 whitespace-pre-line">
                  {selectedPost.content}
                </div>

              </div>

              {/* Footer inside reader */}
              <div className="bg-cold-white border-t border-pearl-grey p-6 shrink-0 flex items-center justify-between">
                <span className="text-xs text-primary/50 font-sans">
                  © Dr. Manuel Espinoza • Cardiología Estructural
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-primary hover:bg-primary-hover text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors flex items-center space-x-1"
                >
                  <span>Cerrar Lectura</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
