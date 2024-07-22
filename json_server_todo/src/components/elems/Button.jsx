import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ btnFn, classbtn, disabled = false, children }) => {
	return (
		<button onClick={btnFn} disabled={disabled} className={classbtn}>
			{children}
		</button>
	);
};

Button.propTypes = {
	btnFn: PropTypes.func,
	classbtn: PropTypes.string,
	children: PropTypes.string,
};
