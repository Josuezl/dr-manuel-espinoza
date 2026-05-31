export interface Testimonial {
  id: string;
  name: string;
  age: number;
  condition: string;
  text: string;
  rating: number;
  city: string;
  avatarUrl: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Héctor Rodríguez",
    age: 74,
    condition: "Estenosis Aórtica Severa (Tratada con TAVI)",
    text: "Antes del procedimiento con el Dr. Manuel Espinoza, no podía caminar ni media cuadra sin sentir que me ahogaba. Me daba pánico pensar en una cirugía abierta a mi edad. El Doctor me explicó con detalles la técnica TAVI. Todo salió perfecto: en dos días ya estaba en mi casa y hoy puedo pasear con mis nietos sin fatiga. Le debo la vida y una calidad de vida que no creí recuperar.",
    rating: 5,
    city: "Tegucigalpa",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "2",
    name: "Carmen Villeda",
    age: 62,
    condition: "Angioplastia Coronaria de Alta Complejidad",
    text: "Mi esposo y yo recorrimos varios especialistas por una obstrucción calcificada muy difícil de tratar. Nos decían que era muy peligrosa. El Dr. Manuel Espinoza utilizó tecnología de imagen intracoronaria y litotricia para colocar los stents con precisión quirúrgica. Su trato humano y la tranquilidad que transmite en momentos tan críticos son excepcionales.",
    rating: 5,
    city: "San Pedro Sula",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "3",
    name: "Dr. Arturo Menjívar",
    age: 58,
    condition: "Colega Referidor (Cardiólogo Clínico)",
    text: "Como cardiólogo clínico, mis pacientes son mi mayor responsabilidad. Cuando me enfrento a casos de estenosis aórtica extrema o lesiones coronarias multivaso que requieren un intervencionismo de precisión extrema, el Dr. Manuel Espinoza es mi referente de confianza. Su formación internacional y liderazgo técnico garantizan que mis pacientes estén en las mejores manos posibles.",
    rating: 5,
    city: "Tegucigalpa",
    avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200"
  }
];
