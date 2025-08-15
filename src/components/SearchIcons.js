import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';

export default function SearchIcons({ icons, setFilteredIcons }) {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!icons || !Array.isArray(icons)) return;

    if (searchValue.trim()) {
      // Filter by name or tags
      const filtered = icons
        .map((cat) => ({
          ...cat,
          icons: cat.icons.filter((icon) => {
            const nameMatch = icon?.name
              .toLowerCase()
              .includes(searchValue.toLowerCase());

            const tagsMatch =
              icon?.tags &&
              icon.tags.some((tag) =>
                tag.toLowerCase().includes(searchValue.toLowerCase())
              );

            return nameMatch || tagsMatch;
          }),
        }))
        .filter((cat) => cat.icons.length > 0); // remove empty categories

      setFilteredIcons(filtered);
    } else {
      setFilteredIcons(icons);
    }
  }, [searchValue, icons, setFilteredIcons]);

  return (
    <div className="wp-block-learn-with-naw-lwn-icons__search-icons">
      <label>{__('Search Icons', 'lwn-icons')}</label>
      <input
        type="text"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </div>
  );
}
