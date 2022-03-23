import React, {useMemo} from "react";
import {useThree} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

export const CameraControl = (props) => {
    const {camera, gl: { domElement }} = useThree()

    camera.rotation.order = "YXZ"
    const cameraControl = useMemo(() => <OrbitControls args={[camera, domElement]} onChange={() => {
        props.onChange(camera.rotation.y)
        props.updatePosition(domElement, camera)
    }
    }/>, [])
    return <>
        {cameraControl}
    </>
}
