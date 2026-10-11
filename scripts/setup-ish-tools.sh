#!/bin/sh
# Quincy Childs - ish-test development tools
set -eu
if ! command -v apk >/dev/null 2>&1; then
  printf '%s\n' 'Run this script in iSH / Alpine Linux.' >&2
  exit 1
fi
if [ "$(id -u)" != 0 ]; then
  printf '%s\n' 'Run with root privileges to install Alpine packages.' >&2
  exit 1
fi
apk update
apk add git curl ca-certificates
printf '%s\n' 'Repository tools are ready.' 'This script does not install iOS or macOS applications.'
git --version
curl --version
