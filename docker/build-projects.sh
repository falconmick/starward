#!/usr/bin/env bash

echo "Buidling Starward Docker image"
docker build -t starward ../projects/starward

echo "Buidling Starward-wp Docker image"
docker build -t starward-wp ../projects/wordpress
