import React from 'react';
import PropTypes from 'prop-types';
import styles from './searchForm.module.css';

export const SearchTask = ({ searchTerm, setSearchTerm }) => {
	return (
		<input
			type='text'
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
			placeholder='Поиск задач'
			className={styles.input}
		/>
	);
};

SearchTask.propTypes = {
	searchTerm: PropTypes.string,
	setSearchTerm: PropTypes.string,
};
