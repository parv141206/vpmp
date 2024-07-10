import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <div >
      <Image src={"/assets/svg/footer.svg"} width={100} height={100} alt={"Footer"} className="w-full" />
      <div className="min-h-[50vh] bg-[#001122] flex items-center p-5 justify-center">
        <div className="w-1/2 flex flex-col gap-3 text-white">
          <div className="text-5xl text-white">Contact Us</div>
          <div className="p-5 border-s border-blue-200">
            <div className="text-xl">Number : 9909648121</div>
            <div className="text-xl">Email : vpmp.ac.in</div>
          </div>
        </div>
        <div className="t-1/2">
          <iframe className="rounded-3xl border-4 border-blue-200 " src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2158.99761487651!2d72.63810552145283!3d23.239037568412094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2becd11395b5%3A0x858d14fba08da06d!2sVPMP%20Polytechnic%2C%20Gandhinagar!5e0!3m2!1sen!2sin!4v1720587248448!5m2!1sen!2sin" width="300" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ></iframe>
        </div>
      </div>
    </div>
  )
}

