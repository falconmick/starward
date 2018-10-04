<?php
  $environment = get_field('environment', 'option');
  $url = get_field($environment . '_url', 'option');
  $excludeslug = get_field('exclude_slug', 'option');
  $path = $_SERVER['REQUEST_URI'];
  if ($url && $environment && strpos($path, 'wp-json') === false) {
    header("HTTP/1.1 301 Moved Permanently");
    header("Location: " . $url . str_replace($excludeslug, '', $path));
  }
?>
<!DOCTYPE html>
<!--[if IE 8]>         <html class="no-js ie8down" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" <?php language_attributes(); ?>> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <title><?php wp_title(); ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="format-detection" content="telephone=no">
  <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
  <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicon.ico">
  <?php wp_head(); ?>
  <?php if (wp_count_posts()->publish > 0) : ?>
  <link rel="alternate" type="application/rss+xml" title="<?php echo get_bloginfo('name'); ?> Feed" href="<?php echo home_url(); ?>/feed/">
  <?php endif; ?>
</head>
