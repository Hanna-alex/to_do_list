import React from 'react'
import PropTypes from 'prop-types'

export const Button = ({btnFn, classbtn, children})=>{

	return (
		<button onClick={btnFn} className={classbtn}>{children}</button>
	)
}

Button.propTypes = {
	btnFn: PropTypes.func,
	classbtn: PropTypes.string,
	children: PropTypes.string
}
