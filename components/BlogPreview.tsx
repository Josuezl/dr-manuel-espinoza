"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPostsData } from "../data/blogPosts";

export default function BlogPreview() {
  // Take only the first 3 posts for preview
  const recentPosts = blogPostsData.slice(0, 3);

  return (
    <section className="py-24 bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-secondary font-semibold text-xs uppercase tracking-widest block">
              Educación & Ciencia
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary">
              Últimas Publicaciones y Casos Clínicos
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full" />
            <p className="text-primary/70 font-sans leading-relaxed">
              Artículos educativos sobre prevención y novedades en terapias cardíacas, además de reportes médicos detallados para profesionales.
            </p>
          </div>
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-sm font-bold text-secondary hover:text-accent group transition-colors whitespace-nowrap"
            >
              <span>Ir al Blog Completo</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col bg-cold-white rounded-2xl overflow-hidden border border-pearl-grey hover:border-accent/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
            >
              
              {/* Image with uniform cooling & desaturated effect */}
              <div className="relative aspect-video w-full overflow-hidden bg-primary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale-[30%] contrast-[110%] brightness-[95%] transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Blueish Cool Overlay tint */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-color" />

                {/* Badge Category */}
                <span className={`absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm ${
                  post.type === "caso-clinico"
                    ? "bg-accent text-primary"
                    : "bg-secondary text-white"
                }`}>
                  {post.type === "caso-clinico" ? "Caso Clínico" : "Artículo"}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  
                  {/* Meta (Date and read time) */}
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

                  {/* Title */}
                  <h3 className="text-lg font-bold font-serif text-primary leading-snug mb-3 group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-primary/70 text-xs leading-relaxed mb-6 font-sans">
                    {post.excerpt}
                  </p>

                </div>

                {/* Read more button link */}
                <div>
                  <Link
                    href={`/blog#${post.id}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-primary group-hover:text-accent transition-colors"
                  >
                    <span>Leer más</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
