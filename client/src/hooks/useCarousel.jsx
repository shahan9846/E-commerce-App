import { useState } from "react";

function useCarousel(products_length) {

    const [index, setIndex] = useState(0)

    const first_slide = 0
    const last_slide = products_length - 1

    const onPrevious = () => {
        setIndex(previousIndex => Math.max(previousIndex - 1, first_slide))
    }

    const onNext = () => {
        setIndex(previousIndex => Math.min(previousIndex + 1, last_slide))
    }

    return {
        index, onPrevious, onNext
    }
}

export default useCarousel;