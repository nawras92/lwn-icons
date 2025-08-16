<?php
/**
 * Plugin Name:       LWN Icons
 * Description:       Seamlessly add and customize Google Material Design icons within the Gutenberg editor.
 * Requires at least: 6.7
 * Tested up:         6.8
 * Requires PHP:      7.4
 * Version:           1.0.1
 * Author:            Nawras Ali
 * Plugin URI:        https://pro.learnwithnaw.com/lwn-icons
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

/**
 * Registers the LWN Icons block type.
 *
 * This function registers the block type by pointing to the `build`
 * directory, which contains the compiled block files.
 *
 * @since 0.1.0
 * @return void
 */
function learn_with_naw_lwn_icons_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'learn_with_naw_lwn_icons_block_init' );

/**
 * Enqueues Material Icons styles for both frontend and editor.
 *
 * This function registers and enqueues the Material Icons font stylesheet
 * from Google Fonts so that icons can be used in the Gutenberg editor
 * and on the site frontend.
 *
 * @since 0.1.0
 * @return void
 */
function learn_with_naw_lwn_icons_add_styles() {
	wp_register_style(
		'lwn-material-symbols',
		'https://fonts.googleapis.com/css2?family=Material+Icons&family=Material+Icons+Outlined&family=Material+Symbols+Outlined&family=Material+Symbols+Rounded&family=Material+Symbols+Sharp&display=swap',
		array(),
		null,
		'all'
	);
	wp_enqueue_style( 'lwn-material-symbols' );
}
add_action( 'enqueue_block_assets', 'learn_with_naw_lwn_icons_add_styles' );


/**
 * Loads block-specific translations after registering blocks.
 *
 * This function ensures that the block JavaScript strings can be translated
 * by WordPress, using JSON files generated during the build process.
 *
 * @since 0.1.0
 * @return void
 */
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
add_action( 'init', 'learn_with_naw_lwn_icons_load_block_translations' );
