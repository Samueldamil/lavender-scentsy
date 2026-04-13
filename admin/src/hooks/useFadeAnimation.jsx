import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useFadeAnimations = (deps = []) => {
    const containerRef = useRef();

    useEffect(() => {
        if (!containerRef.current) return;

        let ctx = gsap.context(() => {
            const fadeConfigs = [
                {className: ".fade-up", from: { y: 50, opacity: 0 }, to: {y: 0, opacity: 1}},
                {className: ".fade-down", from: { y: -50, opacity: 0 }, to: {y: 0, opacity: 1}},
                {className: ".fade-left", from: { x: -50, opacity: 0 }, to: {x: 0, opacity: 1}},
                {className: ".fade-right", from: { x: 50, opacity: 0 }, to: {x: 0, opacity: 1}},
                {className: ".zoom-in", from: { scale: 0.8, opacity: 0 }, to: {scale: 1, opacity: 1}},
            ];

            fadeConfigs.forEach(({ className, from, to }) => {
                const elements = gsap.utils.toArray(className);

                elements.forEach((el) => {
                    gsap.fromTo(el, from, {
                        ...to,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            once: true,
                        },
                        onComplete: () => {
                            gsap.set(el, { clearProps: "all" });
                        },
                    });
                })
            });
        }, containerRef);

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => ctx.revert();
    }, deps);

    return containerRef;
}