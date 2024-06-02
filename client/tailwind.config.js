/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  "darkMode": 'selector',
  theme: {
    extend: {
      //Esto se conoce como "Variables CSS personalizadas", es como traducir las variables de CSS con "root:{}" a Tailwind.
      //La propiedad colors dentro de theme es un objeto literal que define los colores disponibles para su uso en las clases de utilidad. Si cambiaras el nombre de colors a otra cosa, Tailwind CSS no la reconocerá como la propiedad responsable de definir los colores.
      colors: { 
        //! Colores primarios
        'bright-blue': 'hsl(220, 98%, 61%)',
        'bright-blue-hover': 'hsl(220, 98%, 58%)',
        'check-background': 'linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
        //? LINEAR GRADIENT COLORS:
        'custom-blue': 'hsl(192, 100%, 67%)',
        'custom-purple': 'hsl(280, 87%, 65%)',

        //! Tonos neutros - Tema claro
        'very-light-gray': 'hsl(0, 0%, 98%)',                  //Form bg
        'very-light-grayish-blue': 'hsl(236, 33%, 92%)',       //Body bg
        'light-grayish-blue': 'hsl(233, 11%, 84%)',            //input text color
        'dark-grayish-blue': 'hsl(236, 9%, 61%)',
        'very-dark-grayish-blue': 'hsl(235, 19%, 35%)',        //Input text color

        //! Tonos neutros - Tema oscuro
        'very-dark-blue': 'hsl(235, 21%, 11%)',                //Body bg
        'very-dark-desaturated-blue': 'hsl(235, 24%, 19%)',    //Form bg
        'light-grayish-blue-dark': 'hsl(234, 39%, 85%)',       //Input text color
        'light-grayish-blue-dark-hover': 'hsl(236, 33%, 92%)',
        'dark-grayish-blue-dark': 'hsl(234, 11%, 52%)',
        'very-dark-grayish-blue-dark': 'hsl(233, 14%, 35%)',   //input outline color
        'very-dark-grayish-blue-darker': 'hsl(237, 14%, 26%)',
      },
      // Extiende el tema de Tailwind para agregar una clase personalizada 'mobile-dark'
      // que establece una imagen de fondo para dispositivos móviles
      backgroundImage: theme => ({
        'mobile-dark': "url('../../assets/bg-mobile-dark.jpg')",
        'mobile-light': "url('../../assets/bg-mobile-light.jpg')", //No se porque pero esta debe ser la ruta, y al parecer la carpeta assets debe estar dentro de la carpeta public para que funcione.
        'desktop-light': "url('../../assets/bg-desktop-light.jpg')",
        'desktop-dark': "url('../../assets/bg-desktop-dark.jpg')",
      }),
      spacing: {
        '-40': '-40px', // Margen negativo personalizado, esto me permite usar margenes negavitos, al parecer puedo colocar cualquier valor y funciona!
      },
      margin: generatePixel(),
      padding: generatePixel(),
      width: generatePixel(),
      height: generatePixel(),
      minHeight: generatePixel(),
      minWidth: generatePixel(),
      maxWidth: generatePixel(),
      fontSize: generatePixel(),
      letterSpacing: generatePixel(),
      borderColor: generatePixel(),
      borderRadius: generatePixel(),
      gap: generatePixel(),
      fontFamily: {
        'josefin-sans': ['Josefin Sans', 'sans-serif'],
      },
      screens: {
        'md': '768px',
        'lg': '1080px',
        'xl': '1360px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '*': {
          margin: '0',
          padding: '0',
          boxSizing: 'border-box',
        },
      });
    },
  ],
}

// El propósito principal de esta función es generar dinámicamente clases de utilidad de altura en Tailwind CSS, permitiendo especificar alturas en píxeles de manera más precisa y flexible.
function generatePixel() {
  const pixels = {};
  for (let i = 1; i <= 1000; i++) { 
    pixels[i] = `${i}px`;
  }
  return pixels;
}