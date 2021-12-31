/**
 * Sidebar Component.
 *
 * The Sidebar Component, some props are inherited from Higher-Order Component(s)
 * HOC. These are contained within their own components folder ../containers.
 *
 * Note that post metadata is used within this component. This is registered via
 * PHP within /inc/example-sidebar.
 */

/**
 * React Imports.
 *
 * - PropTypes
 *   Typechecking for React components.
 *   @see https://reactjs.org/docs/typechecking-with-proptypes.html
 */
import PropTypes from 'prop-types';

/**
 * WordPress Imports.
 *
 * - PanelBody
 *   The PanelBody creates a collapsible container that can be toggled open or closed.
 *   @see https://developer.wordpress.org/block-editor/components/panel/#panelbody
 *
 * - ToggleControl
 *   ToggleControl is used to generate a toggle user interface.
 *   @see https://developer.wordpress.org/block-editor/components/toggle-control/
 *
 * - PluginSidebar
 *   This slot allows for adding items into the Gutenberg Toolbar. Using
 *   this slot will add an icon to the bar that, when clicked, will open
 *   a sidebar with the content of the items wrapped in the <PluginSidebar />
 *   component.
 *   @see https://developer.wordpress.org/block-editor/developers/slotfills/plugin-sidebar/
 *
 * - PluginSidebarMoreMenuItem
 *   This slot allows the creation of a <PluginSidebar> with a menu item that when
 *   clicked will expand the sidebar to the appropriate Plugin section.
 *   @see https://developer.wordpress.org/block-editor/developers/slotfills/plugin-sidebar-more-menu-item/
 *
 * - Component
 *   A base class to create WordPress Components (Refs, state and lifecycle hooks).
 *   @see https://developer.wordpress.org/block-editor/packages/packages-element/#Component
 *
 * - Fragment
 *   A component which renders its children without any wrapping element.
 *   @see https://developer.wordpress.org/block-editor/packages/packages-element/#Fragment
 *
 * - __
 *   Internationalization - multilingual translation support.
 *   @see https://developer.wordpress.org/block-editor/developers/internationalization/
 */
import { PanelBody, ToggleControl } from '@wordpress/components';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';

/**
 * Plugin Imports.
 *
 * - settings
 *   Localized settings from the PHP part of the application.
 *
 * Used here to retrieve the meta key for the Login Required
 * meta field, while at the same time allowing a JS friendly
 * name.
 */
//import settings from '../../../settings';

// The prefix for our CSS classes.
const baseClassName = 'example-sidebar';

// The name and title of the plugin, so that it can be registered and if
// needed accessed within a filter.
export const sidebarName = 'example-sidebar'; // Could just set to baseClassName, but keeping full for example.
export const sidebarTitle = __( 'Example Sidebar', 'foopb' );

/**
 * Example Sidebar.
 *
 * Basic sidebar that updates a post meta value.
 */
function ExampleSidebar({ editPost, postMeta }) {
	// Retrieve the PHP meta key from the settings, and then access the
	// value from the postMeta object.
	//const { metaKeyExampleToggle } = settings;
	const metaKeyExampleToggle = '_foopb_post_meta_boolean';
	const exampleToggle = postMeta[ metaKeyExampleToggle ];

	return (
		<Fragment>
			<PluginSidebarMoreMenuItem target={ sidebarName }>
				{ sidebarTitle }
			</PluginSidebarMoreMenuItem>
			<PluginSidebar
				name={ sidebarName }
				title={ sidebarTitle }
			>
				<PanelBody
					className={ `${ baseClassName }__example_panel` }
					title={ __( 'Example Sidebar Body', 'foopb' ) }
				>
					<ToggleControl
						checked={ exampleToggle }
						help={ __( 'This toggle updates the post meta value for the example toggle.',
							'foopb' ) }
						label={ __( 'Example Toggle Control', 'foopb' ) }
						onChange={ ( value ) => {
							// On change use editPost to dispatch the updated
							// postMeta object.
							editPost( {
								...postMeta,
								meta: {
									[ metaKeyExampleToggle ]: value,
								},
							} );
						} }
					/>
				</PanelBody>
			</PluginSidebar>
		</Fragment>
	);
}

// Typechecking the Component props.
ExampleSidebar.propTypes = {
	editPost: PropTypes.func.isRequired,
	postMeta: PropTypes.objectOf( PropTypes.any ).isRequired,
};

// Export the Sidebar.
// Compose the HOC, and apply it to the Sidebar Component, and Export it.
export default compose(
	withDispatch( ( dispatch ) => {
		const { editPost } = dispatch( 'core/editor' );
		return {
			editPost,
		};
	} ),
	withSelect( ( select ) => {
		const { getEditedPostAttribute } = select( 'core/editor' );
		return {
			postMeta: getEditedPostAttribute( 'meta' ),
		};
	} ),
)( ExampleSidebar );

