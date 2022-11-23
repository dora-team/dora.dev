FROM gcr.io/cloud-builders/curl

COPY pr_comment_post.sh /bin
RUN chmod +x /bin/pr_comment_post.sh

ENTRYPOINT ["/bin/pr_comment_post.sh"]