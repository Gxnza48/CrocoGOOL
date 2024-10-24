import React, { useEffect, useRef } from 'react'

const sponsors = [
  'Chanel', 'Dior', 'Tom Ford', 'SMOK', 'Voopoo', 'Uwell',
  'Gucci', 'Yves Saint Laurent', 'Juul', 'Vaporesso', 'GeekVape', 'Innokin'
]

const SponsorWheel = () => {
  const wheelRef = useRef(null)

  useEffect(() => {
    const wheel = wheelRef.current
    let position = 0
    const speed = 0.5 // Adjust for faster/slower scrolling

    const scroll = () => {
      position += speed
      const totalWidth = sponsors.length * 200 // Assuming each sponsor takes 200px width
      if (position > totalWidth) {
        position = 0
      }
      wheel.style.transform = `translateX(${-position}px)`
      requestAnimationFrame(scroll)
    }

    scroll()
  }, [])

  return (
    <div className="overflow-hidden py-4 bg-black">
      <div ref={wheelRef} className="flex whitespace-nowrap">
        {[...sponsors, ...sponsors].map((sponsor, index) => (
          <div key={index} className="inline-block mx-4">
            <div className="bg-black rounded-lg p-4 w-48 h-24 flex items-center justify-center">
              <span className="text-white font-bold">{sponsor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SponsorWheel