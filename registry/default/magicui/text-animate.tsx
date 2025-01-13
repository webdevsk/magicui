"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, MotionProps, Variants, motion } from "motion/react"
import { ElementType } from "react"

type AnimationType = "text" | "word" | "character" | "line"
type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown"

export interface TextAnimateProps extends MotionProps {
  /**
   * The text content to animate
   */
  children: string
  /**
   * The class name to be applied to the component
   */
  className?: string
  /**
   * The class name to be applied to each segment
   * @note If you plan to use the function version of segmentClassName in Next.js,
   * your parent component must include the "use client" directive
   */
  segmentClassName?: string | ((segment: string, index: number) => string)
  /**
   * The delay before the component enters
   */
  delay?: number
  /**
   * The delay before the component exits
   */
  exitDelay?: number
  /**
   * The duration of the animation
   */
  duration?: number
  /**
   * Custom motion variants for the animation
   */
  variants?: Variants
  /**
   * The element type to render
   */
  as?: ElementType
  /**
   * How to split the text ("text", "word", "character")
   */
  by?: AnimationType
  /**
   * The stagger children value
   * If not provided, it will use the default stagger timing for the animation type
   */
  staggerChildren?: number
  /**
   * Whether to start animation when component enters viewport
   */
  startOnView?: boolean
  /**
   * Whether to animate only once
   */
  once?: boolean
  /**
   * The animation preset to use
   */
  animation?: AnimationVariant
}

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
}

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: ({delay, exitDelay}: {delay: number, exitDelay: number}) => ({
    opacity: 1,
    transition: {
      delay,
      when: "beforeChildren",
    },
  }),
  exit: ({delay, exitDelay}: {delay: number, exitDelay: number}) => ({
    opacity: 0,
    transition: {
      delay: exitDelay,
      when: "afterChildren",
    },
  }),
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

const defaultItemAnimationVariants: Record<AnimationVariant, { container: Variants; item: Variants }> = {
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      show: ({entryStaggerDelay}: {entryStaggerDelay: number}) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: entryStaggerDelay,
          duration: 0.3,
        },
      }),
      exit: ({exitStaggerDelay}: {exitStaggerDelay: number}) => ({
        opacity: 0,
        y: 20,
        transition: {
          delay: exitStaggerDelay,
          duration: 0.3,
        },
      }),
    },
  },
  blurIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      show: ({entryStaggerDelay}: {entryStaggerDelay: number}) => ({
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          delay: entryStaggerDelay,
          duration: 0.3,
        },
      }),
      exit: ({exitStaggerDelay}: {exitStaggerDelay: number}) => ({
        opacity: 0,
        filter: "blur(10px)",
        transition: {
          delay: exitStaggerDelay,
          duration: 0.3,
        },
      }),
    },
  },
  blurInUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
      show: ({entryStaggerDelay}: {entryStaggerDelay: number}) => ({
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          delay: entryStaggerDelay,
          duration: 0.3,
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      }),
      exit: ({exitStaggerDelay}: {exitStaggerDelay: number}) => ({
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        transition: {
          delay: exitStaggerDelay,
          duration: 0.3,
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      }),
    },
  },
  blurInDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
      show: ({entryStaggerDelay}: {entryStaggerDelay: number}) => ({
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      }),
      exit: ({exitStaggerDelay}: {exitStaggerDelay: number}) => ({
        opacity: 0,
        filter: "blur(10px)",
        y: -20,
        transition: {
          delay: exitStaggerDelay,
          duration: 0.3,
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      }),
    },
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0 },
      show: ({entryStaggerDelay}: {entryStaggerDelay: number}) => ({
        y: 0,
        opacity: 1,
        transition: {
          delay: entryStaggerDelay,
          duration: 0.3,
        },
      }),
      exit: ({exitStaggerDelay}: {exitStaggerDelay: number}) => ({
        y: -20,
        opacity: 0,
        transition: {
          delay: exitStaggerDelay,
          duration: 0.3,
        },
      }),
    },
  },
  slideDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: -20, opacity: 0 },
      show: ({entryStaggerDelay}: {entryStaggerDelay: number}) => ({
        y: 0,
        opacity: 1,
        transition: {
          delay: entryStaggerDelay,
          duration: 0.3,
        },
      }),
      exit: ({exitStaggerDelay}: {exitStaggerDelay: number}) => ({
        y: 20,
        opacity: 0,
        transition: {
          delay: exitStaggerDelay,
          duration: 0.3,
        },
      }),
    },
  },
  slideLeft: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 20, opacity: 0 },
      show: ({entryStaggerDelay}: {entryStaggerDelay: number}) => ({
        x: 0,
        opacity: 1,
        transition: {
          delay: entryStaggerDelay,
          duration: 0.3,
        },
      }),
      exit: ({exitStaggerDelay}: {exitStaggerDelay: number}) => ({
        x: -20,
        opacity: 0,
        transition: {
          delay: exitStaggerDelay,
          duration: 0.3,
        },
      }),
    },
  },
  slideRight: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: -20, opacity: 0 },
      show: ({entryStaggerDelay}: {entryStaggerDelay: number}) => ({
        x: 0,
        opacity: 1,
        transition: {
          delay: entryStaggerDelay,
          duration: 0.3,
        },
      }),
      exit: ({exitStaggerDelay}: {exitStaggerDelay: number}) => ({
        x: 20,
        opacity: 0,
        transition: {
          delay: exitStaggerDelay,
          duration: 0.3,
        },
      }),
    },
  },
  scaleUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 0.5, opacity: 0 },
      show: ({entryStaggerDelay}: {entryStaggerDelay: number}) => ({
        scale: 1,
        opacity: 1,
        transition: {
          delay: entryStaggerDelay,
          duration: 0.3,
          scale: {
            type: "spring",
            damping: 15,
            stiffness: 300,
          },
        },
      }),
      exit: ({exitStaggerDelay}: {exitStaggerDelay: number}) => ({
        scale: 0.5,
        opacity: 0,
        transition: {
          delay: exitStaggerDelay,
          duration: 0.3,
        },
      }),
    },
  },
  scaleDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 1.5, opacity: 0 },
      show: ({entryStaggerDelay}: {entryStaggerDelay: number}) => ({
        scale: 1,
        opacity: 1,
        transition: {
          delay: entryStaggerDelay,
          duration: 0.3,
          scale: {
            type: "spring",
            damping: 15,
            stiffness: 300,
          },
        },
      }),
      exit: ({exitStaggerDelay}: {exitStaggerDelay: number}) => ({
        scale: 1.5,
        opacity: 0,
        transition: {
          delay: exitStaggerDelay,
          duration: 0.3,
        },
      }),
    },
  },
}

