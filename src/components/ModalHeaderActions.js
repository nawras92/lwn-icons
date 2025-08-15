import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import SearchIcons from './SearchIcons';

export default function ModalHeaderActions({
  selectedIcon,
  icons,
  setFilteredIcons,
}) {
  return (
    <div className="lwn-icons-modal-header-actions">
      <div className="row selected-icon">
        {selectedIcon ? (
          <p className="selected-status">
            <span>{__('You selected:', 'lwn-icons')} </span>
            <i className="material-symbols-outlined">{selectedIcon}</i>
          </p>
        ) : (
          <p className="no-selected-icon">
            {__('No icon selected', 'lwn-icons')}
          </p>
        )}
      </div>
      <div className="row row-search-icons">
        <SearchIcons icons={icons} setFilteredIcons={setFilteredIcons} />
      </div>
    </div>
  );
}
