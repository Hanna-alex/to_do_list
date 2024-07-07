import React from "react"
import PropTypes from 'prop-types'
import styles from './searchForm.module.css'

export const SearchForm = ({onChange}) => {

	return(
		<form className={styles.searchForm}>
			<input autoComplete = 'off'  placeholder = 'Поиск' type='text' onChange={onChange} className ={styles.input} />
		</form>
	)

}

SearchForm.propTypes = {
	onChange: PropTypes.func,

}
