/**
 * WordPress Imports.
 *
 * RegisterPlugin
 * Registers a plugin for the WordPress block editor (Gutenberg).
 * @see https://developer.wordpress.org/block-editor/packages/packages-plugins/#registerPlugin
 */
import { registerPlugin } from '@wordpress/plugins';

/**
 * Plugin Imports.
 *
 * Note that we are importing the render method of the sidebar from a container.
 * This container allows us to apply Higher-Order Component(s) (HOC) to our component
 * which allow us to inject properties into the component.
 *
 * In this scenario the component is 'wrapped' in a component that give access to
 * various select and dispatch methods, that can allow it to access and save post meta.
 *
 * The name is imported from the component itself.
 */

import Sidebar, { sidebarName as name } from './component';

/**
 * Settings.
 *
 * Note that the icon is a dashicon: https://developer.wordpress.org/resource/dashicons/
 * which drops the `dashicons` prefix when used in this context.
 *
 * An SVG can be used here instead.
 */
const settings = {
	icon: 'heart',
	render: Sidebar,
};

// Register the Plugin.
registerPlugin( name, settings );