#!/bin/bash
# Ejecutar MyNotepad

VIRTUALENV_NAME=envMyNotepad
RUN_FILE=app.py

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

activateEnv () {
if [ -d $VIRTUALENV_NAME ]; then
	echo -e "${CYAN}Activando entorno virtual ...${NC}"
	cd "$VIRTUALENV_NAME/Scripts"
	source activate
	echo -e "${GREEN}Entorno virtual activado\n${NC}"
	cd ..
	cd ..
else
	echo -e "${RED} No existe entorno virtual: ${GREEN}$VIRTUALENV_NAME${NC}"
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

main () {
activateEnv
runNotepadProject
exit 0
}

main
$SHELL