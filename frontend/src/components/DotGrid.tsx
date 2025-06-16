import { animate, stagger } from 'animejs'

const GRID_HEIGHT = 20
const GRID_WIDTH = 25

export const DotGrid = () => {
  const handleDotClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const index = e.currentTarget.dataset.index
    if (!index) return

    animate('.dot-point', {
      scale: [
        { to: 1.35, ease: 'outSine', duration: 250 },
        { to: 1, ease: 'inOutQuad', duration: 500 },
      ],
      translateY: [
        { to: -15, ease: 'outSine', duration: 250 },
        { to: 0, ease: 'inOutQuad', duration: 500 },
      ],
      opacity: [
        { to: 1, ease: 'outSine', duration: 250 },
        { to: 0.5, ease: 'inOutQuad', duration: 500 },
      ],
      delay: stagger(100, {
        grid: [GRID_WIDTH, GRID_HEIGHT],
        from: parseInt(index, 10),
      }),
    })
  }

  const dots = []
  let index = 0

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          onClick={handleDotClick}
          className="group cursor-crosshair rounded-full p-2 transition-colors hover:bg-slate-600 "
          data-index={index}
          key={`${i}-${j}`}
        >
          <div
            className="dot-point h-2 w-2 rounded-full bg-gradient-to-b from-slate-700 to-slate-400 opacity-50 group-hover:from-indigo-600 group-hover:to-white"
            data-index={index}
          />
        </div>,
      )
      index++
    }
  }

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
      className="grid w-fit"
    >
      {dots}
    </div>
  )
}
