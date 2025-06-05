const axios = require('axios');

// Preguntas y respuestas precargadas


const preguntasPrecargadas = {
  "¿Qué significa 'Consultar Diseño'?": "Permite visualizar los planos o esquemas previamente cargados en el sistema para entender la distribución o diseño general del proyecto o instalación.",
  "¿Para qué sirve 'Consultar Ubicación'?": "Brinda acceso a la información detallada de las ubicaciones registradas, como zonas, sectores o puntos específicos dentro de un plano o diseño.",
  "¿Qué implica el 'Ingreso'?": "Hace referencia al registro de entrada de materiales, insumos u otros recursos al sistema o al depósito correspondiente.",
  "¿Qué se gestiona desde 'Stock'?": "Permite ver y administrar la cantidad actual de materiales o productos disponibles, controlando entradas, salidas y existencias.",
  "¿Qué información ofrece 'Historial'?": "Muestra un registro detallado de todas las operaciones realizadas en el sistema, como ingresos, egresos, ediciones y movimientos de stock.",
  "¿Qué es 'Gemini AI'?": "Es un asistente inteligente que responde preguntas relacionadas con el uso del sistema, consultas frecuentes o recomendaciones operativas.",
  "¿Para qué sirve 'Importar Planos'?": "Permite cargar al sistema planos o esquemas en formato digital para que puedan ser consultados y utilizados en la gestión del diseño o ubicación.",
  "¿Qué hace la función 'Importar Ubicaciones'?": "Facilita la carga masiva de datos sobre ubicaciones desde archivos externos, agilizando el registro inicial o la actualización de ubicaciones.",
  "¿Cómo se utiliza 'Agregar Usuarios'?": "Permite registrar nuevos usuarios en el sistema, asignándoles roles, credenciales y permisos según sus responsabilidades.",
  "¿Qué permite hacer 'Editar Usuarios'?": "Da acceso a la modificación de datos de usuarios ya registrados, como nombre, correo, permisos o estado de la cuenta."
};


exports.askQuestion = async (req, res) => {
    const { question } = req.body;

    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`;

    if (!question) {
        return res.status(400).json({ error: 'La pregunta es requerida en el cuerpo de la solicitud.' });
    }

    // 1. Verificar si hay respuesta precargada
    if (preguntasPrecargadas[question]) {
        //console.log("Respuesta precargada encontrada para:", question);
        return res.json({
            question,
            answer: preguntasPrecargadas[question],
            source: "precargada"
        });
    }

    if (!GOOGLE_API_KEY) {
        console.error('Error: GOOGLE_API_KEY no está configurada.');
        return res.status(500).json({ error: 'Error de configuración del servidor: API Key no encontrada.' });
    }

    try {
        const payload = {
            contents: [
                {
                    parts: [
                        {
                            text: question
                        }
                    ]
                }
            ]
        };

        const headers = {
            'Content-Type': 'application/json',
        };

        console.log("Enviando pregunta a Gemini:", question);
        const response = await axios.post(API_URL, payload, { headers });

        if (response.data && response.data.candidates && response.data.candidates.length > 0 &&
            response.data.candidates[0].content && response.data.candidates[0].content.parts && response.data.candidates[0].content.parts.length > 0) {

            const aiResponse = response.data.candidates[0].content.parts[0].text;
            //console.log("Respuesta de Gemini:", aiResponse);
            res.json({
                question: question,
                answer: aiResponse,
                source: "gemini"
            });
        } else {
            console.warn("Respuesta de Gemini no contiene el texto esperado o fue bloqueada:", response.data);
            let reason = "La respuesta de la IA no pudo ser procesada.";
            if (response.data && response.data.promptFeedback && response.data.promptFeedback.blockReason) {
                reason = `La solicitud fue bloqueada por: ${response.data.promptFeedback.blockReason}`;
            }
            res.status(500).json({ error: reason, details: response.data });
        }

    } catch (error) {
        console.error('Error al conectar con Google AI:', error.response ? error.response.data : error.message);
        if (error.response && error.response.data && error.response.data.error) {
            return res.status(error.response.status || 500).json({
                error: 'Error al procesar la solicitud con Google AI.',
                details: error.response.data.error.message
            });
        }
        res.status(500).json({ error: 'Error interno del servidor al conectar con Google AI.' });
    }
};
