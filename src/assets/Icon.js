import React from 'react'
import svgs from './icons'

const Icon = ({ svgName, className, click, title }) => {
  const svgRender = svgs[svgName] || svgs.default
  return (
    <svg
      viewBox={svgRender.viewBox}
      className={className}
      title={title}
      xmlns='http://www.w3.org/2000/svg'
    >
      {svgRender.svg}
    </svg>
  )
}

export default Icon
