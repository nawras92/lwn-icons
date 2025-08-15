import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';
import { URLInput } from '@wordpress/block-editor';
import { RangeControl } from '@wordpress/components';
import { SelectControl } from '@wordpress/components';
import { TextControl } from '@wordpress/components';
import { edit } from '@wordpress/icons';
import { trash } from '@wordpress/icons';

export default function BlockSidebar({ attributes, setAttributes, setOpen }) {
  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Settings')}>
          <PanelColorSettings
            title={__('Colors')}
            initialOpen={true}
            colorSettings={[
              {
                label: __('Icon Color', 'lwn-icons'),
                value: attributes?.iconColor,
                onChange: (newValue) => setAttributes({ iconColor: newValue }),
                enableAlpha: true,
              },
            ]}
          />
          <RangeControl
            label={__('Icon Size', 'lwn-icons')}
            value={attributes.iconSize}
            onChange={(size) => setAttributes({ iconSize: size })}
            min={5}
            max={300}
          />
          {/* Icon Tooltip / Title */}
          <TextControl
            label={__('Tooltip / Title', 'lwn-icons')}
            value={attributes.iconTitle}
            onChange={(title) => setAttributes({ iconTitle: title })}
            help={__('Text shown on hover', 'lwn-icons')}
          />

          {/* Icon Link */}
          <div style={{ marginTop: '16px' }}>
            <label>{__('Icon Link', 'lwn-icons')}</label>
            <URLInput
              value={attributes.link}
              onChange={(url) => setAttributes({ link: url })}
            />
          </div>

          {/* Link Target */}
          <SelectControl
            label={__('Open link in', 'lwn-icons')}
            value={attributes.linkTarget}
            options={[
              { label: __('Same tab', 'lwn-icons'), value: '_self' },
              { label: __('New tab', 'lwn-icons'), value: '_blank' },
            ]}
            onChange={(target) => setAttributes({ linkTarget: target })}
          />
        </PanelBody>
      </InspectorControls>
      {attributes.selectedIcon && (
        <BlockControls>
          <Toolbar label="Options">
            <ToolbarButton
              icon={trash}
              label={__('Delete Icon', 'lwn-icons')}
              onClick={() => setAttributes({ selectedIcon: '' })}
            />
            <ToolbarButton
              icon={edit}
              label={__('Replace Icon', 'lwn-icons')}
              onClick={() => setOpen(true)}
            />
          </Toolbar>
        </BlockControls>
      )}
    </>
  );
}
