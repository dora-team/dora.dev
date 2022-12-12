#!/bin/bash
# this script is intended to be run from the repo root
# where '_redirects' lives.
# it modifies the NGINX config in tools/nginx_container

# read file lines into an array
readarray rows < _redirects

# for each line, parse redirect source and destination 
for row in "${rows[@]}"; do                                                      
    row_array=(${row})                                                            
    src=${row_array[0]}
    dest=${row_array[1]}                                                         

    # construct NGINX redirect rule
    # 2022-12-12: changing to 302 during development
    rule="rewrite ^${src}$ ${dest}"
    echo ${rule}

    # insert rule after heading
    sed -i "/# REWRITE RULES/a ${rule}" tools/nginx_container/nginx.conf
done