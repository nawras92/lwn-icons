import { useBlockProps } from '@wordpress/block-editor';
export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	return (
		<div {...blockProps}>
			{attributes.selectedIcon && (
				<i
					className="material-icons"
					style={{
						color: attributes.iconColor,
						fontSize: attributes.iconSize + 'px',
					}}
				>
					{attributes.selectedIcon}
				</i>
			)}
		</div>
	);
}
