<?php
/**
 * Plugin Name:       Peak Team members Query
 * Description:       Shows all the peak teammembers.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0
 * Author:            Simon Flöter
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       peak-teammembers-query
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

// function create_block_peak_teammembers_query_init() {
  
//   wp_register_script('oodledoodle', plugins_url( '/build/view.js', __FILE__ ), array(), false, true );

// 	register_block_type( __DIR__ . '/build', array(
//     'render_callback' => 'enqueue_teammember_frontend_assets',
//     'view_script' => 'oodledoodle'
//   ) );

// }
// add_action( 'init', 'create_block_peak_teammembers_query_init' );

function enqueue_teammemberquery_admin_assets() {
  wp_enqueue_style(
    'peak-teammembers-query-style-admin',
    plugins_url('/build/index.css', __FILE__)        
);
}
add_action( 'enqueue_block_editor_assets', 'enqueue_teammemberquery_admin_assets' );

function enqueue_teammember_frontend_assets() {

  global $post;
  if ( is_admin() || $post && strpos( $post->post_content, 'peak-teammembers-query-loop' ) !== false) {
    // Enqueue frontend block script
    wp_enqueue_style(
        'peak-teammembers-query-style',
        plugins_url('/build/style-index.css', __FILE__)        
    );
    wp_enqueue_script(
      'peak-teammembers-query-view-script',
      plugins_url( '/build/view.js', __FILE__ ),
      [],
      false,
      true
    );
  }
}
// Hook the enqueue function into the frontend and editor
add_action( 'enqueue_block_assets', 'enqueue_teammember_frontend_assets' );