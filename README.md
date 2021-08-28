# Notepad-Web
Bloc de notas centralizado con almacenamiento en base de datos.

## Requisitos previos
1. Python 3.6
2. [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/install.html)
3. MongoDB 4.4.2


## Crear base de datos Mongo
1. Abre el CMD y ejecuta el comando para iniciar la consola de mongo.
    ```bash
    mongo
    ```
2. Ejecuta el siguiente comando para crear la base de datos.
    ```bash
    use <mi_base_de_datos>
    ```
3. Para finalizar la creacion debemos agregar un registro.
    ```bash
    db.temp_collection.insert({info: "registro temporal" })
    ```

## Instalación
1. Clona el proyecto en una carpeta.
    ```bash
    git clone https://github.com/JuanSW18/NotepadWeb.git
    ```
2. Ejecuta el archivo **install**.
3. Luego que termine la instalación ejecuta el archivo **runMyNotepad**.  Antes de ejecutar este paso revisa la siguiente sección (**Configurar conexión de base de datos**).
4. Abre el navegador y entra a **localhost:5000**.
5. [Opcional] Puedes copiar el archivo **runMyNotepad - External** en tu escritorio y ejecutarlo para configurar un **acceso directo**.

## Configurar conexión de base de datos
Edita el archivo **config.py** que se encuentra dentro de la carpeta **NotepadWeb** y coloca las configuraciones de tu base de datos Mongo.
```python
MONGODB_DB = 'notepad_db'
MONGODB_HOST = '127.0.0.1'
MONGODB_PORT = 27017
MONGODB_USERNAME = ''
MONGODB_PASSWORD = ''
```

## License
[MIT](https://choosealicense.com/licenses/mit/)