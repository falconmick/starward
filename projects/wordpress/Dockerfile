# IMPORTANT # Always set the WP version statically to avoid re-deploying to a new version of Wordpress
# that could break your site. This way updating is manual just like normal.
FROM wordpress:4.9.8-php7.2-fpm

# This is the base wordpress directory in the wordpress dockerfile
WORKDIR /var/www/html

# Remove the default plugins folder, goodby dolly
RUN rm -rf /var/www/html/wp-content/plugins

COPY wp-content/plugins/. ./wp-content/plugins/
COPY wp-content/themes/. ./wp-content/themes/

ARG COMMIT_HASH
LABEL maintainer="michael@birdbrain.com.au"
LABEL commit=$COMMIT_HASH

CMD ["php-fpm"]
