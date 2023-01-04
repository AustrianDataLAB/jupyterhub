ARG BUILDER_IMAGE=python:3.9-buster
ARG BASE_IMAGE=jupyterhub/k8s-hub:2.0.0

FROM $BUILDER_IMAGE AS builder

USER root

ENV DEBIAN_FRONTEND noninteractive

RUN mkdir -p /srv/jupyterhub/
WORKDIR /srv/jupyterhub
USER ${NB_USER}
