import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export function AnimatedNumber({value}) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, value, { duration: 1.5 });
        return controls.stop;
    }, [value]);

    return <motion.span>{rounded}</motion.span>
}

export default AnimatedNumber;