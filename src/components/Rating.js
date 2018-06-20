import ReactStars from 'react-stars'
import React from 'react'
import {render} from 'react-dom'

const ratingChanged = (newRating) => {
    console.log(newRating)
};

render(<ReactStars count={5} onChange={ratingChanged} size=24px color2={'#ffd700'} />,

document.getElementById('showRating')
)
