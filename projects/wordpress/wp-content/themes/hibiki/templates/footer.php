<footer class="main">
  <?php dynamic_sidebar('sidebar-footer'); ?>
  <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>
</footer>

<?php if(get_field('google_tag_manager_code','option')) { ?>
  <noscript><iframe src="//www.googletagmanager.com/ns.html?id=<?php echo get_field('google_tag_manager_code', 'option'); ?>"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','<?php echo get_field('google_tag_manager_code', 'option'); ?>');</script>
<?php } ?>

<?php if(get_field('google_map_api_key','option')) { ?>
  <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=<?php the_field('google_map_api_key','option');?>"></script>
<?php } ?>

<?php if(WP_DEBUG): ?>
<!-- Grunt liverelaod -->
<script src="//localhost:35729/livereload.js"></script>
<?php endif; ?>

<?php wp_footer(); ?>
