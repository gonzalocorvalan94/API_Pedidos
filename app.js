import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors()); //Soluciona el problema cors: sirve para decirle a la api quienes pueden userla y quien no.
app.use(morgan('dev')); //Esto da por consola detalles sobre las ejecuciones que hagas en postman
app.use(helmet()); //esto es un middleware de seguridad

/* 
rutas
*/ 

const PORT = process.env.PORT || 3000; //proces.env.PORT es el puerto que te dan cuando subis la api a un servidor, ahi vos no podes elegir el puerto. Entonces el puerto va a ser el que te asignen. Si no estas en estas codiciones, va a ser el 3000. PORT siempre se define en mayusculas por convención.

app.listen(PORT,()=>{
  console.log(`API funcionando en http://localhost:${PORT}`)
})

