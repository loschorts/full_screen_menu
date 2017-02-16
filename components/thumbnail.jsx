import React from 'react';

export default ({src, header, subhead, current, cursor}) => {
	let className = "thumbnail";
	if (current) className += " current";

	const id = cursor ? "cursor" : "";
	return (
		<div className={className}>
			{current ? <h1 id="carousel-header">{header}</h1> : null}
			<img id={id} className="thumb-img" src={src}/>
			{current ? <h2 id="carousel-footer">{subhead}</h2> : null}
		</div>
	);
}