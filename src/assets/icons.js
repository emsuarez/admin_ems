import React from 'react'

class Icon {
  constructor(viewBox, svg) {
    this.viewBox = viewBox
    this.svg = <>{svg}</>
  }
}

const svgs = {
  luzRoja: new Icon(
    '0 0 18 18',
    (
      <path
        d='M9 0C4.032 0 0 4.032 0 9C0 13.968 4.032 18 9 18C13.968 18 18 13.968 18 9C18 4.032 13.968 0 9 0Z'
        fill='#E3201D'
      />
    )
  ),
  luzNaranja: new Icon(
    '0 0 18 18',
    (
      <path
        d='M9 0C4.032 0 0 4.032 0 9C0 13.968 4.032 18 9 18C13.968 18 18 13.968 18 9C18 4.032 13.968 0 9 0Z'
        fill='#FF8A1F'
      />
    )
  ),
  luzVerde: new Icon(
    '0 0 17 17',
    (
      <path
        d='M8.5 0C3.808 0 0 3.808 0 8.5C0 13.192 3.808 17 8.5 17C13.192 17 17 13.192 17 8.5C17 3.808 13.192 0 8.5 0Z'
        fill='#128868'
      />
    )
  ),
  ib_editar: new Icon(
    '0 0 17 15',
    (
      <path
        d='M9.58764 2.65888L0 11.4233V14.6731H3.47684L16.0145 3.34822V2.16649L13.6966 0H12.327L9.58764 2.65888Z'
        fill='#128868'
      />
    )
  ),
  ib_eliminar: new Icon(
    '0 0 13 17',
    (
      <path
        d='M12.8323 0.917237H9.7281L8.84118 0.00610352H4.40661L3.51969 0.917237H0.41549V2.7395H12.8323V0.917237ZM1.30241 3.65064V14.5842C1.30241 15.5865 2.10063 16.4065 3.07624 16.4065H10.1716C11.1472 16.4065 11.9454 15.5865 11.9454 14.5842V3.65064H1.30241Z'
        fill='#D61601'
      />
    )
  ),
  ib_cerrar: new Icon(
    '0 0 1000 1000',
    (
      <path d='M790.8,646.4l0-0.2l0.3-0.5l0.1,0.4L790.8,646.4z M760.6,631.2l0-0.2l0.3-0.5l0.1,0.3L760.6,631.2z M194.4,753.1c-15.2,0-27.6,12.4-27.6,27.6v181.8h0c0.1,15.2,12.4,27.5,27.6,27.5c0,0,0,0,0.1,0l725.6,0c15.4,0,28-12.5,28-28V38c0-15.4-12.5-28-28-28H196c-15.4,0-28,12.5-28,28v196h0.1c0.5,14.8,12.6,26.7,27.5,26.7c14.9,0,27.1-11.9,27.5-26.7h0.1V83.1c0-13.7,4.2-17.9,17.9-17.9h633.7c13.7,0,17.9,4.2,17.9,17.9v833.8c0,13.7-4.2,17.9-17.9,17.9H222V780.7C222,765.4,209.6,753.1,194.4,753.1L194.4,753.1z M52.5,494c-0.4,1.8-0.5,3.6-0.5,5.4c0,1.8,0.2,3.6,0.5,5.4c0.2,0.8,0.5,1.5,0.7,2.3c0.3,0.9,0.5,1.9,0.9,2.8c0.3,0.7,0.7,1.3,1.1,2c1,1.9,2.2,3.8,3.7,5.5c0.4,0.4,0.7,0.9,1,1.3c0.1,0.1,0.1,0.2,0.2,0.2l208.9,208.9l0.1-0.1c5,5.1,12,8.4,19.7,8.4c15.2,0,27.6-12.3,27.6-27.6c0-7.8-3.3-14.9-8.6-19.9L146.1,526.9h425.6c15.2,0,27.6-12.3,27.6-27.6c0-15.2-12.3-27.6-27.6-27.6H146.1l160.4-160.4c5.1-5,8.4-12,8.4-19.7c0-15.2-12.3-27.6-27.6-27.6c-7.6,0-14.5,3.1-19.5,8.1L60,479.8c-0.1,0.1-0.1,0.2-0.2,0.2c-0.4,0.4-0.7,0.8-1,1.2c-1.5,1.7-2.7,3.6-3.7,5.5c-0.3,0.7-0.8,1.3-1.1,2c0,0,0,0.1-0.1,0.1c-0.4,0.9-0.5,1.8-0.8,2.7C53,492.4,52.7,493.2,52.5,494L52.5,494z' />
    )
  ),
  ib_flechaizq: new Icon(
    '0 0 73 112',
    (
      <path
        d='M3.71666 59.178C1.9906 57.7879 1.97474 55.1638 3.68386 53.7529L65.2718 2.91192C67.5544 1.02765 71 2.65123 71 5.61105L71 106.053C71 108.993 67.5945 110.623 65.3047 108.779L3.71666 59.178Z'
        fill='white'
        stroke='black'
        strokeWidth='3'
      />
    )
  ),
  ib_flechader: new Icon(
    '0 0 72 112',
    (
      <path
        d='M69.0962 57.7738L7.73642 108.89C5.46229 110.785 2.00949 109.176 1.99624 106.217L1.54653 5.77548C1.53336 2.83541 4.93157 1.19024 7.22962 3.02411L69.0391 52.349C70.7713 53.7314 70.7989 56.3553 69.0962 57.7738Z'
        fill='white'
        stroke='black'
        strokeWidth='3'
      />
    )
  ),
  default: null,
}

export default svgs
