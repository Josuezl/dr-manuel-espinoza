import type { PageContent } from "@/components/content/ContentPage";

export const infarto: PageContent = {
  slug: "infarto",
  h1: "Síntomas de infarto: cómo reconocerlo y qué hacer",
  intro:
    "Si estás leyendo esto con dolor en el pecho en este momento, buscá atención de emergencia ahora. No esperés a que pase y no manejés vos mismo hasta el hospital. En el infarto, cada minuto cuenta: cuanto antes se abre la arteria, más músculo cardíaco se salva.",
  secciones: [
    {
      h2: "Señales de alarma",
      parrafos: [
        "El síntoma más frecuente es dolor u opresión en el centro del pecho que dura más de veinte minutos, que no cede con el reposo y que puede extenderse al brazo izquierdo, al cuello, a la mandíbula o a la espalda.",
        "Suele acompañarse de sudoración fría, náusea, falta de aire, mareo o una sensación intensa de angustia. Muchos pacientes lo describen como un peso sobre el pecho más que como un dolor punzante.",
        "En mujeres, personas con diabetes y adultos mayores el cuadro puede ser atípico: cansancio súbito y desproporcionado, malestar en la boca del estómago, o dificultad para respirar sin dolor evidente. Estos casos se diagnostican más tarde, y esa demora empeora el pronóstico.",
      ],
    },
    {
      h2: "Qué hacer en los primeros minutos",
      parrafos: [
        "Buscá atención de emergencia de inmediato. Si es posible, que otra persona te lleve o llamá a un servicio de emergencia: manejar con un infarto en curso es peligroso para vos y para los demás.",
        "Dirigite a un hospital que cuente con sala de hemodinamia. El tratamiento que más vidas salva en el infarto con elevación del segmento ST es la angioplastia primaria, y solo puede hacerse en un centro con esa capacidad.",
        "No tomés medicamentos por cuenta propia sin indicación médica. Si ya tenés una indicación previa de tu cardiólogo para este escenario, seguí esa indicación.",
      ],
    },
    {
      h2: "Qué es un infarto",
      parrafos: [
        "Un infarto ocurre cuando una arteria coronaria se obstruye y deja sin sangre a una parte del músculo cardíaco. Sin oxígeno, ese tejido empieza a morir en cuestión de minutos, y el daño es irreversible.",
        "La causa habitual es la ruptura de una placa de colesterol dentro de la arteria, que forma un coágulo y la tapa de golpe. Por eso un infarto puede ocurrir en personas que nunca sintieron nada antes.",
      ],
    },
    {
      h2: "Cómo se trata",
      parrafos: [
        "El objetivo es abrir la arteria obstruida lo antes posible. La angioplastia primaria hace eso mediante un catéter: se cruza la obstrucción, se infla un balón y se coloca un stent que mantiene la arteria abierta.",
        "En lesiones muy calcificadas puede necesitarse litotricia intravascular, y la imagen intracoronaria (IVUS u OCT) permite confirmar que el stent quedó bien expandido, algo que reduce el riesgo de complicaciones posteriores.",
        "Después del infarto, el tratamiento continúa con medicamentos antiagregantes, control de la presión, del colesterol y de la diabetes, y rehabilitación cardíaca.",
      ],
    },
    {
      h2: "Cómo reducir el riesgo",
      parrafos: [
        "Los factores que más pesan son el tabaquismo, la presión alta, la diabetes, el colesterol elevado, el sobrepeso y el sedentarismo. Todos son modificables.",
        "Si tenés antecedentes familiares de enfermedad coronaria o alguno de esos factores, conviene una valoración cardiológica aunque no sientas nada. Muchas veces la primera manifestación de la enfermedad coronaria es el infarto mismo.",
      ],
    },
  ],
  relacionadas: [
    { label: "Angioplastia coronaria y stent", href: "/angioplastia-coronaria" },
    { label: "Hemodinamia y cateterismo cardíaco", href: "/hemodinamia" },
  ],
};
