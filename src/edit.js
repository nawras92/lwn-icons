import { useState } from 'react';
import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { Modal } from '@wordpress/components';
import { check } from '@wordpress/icons';
import BlockSidebar from './components/BlockSidebar';
import materialIcons from './material-icons';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const [open, setOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [filteredIcons, setFilteredIcons] = useState([]);

	useEffect(() => {
		if (searchValue) {
			setFilteredIcons(
				materialIcons.filter((icon) => {
					const iconName = icon.split(' ')[0];
					return iconName.includes(searchValue);
				})
			);
		} else {
			setFilteredIcons(materialIcons);
		}
	}, [searchValue]);

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
						title={__('Please Select an Icon', 'lwn-icons')}
						onRequestClose={() => setOpen(false)}
					>
						<div className="wp-block-learn-with-naw-lwn-icons__icons-details">
							<p className="wp-block-learn-with-naw-lwn-icons__user-selection">
								<span>{__('You have selected: ', 'lwn-icons')}</span>
								<i className="material-icons">
									{attributes?.selectedIcon?.split(' ')[0]}
								</i>
							</p>
							<Button variant="primary" onClick={() => setOpen(false)}>
								{__('Done')}
							</Button>
							<div className="wp-block-learn-with-naw-lwn-icons__search-icons">
								<label>{__('Search Icons', 'lwn-icons')}</label>
								<input
									type="text"
									value={searchValue}
									onChange={(event) => setSearchValue(event.target.value)}
								/>
							</div>
							<div className="wp-block-learn-with-naw-lwn-icons__icons-list">
								{filteredIcons &&
									filteredIcons.map((icon, index) => {
										const iconName = icon.split(' ')[0];
										return (
											<i
												key={index}
												className={`material-icons ${
													attributes.selectedIcon === iconName ? 'selected' : ''
												}`}
												onClick={() =>
													setAttributes({ selectedIcon: iconName })
												}
											>
												{iconName}
											</i>
										);
									})}
							</div>
						</div>
					</Modal>
				)}
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
		</>
	);
}
