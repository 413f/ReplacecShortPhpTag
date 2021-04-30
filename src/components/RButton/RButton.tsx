import React from 'react';

function RButton(props: { href ?: string; text ?: string; target ?: string}) {
    const hrefValue = props.href || '#';
    const hrefTarget = props.target || '_self';
    return <a href={hrefValue} target={hrefTarget}>{props.text}</a>
}

export default RButton