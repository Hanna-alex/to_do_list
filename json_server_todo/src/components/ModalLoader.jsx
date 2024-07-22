import React from 'react'
import styles from './modalLoader.module.css'


export const ModalLoader = () => {

	return(
		<div className={styles.modalLoader}>
				<div className={styles.loader}></div>
		</div>
	)
}