export function TextAnimate({
  children,
  delay = 0,
  exitDelay = 0,
  duration = 0.3,
  variants,
  className,
  segmentClassName,
  as: Component = "span",
  startOnView = true,
  once = false,
  by = "word",
  staggerChildren = staggerTimings[by],
  animation = "fadeIn",
  ...props
}: TextAnimateProps) {
  const MotionComponent = motion.create(Component)

  // Use provided variants or default variants based on animation type
  const finalVariants = animation
    ? {
      container: {
        ...defaultItemAnimationVariants[animation].container,
        show: ({delay, exitDelay}: {delay: number, exitDelay: number}) => ({
          ...defaultItemAnimationVariants[animation].container.show,
          transition: {
            delay,
            when: "beforeChildren",
          },
        }),
        exit: ({delay, exitDelay}: {delay: number, exitDelay: number}) => ({
          ...defaultItemAnimationVariants[animation].container.exit,
          transition: {
            delay: exitDelay,
            when: "afterChildren",
          },
        }),
      },
        item: defaultItemAnimationVariants[animation].item,
      }
    : { container: defaultContainerVariants, item: defaultItemVariants }

  let segments: string[] = []
  switch (by) {
    case "word":
      segments = children.split(/(\s+)/)
      break
    case "character":
      segments = children.split("")
      break
    case "line":
      segments = children.split("\n")
      break
    case "text":
    default:
      segments = [children]
      break
  }

  return (
    <AnimatePresence mode="popLayout">
      <MotionComponent
        variants={finalVariants.container}
        initial="hidden"
        custom={{delay, exitDelay}}
        whileInView={startOnView ? "show" : undefined}
        animate={startOnView ? undefined : "show"}
        viewport={{ once: once }}
        exit="exit"
        className={cn("whitespace-pre-wrap", className)}
        {...props}>
        {segments.map((segment, i, segments) => (
          <motion.span
            key={`${by}-${segment}-${i}`}
            variants={finalVariants.item}
            custom={{entryStaggerDelay: i * staggerChildren, exitStaggerDelay: (segments.length - i - 1) * staggerChildren}}
            className={cn(
              by === "line" ? "block" : "inline-block whitespace-pre",
              typeof segmentClassName === "function" ? segmentClassName(segment, i) : segmentClassName
            )}>
            {segment}
          </motion.span>
        ))}
      </MotionComponent>
    </AnimatePresence>
  )
}
