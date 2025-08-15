import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

export default function GenerateIcons(props) {
  const { icons, message, loading, refetch, clearCache } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ marginTop: '16px', marginBottom: '16px' }}>
      <div
        style={{
          cursor: 'pointer',
          fontWeight: 'bold',
          padding: '8px 0',
          borderBottom: '1px solid #ddd',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? '▼ ' : '▶ '}
        {__('Sync with Google', 'lwn-icons')}
      </div>

      {expanded && (
        <div style={{ padding: '8px 0 16px 16px' }}>
          <p style={{ fontSize: '0.85em', color: '#555' }}>
            {__(
              'Cannot see the icon you expected? Click “Fetch & Cache” to sync with the official Google Material Icons and refresh the cache.',
              'lwn-icons'
            )}
          </p>

          <Button
            variant="primary"
            onClick={refetch}
            disabled={loading}
            style={{ marginBottom: '8px' }}
          >
            {loading
              ? __('Fetching Icons...', 'lwn-icons')
              : __('Fetch & Cache Material Icons', 'lwn-icons')}
          </Button>

          <Button
            variant="secondary"
            onClick={clearCache}
            style={{ marginLeft: '8px' }}
          >
            {__('Clear Cache', 'lwn-icons')}
          </Button>

          {message && (
            <p style={{ marginTop: '8px', fontSize: '0.85em', color: '#333' }}>
              {message}{' '}
              {icons.length > 0 &&
                `${icons.length} ${__('categories cached', 'lwn-icons')}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
