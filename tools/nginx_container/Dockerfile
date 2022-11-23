# to use this Dockerfile, run `docker build` from the repo root
# (because paths are relative to root)
FROM nginx
COPY ./public /usr/share/nginx/html
COPY ./tools/nginx_container/nginx.conf /etc/nginx/conf.d/default.conf