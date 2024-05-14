<?php
/**
 * Plugin Name:       Lwn Icons
 * Description:       Integrate Material Icons With Gutenberg Editor
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Nawras Ali
 * Author URI:        https://learnwithnaw.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lwn-icons
 *
 * @package LearnWithNaw
 */

if (!defined('ABSPATH')) {
	exit(); // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
add_action('init', 'learn_with_naw_lwn_icons_block_init');
function learn_with_naw_lwn_icons_block_init()
{
	register_block_type(__DIR__ . '/build');
}

// Add Styles
add_action('enqueue_block_assets', 'learn_with_naw_lwn_icons_add_styles');
function learn_with_naw_lwn_icons_add_styles()
{
	wp_register_style(
		'lwn-material-icons',
		'https://fonts.googleapis.com/icon?family=Material+Icons',
		[],
		'',
		'all'
	);
	wp_enqueue_style('lwn-material-icons');
}

// Load Text Domain
add_action('init', 'learn_with_naw_lwn_icons_load_text_domain');
function learn_with_naw_lwn_icons_load_text_domain()
{
	load_plugin_textdomain(
		'lwn-icons',
		false,
		dirname(plugin_basename(__FILE__)) . '/languages'
	);
}
// Load Translation of blocks after registering the blocks
add_action('init', 'learn_with_naw_lwn_icons_load_block_translations');
function learn_with_naw_lwn_icons_load_block_translations()
{
	$script_handle = generate_block_asset_handle(
		'learn-with-naw/lwn-icons',
		'editorScript'
	);
	wp_set_script_translations(
		$script_handle,
		'lwn-icons',
		plugin_dir_path(__FILE__) . '/languages'
	);
}
