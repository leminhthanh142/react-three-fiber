import React, { useState, createContext } from "react";

export const AppContext = createContext({
    cameraAngle: 0,
    handleSetAngle: () => {}
})

export const useAppContext = () => {
    const [cameraAngle, setCameraAngle] = useState(0);

    const handleSetAngle = (angle) => {
        setCameraAngle(angle)
    }

    const test = () => {
      setCameraAngle(cameraAngle + 10)
    }
    return {
        cameraAngle,
        handleSetAngle,
        test
    }
}
