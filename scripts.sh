#! /bin/bash

# --------------------------------------------
# Functions
# --------------------------------------------
# Setup docker-compose file
function setupDockerCompose() {
    docker-compose -f docker-compose.local.yaml up --build
}

# Start all containers
function startAllContainers() {
    docker start $(docker ps -aq --filter "name=osiris_mono_")
}

# Stop all containers
function stopAllContainers() {
    docker start $(docker ps -aq --filter "name=osiris_mono_")
}

# Remove and clear all containers
function removeAllContainers() {
    read -p "Are you sure? " -n 1 -r
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        docker-compose -f docker-compose.local.yaml down -v
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
