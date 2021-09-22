#! /bin/bash

# create a function for running all containers
function startAllContainers() {
    docker start $(docker ps -aq --filter "name=nestjs_boilerplate_")
}
# create a function for stopping all container
function stopAllContainers() {
    docker start $(docker ps -aq --filter "name=nestjs_boilerplate_")
}

# create a function for checking containers statuses
function checkStatus() {
    docker ps -a
}

read -rep $'\033[32m What do you need? [run|stop|doctor]:\033[34m ' command

case $command in
  run)
    startAllContainers
    ;;
  stop)
    stopAllContainers
    ;;
  doctor)
    checkStatus
    ;;
  *)
    echo $'\033[31m Wrong Command! You are tired, go an make a cup of tea :) \033[0m'
    ;;
esac
