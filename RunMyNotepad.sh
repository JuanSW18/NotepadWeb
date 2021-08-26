#!/bin/bash
# Este es nuestro primer programa

RUN_CONFIG=myNotepad.conf
ENV_PATH=''
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
read -p 'Ruta del entorno virtual: ' -r envPath
read -p 'Ruta de MyNotepad: ' -r projectPath

ENV_PATH=$envPath
PROJECT_PATH=$projectPath

echo $envPath > $RUN_CONFIG
echo $projectPath >> $RUN_CONFIG
echo -e "${CYAN}Archivo de ejecución creado${NC}: ${GREEN}$RUN_CONFIG${NC}"
echo ""
}

readConfigFile () {
n=1
while read -r line; do
if [ $n -eq 1 ]; then
	ENV_PATH=$line
fi

if [ $n -eq 2 ]; then
	PROJECT_PATH=$line
fi
n=$((n+1))
done < $RUN_CONFIG
}

activateEnv () {
echo -e "${CYAN}Activando entorno virtual ...${NC}"
cd "$ENV_PATH/Scripts"
source activate
echo -e "${GREEN}Entorno virtual activado${NC}"
echo ""
}

runNotepadProject () {
echo -e "${CYAN}Iniciando MyNotepad ...${NC}"
echo ""
cd $PROJECT_PATH
python app.py
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