<?php
/**
 * Plugin Name:       WP REST API - Search by Path
 * Plugin URI:        https://github.com/samlogan/wp-rest-api-search-by-path
 * Description:       This plugin extends the WordPress REST API to allow querying a page using a path `example-parent/example-child` vs a slug `example-child`
 * Version:           1.0.0
 * Author:            Sam Logan
 * Author URI:        slogan172@gmail.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wp-rest-api-search-by-path
 */
 add_action('rest_api_init', function () {
	$namespace = 'path/';
 	register_rest_route( $namespace, '/pages/(?P<url>.*?)', array(
 		'methods'  => 'GET',
 		'callback' => 'get_page_from_path',
 	));
 });
 /**
 *
 * @return WP_Error|WP_REST_Response
 *
 */
 function get_page_from_path($data)
 {
     $postId    = url_to_postid($data['url']);
     $postType  = get_post_type($postId);
     $controller = new WP_REST_Posts_Controller($postType);
     $request    = new WP_REST_Request('GET', "/wp/v2/{$postType}s/{$postId}");
     $request->set_url_params(array('id' => $postId));
     return $controller->get_item($request);
 }
