# Pomodoro Challange

## Situación Actual y complicaciones
El equipo de NeuralWorks ha tenido problemas con el manejo del tiempo en home office y ha decidido crear
NeuralClocks, una herramienta que permita optimizar los tiempos tanto personales como del equipo en si. Se han
pensado features cómo modificar las horas de las reuniones entre el equipo para optimizar la intersección de los
bloques de trabajo de cada asistente, unirse al temporizador de alguno de sus compañeros para cuando se realice
pair-programming o planificaciones en conjunto, entre otros.

## Solución
Si bien hay muchas ideas y ambición de lo que se puede construir con NeuralClocks, el paso número uno es crear un timer para poder seguir la metodología Pomodoro.

## Diseño
Se decidio por hacer el cronometro en React.js especificamente usando Next.js y material UI para los componentes. En aspecto de posicionamiento de los componentes, se tomo la desición de usar un icono para los ajustes del cronometro que al ser clickeado hace aparecer un modal con opciones para cambiar cada uno de los distintos cronometros. Hablando de los cronometros, hay 3 distintos: el pomodoro, la pausa pequeña y la pausa larga. Se decidio acceder a estos a través de tres botones que estan por debajo del icono de ajustes pero sobre el cronometro en si, en caso de querer cambiar de cronometro o cerrar la ventana en medio del conteo aparecera un prompt de advertencia. Con respecto al cronometro, este cambia de acuerdo a la opción escogida y al comenzar su conteo este es rodeado por una barra de progreso circular que desaparece al pausar el conteo o reiniciarlo.

## ¿Qué pudo hacerce mejor?
La barra de progreso que rodea el cronometro se actualiza cada vez que el valor dle minuto baja, esto es incluyendo al principio, esto pudo hacerce para que no fuera así y se pudiera actualizar tomando en cuenta los segundos también. Además de esto, se pudo conservar el tiempo original dem ejor manera, talvez usando redux o algun salvador de estados.

## Cosas más tecnicas
Se usó bastante las llamadas de estados setState y useRef para poder asentar variables y pasarlas entre los componentes que las necesitaban. Se necesitaron variables para los tiempos de cada cronometro, la cantidad de segundos, la cantidad de segundos usados, los minutos originales, si el cronometro estaba corriendo, si el modal estaba abierto, si se acabo el tiempo y que valor de cronometro esta seleccionado en este momento.

## Como ejecutar el codigo
Puedes correr el programa usando:
npm run dev
## Dependencias 
Primero deben tener node instalado y usar npm install. Ya que todos los paquetes estan en package.json.

## MISC
El readme y algunas variables clave fueron escritos en español por motivos de claridad.