#! /bin/bash

# --------------------------------------------
# Load .env file
# --------------------------------------------

serviceName=$(grep SERVICE_NAME .env | xargs)
IFS='=' read -ra serviceName <<< "$serviceName"
# shellcheck disable=SC2178
serviceName=${serviceName[1]}

# --------------------------------------------
# Functions
# --------------------------------------------

# Setup docker-compose file
function setupDockerCompose() {
    docker-compose -f ./docker-compose.yaml up --build
}

# Start all containers
function startAllContainers() {
    # shellcheck disable=SC2128
    # shellcheck disable=SC2046
    docker start $(docker ps -aq --filter "name=${serviceName}")
}

# Stop all containers
function stopAllContainers() {
    # shellcheck disable=SC2128
    # shellcheck disable=SC2046
    docker stop $(docker ps -aq --filter "name=${serviceName}")
}

# Remove and clear all containers
function removeAllContainers() {
    read -p "Are you sure? " -n 1 -r
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        docker-compose -f ./docker-compose.yaml down -v
    fi
}

# Check status of all containers
function checkStatus() {
    docker ps -a
}

# --------------------------------------------
# Main
# --------------------------------------------

read -rep $'\033[32m What do you need? [setup | run | stop | doctor | removeAll]:\033[36m ' command

case $command in
  setup)
    setupDockerCompose
    ;;
  run)
    startAllContainers
    ;;
  stop)
    stopAllContainers
    ;;
  doctor)
    checkStatus
    ;;
  removeAll)
    removeAllContainers
    ;;
  *)
    echo $'\033[31m Wrong Command! You are tired, go an make a cup of tea :) \033[0m'
    ;;
esac
