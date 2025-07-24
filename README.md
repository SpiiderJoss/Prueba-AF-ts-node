 Ejecución del proyecto
Azure Functions Core Tools v4 o superior

📦 Instalación
Ejecuta el siguiente comando para instalar las dependencias:
npm install
⚙️ Compilar el proyecto
Para compilar el código TypeScript a JavaScript:
npm run build
▶️ Iniciar el servicio
Para correr el proyecto localmente:
npm start
Asegúrate de haber ejecutado npm run build antes de iniciar.

Dificultades que atravesé: me encontraba algo des actualizado con las ultimas actualizaciones de node y typescript con azure functions, por lo que tarde un poco en identificar algunos problemas que me sucedieron a la hora de codificar, especialmente con sintaxys de las configuraciones, use documentación de microsoft mas reciente para realizarlo con las ultimas versiones.


📷 Capturas de ThunderClient
✅ Crear orden válida
<img width="1529" height="501" alt="image" src="https://github.com/user-attachments/assets/04042c22-2992-49f3-8ec4-f8720514bc28" />
❌ Crear orden no válida (debe iniciar con "user" y tener al menos 10 caracteres)
<img width="1524" height="471" alt="image" src="https://github.com/user-attachments/assets/4578f7aa-b390-4512-bf01-baa1810118b0" />
🔍 Obtener orden por ID
<img width="1528" height="454" alt="image" src="https://github.com/user-attachments/assets/d4edf902-1a6e-43be-9b2d-e66b2920a232" />
🗑 Eliminar orden por ID
<img width="1529" height="503" alt="image" src="https://github.com/user-attachments/assets/6c2fc208-d391-476f-925d-5e65c8db9502" />
📄 Obtener orden eliminada (estatus: cancelado)
<img width="1524" height="495" alt="image" src="https://github.com/user-attachments/assets/380f8c20-7ce7-4982-aaee-822702a6d61b" />
