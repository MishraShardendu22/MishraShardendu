/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Profile</h1>
      <p>{params.id}</p>
    </div>
  )
}

export default page
