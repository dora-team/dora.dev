#!/bin/bash
# this script is intended to be run from the repo root
# where 'redirects.txt' lives.
# it modifies the NGINX config in tools/nginx_container

# read file lines into an array
readarray rows < redirects.txt

# for each line, parse redirect source and destination 
for row in "${rows[@]}"; do                                                      
    row_array=(${row})                                                            
    src=${row_array[0]}
    dest=${row_array[1]}                                                         

    # construct NGINX redirect rule
    rule="rewrite ^${src} ${dest} redirect;"
    echo ${rule}

    # insert rule after heading
    sed -i "/# REWRITE RULES/a ${rule}" tools/nginx_container/nginx.conf
done