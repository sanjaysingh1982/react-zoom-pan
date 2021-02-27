import React, { Component } from "react";
import { Stage, Layer, Line, Group, Image } from 'react-konva';
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import zoom_in from "./images/zoom-in.svg";
import zoom_out from "./images/zoom-out.svg";
import zoom_reset from "./images/zoom-reset.svg";
import example_img from "./images/example.png";
import useImage from 'use-image';

const MapImage = () => {
  const [image] = useImage(example_img);
  return <Image image={image} />;
};

export default class App extends Component {
  state = {
    limitToBounds: true,
    panningEnabled: true,
    transformEnabled: true,
    pinchEnabled: true,
    limitToWrapper: false,
    disabled: false,
    dbClickEnabled: true,
    lockAxisX: false,
    lockAxisY: false,
    velocityEqualToMove: true,
    enableWheel: true,
    enableTouchPadPinch: true,
    enableVelocity: true,
    limitsOnWheel: false,
  };

  render() {
    const {
      limitToBounds,
      panningEnabled,
      transformEnabled,
      pinchEnabled,
      limitToWrapper,
      disabled,
      dbClickEnabled,
      lockAxisX,
      lockAxisY,
      velocityEqualToMove,
      enableWheel,
      enableTouchPadPinch,
      enableVelocity,
      limitsOnWheel,
    } = this.state;

    return (
      <div className="body">
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 order-lg-2 example">
                <TransformWrapper
                  options={{
                    limitToBounds,
                    transformEnabled,
                    disabled,
                    limitToWrapper,
                  }}
                  pan={{
                    disabled: !panningEnabled,
                    lockAxisX,
                    lockAxisY,
                    velocityEqualToMove,
                    velocity: enableVelocity,
                  }}
                  pinch={{ disabled: !pinchEnabled }}
                  doubleClick={{ disabled: !dbClickEnabled }}
                  wheel={{
                    wheelEnabled: enableWheel,
                    touchPadEnabled: enableTouchPadPinch,
                    limitsOnWheel,
                  }}
                >
                  {({
                    zoomIn,
                    zoomOut,
                    resetTransform,
                    setDefaultState,
                    positionX,
                    positionY,
                    scale,
                    previousScale,
                    options: { limitToBounds, transformEnabled, disabled },
                    ...rest
                  }) => (
                    <React.Fragment>
                      <div className="tools">
                        <div className="spacer" />
                        <button
                          className="btn-gradient cyan small"
                          onClick={zoomIn}
                          data-testid="zoom-in-button"
                        >
                          <img src={zoom_in} alt="" />
                        </button>
                        <button
                          className="btn-gradient blue small"
                          onClick={zoomOut}
                          data-testid="zoom-out-button"
                        >
                          <img src={zoom_out} alt="" />
                        </button>
                        <button
                          className="btn-gradient purple small"
                          onClick={resetTransform}
                          data-testid="reset-button"
                        >
                          <img src={zoom_reset} alt="" />
                        </button>
                      </div>
                      <div className="element">
                          <TransformComponent>
                           <Stage width="640" height="640">
                            <Layer>
                              <Group>
                                 <MapImage></MapImage>
                                 <Line
                                    x={20}
                                    y={200}
                                    points={[0, 0, 100, 100]}
                                    stroke="black"
                                  />
                              </Group>
                            </Layer>
                          </Stage>
                          </TransformComponent>
                      </div>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
