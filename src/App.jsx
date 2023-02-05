import { gsap, Power3 } from "gsap";
import { useRef, useLayoutEffect, useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

function App() {
    const canvasRef = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const canvas = canvasRef.current;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        const frameCount = 220;
        const images = [];

        const ball = {
            frame: 1,
        };

        const currentFrame = (index) =>
            `./Renders/${(index + 1).toString()}.jpg`;

        const context = canvas.getContext("2d");

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        let i = 0;
        images[0].onload = () => {
            render();
        };

        gsap.to(ball, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                pin: "canvas",
                end: "550%",
                scrub: 0.5
            },
            onUpdate: render
        });

        function render() {
            context.canvas.width = images[i].width;
            context.canvas.height = images[i].height;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[ball.frame], 0, 0);
        }
    }, []);

    return (
        <>
            <div className="h-full w-full">
                <canvas ref={canvasRef} className="h-[100vh] w-[100vw] object-cover" />
            </div>
            <div>Hello</div>
        </>
    );
}

export default App;
