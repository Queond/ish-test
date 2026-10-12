#!/bin/sh
# Run as root inside the intended iSH or Alpine WSL environment.
# Uses existing repositories and does not change Alpine release branches.
set -eu
if [ "$(id -u)" -ne 0 ]; then
  echo 'Run as root inside iSH or Alpine.' >&2
  exit 1
fi
command -v apk >/dev/null 2>&1 || { echo 'This script requires Alpine apk.' >&2; exit 1; }
cat /etc/alpine-release
apk update
apk upgrade
