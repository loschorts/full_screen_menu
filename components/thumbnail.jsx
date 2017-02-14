import React from 'react';

export default ({src, header, subhead, active}) => (
	<div className={`thumbnail${active ? " active" : ""}`}>
		{active ? <h1>{header}</h1> : null}
		<img className="thumb-img" src={src}/>
		{active ? <h2>{subhead}</h2> : null}
	</div>
)