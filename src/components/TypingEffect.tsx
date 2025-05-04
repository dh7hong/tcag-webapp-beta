// src/components/TypingEffect.tsx
'use client';

import { useEffect, useState } from 'react';

export default function TypingEffect({ text }: { text: string }) {
	const [displayedText, setDisplayedText] = useState('');

	useEffect(() => {
		let currentIndex = 0;
		const interval = setInterval(() => {
			setDisplayedText(text.slice(0, currentIndex + 1));
			currentIndex++;

			if (currentIndex === text.length) clearInterval(interval);
		}, 150);

		return () => clearInterval(interval);
	}, [text]);

	return (
		<div className="text-4xl font-bold text-center text-white select-none">
			{displayedText}
			<span className="dramatic-pulse">|</span>
		</div>
	);
}
