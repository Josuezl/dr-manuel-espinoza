export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  type: "articulo" | "caso-clinico";
  date: string;
  readTime: string;
  imageUrl: string;
  author: string;
}

export const blogPostsData: BlogPost[] = [
  {
    id: "tavi-pacientes-mayores",
    title: "TAVI: La nueva era del tratamiento de la estenosis aórtica severa",
    excerpt: "Descubra cómo el implante valvular aórtico transcatéter permite reemplazar la válvula del corazón sin necesidad de cirugía abierta, con una recuperación menor a 72 horas.",
    content: "La estenosis aórtica severa es una de las enfermedades de las válvulas cardíacas más comunes en personas mayores de 70 años. Consiste en la calcificación y estrechamiento de la válvula aórtica, lo que impide que la sangre salga de manera fluida del corazón al resto del cuerpo. Históricamente, el único tratamiento efectivo era la cirugía a corazón abierto, que requería abrir el esternón y conectar al paciente a una máquina de circulación extracorpórea.\n\nHoy en día, gracias a la tecnología TAVI (Transcatheter Aortic Valve Implantation), es posible implantar una nueva prótesis biológica a través de un catéter introducido por la ingle (arteria femoral). Este avance representa un cambio radical en la cardiología moderna: el paciente permanece consciente o bajo sedación ligera, el tiempo de internamiento se reduce de semanas a solo 2 o 3 días, y la reincorporación a las actividades normales es casi inmediata.\n\nEn este artículo analizamos cuáles son las indicaciones, los criterios de selección de pacientes y por qué las guías internacionales la recomiendan actualmente no solo para pacientes de alto riesgo quirúrgico, sino también de riesgo moderado.",
    type: "articulo",
    date: "2026-05-15",
    readTime: "5 min de lectura",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    author: "Dr. Manuel Espinoza"
  },
  {
    id: "caso-angioplastia-calcificada",
    title: "Caso Clínico: Angioplastia guiada por IVUS y litotricia intravascular",
    excerpt: "Resolución intervencionista exitosa de una obstrucción coronaria del 95% críticamente calcificada en un paciente diabético con contraindicación para cirugía abierta.",
    content: "Paciente masculino de 68 años con antecedentes de diabetes mellitus tipo 2 y enfermedad renal crónica en estadio III. Acude por presentar angina inestable de esfuerzo clase funcional III. El ecocardiograma revela fracción de eyección del 45%. El cateterismo cardiaco mostró una lesión grave y severamente calcificada del 95% en el segmento proximal de la arteria descendente anterior (DA).\n\nDebido al elevado riesgo quirúrgico estimado por la escala STS (8.4%), se decide realizar un intervencionismo percutáneo complejo guiado por imagen intravascular. Se introdujo una sonda de ultrasonido intracoronario (IVUS) para evaluar la extensión del calcio, confirmando un anillo de calcio de 360 grados y un grosor superior a 1.0 mm, lo que imposibilitaba la expansión adecuada de un stent convencional.\n\nSe procedió a realizar litotricia intravascular (Shockwave) mediante un balón emisor de ondas de choque acústicas para fracturar el calcio en la pared del vaso sanguíneo. Posteriormente, guiados por IVUS, se colocó con éxito un stent liberador de fármaco de 3.5 x 28 mm, logrando una expansión del 100% y un flujo coronario distal TIMI III sin complicaciones. El paciente fue dado de alta a las 24 horas asintomático.",
    type: "caso-clinico",
    date: "2026-05-02",
    readTime: "8 min de lectura",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    author: "Dr. Manuel Espinoza"
  },
  {
    id: "importancia-imagen-intracoronaria",
    title: "Ultrasonido Intracoronario (IVUS): Ver para curar en la sala de hemodinámica",
    excerpt: "Por qué la angiografía convencional ya no es suficiente. El papel del IVUS y la OCT en garantizar la durabilidad y seguridad a largo plazo de las angioplastias con stent.",
    content: "Durante décadas, la angiografía por rayos X ha sido el estándar de oro para diagnosticar las obstrucciones de las arterias coronarias. Sin embargo, la angiografía solo proporciona una silueta bidimensional (una 'sombra') del flujo de sangre dentro del vaso. No permite ver el grosor real de la placa de ateroma, su composición ni cómo queda adaptado el stent tras su implante.\n\nAquí es donde radica el valor de la imagen intracoronaria moderna, como el IVUS (Ultrasonido Intracoronario) y la OCT (Tomografía de Coherencia Óptica). Al introducir una diminuta cámara y sensor dentro de la misma arteria del paciente, los cardiólogos podemos observar la anatomía arterial desde adentro.\n\nEstudios científicos recientes confirman que las angioplastias coronarias complejas guiadas por IVUS disminuyen significativamente la tasa de eventos adversos cardiovasculares mayores, incluyendo la trombosis del stent y el infarto de miocardio, mejorando los pronósticos a 5 y 10 años de los pacientes tratados.",
    type: "articulo",
    date: "2026-04-20",
    readTime: "6 min de lectura",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
    author: "Dr. Manuel Espinoza"
  }
];
