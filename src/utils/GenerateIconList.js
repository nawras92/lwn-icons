import { Button } from '@wordpress/components';

export default function GenerateIcons(props) {
  const { icons, message, loading, refetch, clearCache } = props;

  return (
    <div>
      <Button
        variant="primary"
        onClick={refetch}
        disabled={loading}
        style={{ marginBottom: '16px' }}
      >
        {loading ? 'Fetching Icons...' : 'Fetch & Cache Material Icons'}
      </Button>

      <Button
        variant="secondary"
        onClick={clearCache}
        style={{ marginLeft: '8px' }}
      >
        Clear Cache
      </Button>

      {message && (
        <p style={{ marginTop: '16px' }}>
          {message}
          {icons.length > 0 && <span> ({icons.length} categories cached)</span>}
        </p>
      )}
    </div>
  );
}
