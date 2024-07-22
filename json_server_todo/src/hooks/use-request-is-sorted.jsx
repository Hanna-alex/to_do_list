import { useState } from 'react';

export const useRequestIsSorted = () => {
	const [isSortOn, setIsSortOn] = useState(false);

	const clickOnSortedBtn = () => {
		setIsSortOn(!isSortOn);
	};
	return {
		isSortOn,
		clickOnSortedBtn,
	};
};
