import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';
import { Button, Modal } from '@wordpress/components';
import { check } from '@wordpress/icons';
import BlockSidebar from './components/BlockSidebar';
import ModalHeaderActions from './components/ModalHeaderActions';
import GenerateIconList from './utils/GenerateIconList';
import useMaterialIcons from './hooks/useMaterialIcons';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  const { icons, message, loading, refetch, clearCache } = useMaterialIcons();

  const [open, setOpen] = useState(false);
  const [filteredIcons, setFilteredIcons] = useState([]);

  return (
    <>
      <BlockSidebar
        attributes={attributes}
        setAttributes={setAttributes}
        setOpen={setOpen}
      />

      <div {...blockProps}>
        {!attributes.selectedIcon && (
          <div className="wp-block-learn-with-naw-lwn-icons__user-control">
            <Button
              icon={check}
              variant="secondary"
              onClick={() => setOpen(true)}
            >
              {__('Select an Icon', 'lwn-icons')}
            </Button>
          </div>
        )}

        {open && (
          <Modal
            size="large"
            className="wp-block-learn-with-naw-lwn-icons__icons-modal"
            onRequestClose={() => setOpen(false)}
            title={__('Material Icon List', 'lwn-icons')}
            headerActions={
              <ModalHeaderActions
                selectedIcon={attributes?.selectedIcon}
                icons={icons}
                setFilteredIcons={setFilteredIcons}
              />
            }
          >
            <GenerateIconList
              icons={icons}
              message={message}
              loading={loading}
              refetch={refetch}
              clearCache={clearCache}
            />

            <div className="wp-block-learn-with-naw-lwn-icons__icons-details">
              {/* CATEGORY LIST */}
              <div className="wp-block-learn-with-naw-lwn-icons__icons-list">
                {filteredIcons.length === 0 && (
                  <p>
                    {__(
                      'No icons found. Try adjusting your search or syncing the icon list.',
                      'lwn-icons'
                    )}{' '}
                  </p>
                )}
                {filteredIcons.map((category, catIndex) => (
                  <div key={catIndex} className="icon-category">
                    <h3>{category.category?.toUpperCase()}</h3>
                    <div className="icon-grid">
                      {category.icons.map((icon, iconIndex) => (
                        <i
                          key={iconIndex}
                          className={`material-symbols-outlined ${
                            attributes.selectedIcon === icon?.name
                              ? 'selected'
                              : ''
                          }`}
                          onClick={() =>
                            setAttributes({ selectedIcon: icon?.name })
                          }
                        >
                          {icon?.name}
                        </i>
                      ))}
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        )}

        {attributes.selectedIcon && (
          <i
            className="material-symbols-outlined"
            style={{
              color: attributes.iconColor,
              fontSize: attributes.iconSize + 'px',
            }}
            title={attributes.iconTitle}
          >
            {attributes.selectedIcon}
          </i>
        )}
      </div>
    </>
  );
}
