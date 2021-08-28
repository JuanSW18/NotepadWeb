#!/bin/bash
# Instalación

# Constantes
VIRTUALENV_NAME=envMyNotepad
REQUIREMENTS_FILE=requirements.txt

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

isInstalled () {
if [[ $($1 --version) ]]; then
	echo -e "$1: ${GREEN}ok${NC}"
	command_exist=0
else
	echo -e "No se reconoce comando ${CYAN}$1${NC}"
	command_exist=1
fi
return $command_exist
}


checkRequirements () {
REQUIREMENTS=4
REQUIREMENTS_STATUS=0
for item in python pip virtualenv mongo
do
	isInstalled $item
	response=$?
	if [[ $response -eq 0 ]]; then
		REQUIREMENTS_STATUS=$(($REQUIREMENTS_STATUS+1))
	fi
done

if [ $REQUIREMENTS_STATUS -eq $REQUIREMENTS ]; then
	return 0
else
	return 1
fi
}

configVirtualEnv () {
if [ -d $VIRTUALENV_NAME ]; then
	echo -e "${GREEN}Entorno virtual ya existe!\n${NC}"
else
	echo -e "${CYAN}Creando entornoVirtual: ${GREEN}$VIRTUALENV_NAME${NC}"
	virtualenv $VIRTUALENV_NAME
	cd "$VIRTUALENV_NAME/Scripts"
	source activate
	echo -e "${GREEN}Entorno virtual activado\n${NC}"
	cd ..
	cd ..
	echo -e "${GREEN}Entorno virtual creado\n${NC}"
fi

if [ -f $REQUIREMENTS_FILE ]; then
	echo -e "${CYAN}Instalando paquetes para MyNotepad${NC}"
	pip install -r $REQUIREMENTS_FILE
	echo -e "${GREEN}Paquetes instalados\n${NC}"
else
	echo -e "${RED}Error: Archivo $REQUIREMENTS_FILE no encontrado\n${NC}"
fi
}

main () {
checkRequirements
checked=$?
if [[ $checked -eq 0 ]]; then
	echo -e "\n${CYAN}Iniciando instalación ...${NC}"
	configVirtualEnv
	echo -e "${CYAN}Instalación completa${NC}"
	echo -e "Ahora ejecute ${GREEN}'runMyNotepad'\n${NC}"
	echo -e "Tambien puede copiar ${GREEN}'runMyNotepad - External'${NC} en su escritorio y ejecutarlo para configurar un acceso directo\n"
	echo "La ventana se cerrará en 20 segundos ..."
	sleep 20s
else
	echo "El sistema no tiene los componentes requeridos."
fi
exit 0
}

main
$SHELL
