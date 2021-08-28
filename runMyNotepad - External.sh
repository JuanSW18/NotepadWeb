#!/bin/bash
# Este es nuestro primer programa

RUN_CONFIG=myNotepad.conf
VIRTUALENV_NAME=envMyNotepad
RUN_FILE=app.py
PROJECT_PATH=''

# Colores
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Funciones

checkConfigFile () {
if [ -f "$RUN_CONFIG" ]; then
	file_exits=0
else
	file_exits=1
fi
return $file_exits
}

# -p: prompt -r: leer ruta
makeConfigFile () {
echo -e "${CYAN}** Configuracion inicial **${NC}"
read -p 'Ruta de MyNotepad: ' -r projectPath

PROJECT_PATH=$projectPath

echo $projectPath > $RUN_CONFIG
echo -e "${CYAN}Archivo de ejecución creado${NC}: ${GREEN}$RUN_CONFIG${NC}\n"
}

readConfigFile () {
n=1
while read -r line; do
if [ $n -eq 1 ]; then
	PROJECT_PATH=$line
fi
done < $RUN_CONFIG
}

activateEnv () {
cd "$PROJECT_PATH"
if [ -d $VIRTUALENV_NAME ]; then
	echo -e "${CYAN}Activando entorno virtual ...${NC}"
	cd "$VIRTUALENV_NAME/Scripts"
	source activate
	echo -e "${GREEN}Entorno virtual activado\n${NC}"
	cd ..
	cd ..
else
	echo -e "${RED} No existe entorno virtual: ${GREEN}$VIRTUALENV_NAME${NC}"
	echo -e "Ejecute el archivo ${GREEN}install${NC}"
fi
}

runNotepadProject () {
if [ -f $RUN_FILE ]; then
	echo -e "${CYAN}Iniciando MyNotepad ...\n${NC}"
	python $RUN_FILE
else
	echo -e "${RED} No existe archivo: ${GREEN}$RUN_FILE${NC}"
fi
}

# Funcion principal
mainFunction () {
if checkConfigFile ; then
	readConfigFile
else
	makeConfigFile
fi
activateEnv
runNotepadProject
exit 0
}

mainFunction
$SHELL