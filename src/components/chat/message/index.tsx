import Image from 'next/image'
import { FC } from 'react'
import LogoImage from '../../../assets/logo.jpg'

type MessageProps = {
  message: string
}

const Message: FC<MessageProps> = ({ message }: MessageProps) => {
  return (
    <div className='flex flex-wrap gap-2'>
      <div>
        <Image alt='LogoImage' className='h-12 w-12' src={LogoImage} />
      </div>
      <p className='m-4 rounded bg-sky-200 p-2 text-white'>{message}</p>
    </div>
  )
}

export default Message
