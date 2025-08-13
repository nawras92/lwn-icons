<?php
/**
 * Plugin Name:       Lwn Icons
 * Description:       Integrate Material Icons With Gutenberg Editor
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Nawras Ali
 * Author URI:        https://learnwithnaw.com
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       lwn-icons
 * GitHub Plugin URI: https://github.com/nawras92/lwn-icons
 *
 * @package LearnWithNaw
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit(); // Exit if accessed directly.
}

add_action( 'init', 'learn_with_naw_lwn_icons_block_init' );
function learn_with_naw_lwn_icons_block_init() {
	register_block_type( __DIR__ . '/build' );
}


// Add Styles
add_action( 'enqueue_block_assets', 'learn_with_naw_lwn_icons_add_styles' );
function learn_with_naw_lwn_icons_add_styles() {
	wp_register_style(
		'lwn-material-icons',
		'https://fonts.googleapis.com/icon?family=Material+Icons',
		array(),
		'v142',
		'all'
	);
	wp_enqueue_style( 'lwn-material-icons' );
}

// Load Text Domain
add_action( 'init', 'learn_with_naw_lwn_icons_load_text_domain' );
function learn_with_naw_lwn_icons_load_text_domain() {
	load_plugin_textdomain(
		'lwn-icons',
		false,
		plugin_dir_path( __FILE__ ) . '/languages'
	);
}
// Load Translation of blocks after registering the blocks
add_action( 'init', 'learn_with_naw_lwn_icons_load_block_translations' );
function learn_with_naw_lwn_icons_load_block_translations() {
	$script_handle = generate_block_asset_handle(
		'learn-with-naw/lwn-icons',
		'editorScript'
	);
	wp_set_script_translations(
		$script_handle,
		'lwn-icons',
		plugin_dir_path( __FILE__ ) . '/languages'
	);
}
