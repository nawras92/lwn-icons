import { useBlockProps } from '@wordpress/block-editor';
export default function save({ attributes }) {
  const blockProps = useBlockProps.save();
  return (
    <div {...blockProps}>
      {attributes.selectedIcon &&
        (attributes.link ? (
          <a
            href={attributes.link}
            target={attributes.linkTarget}
            rel={
              attributes.linkTarget === '_blank'
                ? 'noopener noreferrer'
                : undefined
            }
            title={attributes.iconTitle}
            style={{ display: 'inline-block' }}
          >
            <i
              className="lwn-icon material-symbols-outlined"
              style={{
                color: attributes.iconColor,
                fontSize: attributes.iconSize + 'px',
              }}
            >
              {attributes.selectedIcon}
            </i>
          </a>
        ) : (
          <i
            className="lwn-icon material-symbols-outlined"
            style={{
              color: attributes.iconColor,
              fontSize: attributes.iconSize + 'px',
            }}
            title={attributes.iconTitle}
          >
            {attributes.selectedIcon}
          </i>
        ))}
    </div>
  );
}
