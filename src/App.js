import React, {useState, useRef} from 'react'
import './App.css';
import {Canvas} from '@react-three/fiber'
import {Suspense, useContext, useMemo} from "react";
import {useTexture} from "@react-three/drei";
import * as THREE from "three";
import {AppContext, useAppContext} from "./appContext";
import {CameraControl} from "./Cameracontrol";

function Box(props) {
    const ref = useRef()
    const texture1 = useTexture(props.textureLink)

    return (
            <mesh
                {...props}
                ref={ref}>
                <sphereBufferGeometry attach="geometry" args={[100,60,60]}/>
                <meshPhysicalMaterial attach="material" map={texture1} side={THREE.DoubleSide}/>
            </mesh>
    )
}

const RotatedText = () => {
    const {cameraAngle} = useContext(AppContext)
    const style = useMemo(() => {

        const angle = Math.round(-(cameraAngle * 180 / Math.PI))

        return {
            transform: `rotate(${angle}deg)`
        }
    },[cameraAngle])

    return (
        <div className={"bruh"} style={style} />
    )
}

function App() {
  const appContext = useAppContext()
    const [link, setLink] = useState('360_image.jpeg')
    const divRef = useRef(null)

    const updatePosition = (domElement, camera) => {
        const vector = new THREE.Vector3(50, 50, 50);
        const canvas = domElement;

        vector.project(camera);

        vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
        vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));

        if (divRef.current) {
            divRef.current.style.top = `${vector.y}px`;
            divRef.current.style.left = `${vector.x}px`;
        }
    }
    return (
      <AppContext.Provider value={appContext}>
          <div className="App" style={{ width: 800, height: 400}}>
              <div className={"annotation"} ref={divRef} />
              <Canvas>
                  <CameraControl onChange={appContext.handleSetAngle} updatePosition={updatePosition}/>
                  <ambientLight />
                  <Suspense fallback={null}>
                      <Box position={[0, 0, 0]} textureLink={link}/>
                  </Suspense>
                  <mesh onClick={() => setLink('360_image_2.jpeg')}>
                      <boxGeometry args={[1, 1, 1, 10, 10, 10]} />
                      <meshPhongMaterial color={'orange'} />
                  </mesh>
              </Canvas>
              <RotatedText />
          </div>
      </AppContext.Provider>
  );
}

export default App;
