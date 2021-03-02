import React, { useRef, useEffect, useState } from 'react';

function Canvas() {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [showFill, setShowFill] = useState(false);
    const [showPen, setShowPen] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);

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
        context.lineWidth = 5;
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

    function Btn() {
    
        const clearCanvas = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d')
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    
        const eraser = () => {
            const canvas = canvasRef.current;  
            const context = canvas.getContext('2d');
            context.strokeStyle = 'white';
        }
    
        const red = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.fillStyle = 'red';
            context.fill();
            context.stroke();
        }
    
        const green = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.fillStyle = 'green';
            context.fill();
            context.stroke();
        }
    
        const blue = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d')
            context.fillStyle = 'blue'
            context.fill();
            context.stroke();
        }
    
        const yellow = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d')
            context.fillStyle = 'yellow'
            context.fill();
            context.stroke();
        }

        const white = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d')
            context.fillStyle = 'rgb(247, 223, 199)'
            context.fill();
            context.stroke();
        }
    
        const Fill = () => {
            if(showFill) {
                return (
                    <div className='paper'>
                    <button className='close' onClick={() => setShowFill(false)}>✖️</button>
                    <button className='color1' onClick={red}></button>
                    <button className='color2' onClick={green}></button>
                    <button className='color3' onClick={blue}></button>
                    <button className='color4' onClick={yellow}></button>
                    <button className='color5' onClick={white}></button>
                    </div>
                )
            } else {
                return null;
            }
        }
    
        const Pen = () => {
            if(showPen) {
                return (
                    <div className='paper'>
                    <button className='close' onClick={() => setShowPen(false)}>✖️</button>
                    <button className='color0' onClick={pen0}></button>
                    <button className='color1' onClick={pen1}></button>
                    <button className='color2' onClick={pen2}></button>
                    <button className='color3' onClick={pen3}></button>
                    <button className='color4' onClick={pen4}></button>
                    </div>
                )
            } else {
                return null;
            }
        }

        const pen0 = () => {
            const canvas = canvasRef.current;  
            const context = canvas.getContext('2d');
            context.strokeStyle = 'black'
        }
    
        const pen1 = () => {
            const canvas = canvasRef.current;  
            const context = canvas.getContext('2d');
            context.strokeStyle = 'red'
        }
    
        const pen2 = () => {
            const canvas = canvasRef.current;  
            const context = canvas.getContext('2d');
            context.strokeStyle = 'green'
        }
    
        const pen3 = () => {
            const canvas = canvasRef.current;  
            const context = canvas.getContext('2d');
            context.strokeStyle = 'blue'
        }
    
        const pen4 = () => {
            const canvas = canvasRef.current;  
            const context = canvas.getContext('2d');
            context.strokeStyle = 'yellow'
        }
    
        return (
            <div className='label'>
                <button className='btn' onClick={clearCanvas}>白紙にする</button>
                <button className='btn' onClick={() => setShowPen(true)}>ペン</button>
                <Pen />
                <button className='btn' onClick={eraser}>消しゴム</button>
                <button className='btn_fill' onClick={() => setShowFill(true)}>塗り潰し</button>
                <Fill />
            </div>
        )
    }

    return (
        <>
            <Btn />
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
    )
}

export default Canvas
