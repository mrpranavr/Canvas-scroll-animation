import { gsap, Power3 } from "gsap";
import { useRef, useLayoutEffect, useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

function App() {
    const canvasRef = useRef(null);
    const divRef = useRef(null);
    const sec = useRef(null)

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

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
                end: "500%",
                scrub: 0.5,
            },
            onUpdate: render,
        });

        // Pinning the title div to top
        gsap.to(divRef.current, {
            scrollTrigger: {
                trigger: divRef.current,
                start: "top top",
                end: "500%",
                pin: true,
                pinSpacing: true,
            },
        });

        // Making the title appear only when div about to end
        let t1 = gsap
            .timeline({
                scrollTrigger: {
                    trigger: sec.current,
                    start: "bottom-=2000 center",
                    endTrigger: sec.current,
                    end: "bottom-=1500 center",
                    scrub: true,
                },
            })
            .fromTo(divRef.current, { opacity: 0 }, { opacity: 1 });

        function render() {
            context.canvas.width = images[i].width;
            context.canvas.height = images[i].height;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[ball.frame], 0, 0);
        }
    }, []);

    return (
        <>
            <section ref={sec} className="relative">
                <div className="h-full w-full">
                    <canvas
                        ref={canvasRef}
                        className="h-[100vh] w-[100vw] object-cover"
                    />
                </div>
                <div
                    ref={divRef}
                    className="absolute top-0 h-[100vh] w-[100vw] flex items-center justify-center"
                >
                    <h1 className="text-[52px] font-bold">The Ball</h1>
                </div>
            </section>
            <section>
                <div className="h-[100vh]">section-2</div>
            </section>
        </>
    );
}

export default App;
