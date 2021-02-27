import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [show, setShow] = useState(false);
  // const [color, setColor] = useState('#f000000');

  useEffect(() => {
    const canvas = canvasRef.current;  
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    context.scale(2,2);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5
    contextRef.current = context;
  }, [])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing) {
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const eraser = () => {
    const canvas = canvasRef.current;  
    const context = canvas.getContext('2d');
    context.strokeStyle = 'white'
  }

  const fill = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')
    context.fillStyle = 'red'
    context.fill();
    context.stroke();
  }

  const Paper = () => {
    if(show) {
      return (
        <div className='paper'>
            <button className='close' onClick={() => setShow(false)}>✖️</button>
            <button className='color' onClick={fill}></button>
        </div>
      )
    } else {
      return null;
    }
}

  const pen = () => {
    const canvas = canvasRef.current;  
    const context = canvas.getContext('2d');
    context.strokeStyle = 'black'
  }

  // const setColor = () => {
  //   setColor();
  // }

  return (
    <>
      <header className='header'>
        <h1>お絵かきアプリ</h1>
      </header>
      <div className='label'>
        <button className='btn' onClick={clearCanvas}>白紙にする</button>
        <button className='btn' onClick={pen}>ペン</button>
        <button className='btn' onClick={eraser}>消しゴム</button>
          <button className='btn_fill' onClick={() => setShow(true)}>塗り潰し</button>
          <Paper />
      </div>
      <div className='main_canvas'>
        <canvas 
          className='canvas'
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
      </div>
    </>
  );
}

export default App;
