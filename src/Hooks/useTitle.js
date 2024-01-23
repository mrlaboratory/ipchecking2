import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - NeotericIT`
    }, [])

}

export default useTitle