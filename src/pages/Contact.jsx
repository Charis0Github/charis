import React from 'react'
import contact from '../assets/contact.png'
import location from '../assets/location.svg'
import whatsapp from '../assets/whatsapp.svg'
import phone from '../assets/phone.svg'

const Contact = () => {
  return (
    <div className=' px-5 py-5 lg:px-0  w-full h-full mb-[5rem]'>
        <div className='w-full lg:h-[600PX]'>
            <img src={contact} className="w-full h-full object-cover" />
        </div>

        <div>
            <h1 className='uppercase text-3xl mb-[5rem] mt-[3rem] font-bold lg:px-[7rem]'>Get In Touch</h1>

            <div className='lg:flex items-start'>
                 {/* CONTACT SECTION STARTS */}
                    <div className='w-full h-full mb-[5rem] lg:mb-0'>
                        <h1 className='text-2xl text-[#FD6602] lg:px-[7rem] lg:mb-10'>Contact Us</h1>

                        <div className='lg:px-[7rem] flex flex-col items-center space-y-10 lg:mt-0 mt-5'>
                            <div className='flex items-center space-x-5 lg:space-x-10 justify-start w-full'>
                                <img src={location} className="w-[20px] h-[25px] object-cover" />
                                <p>Address: 1, Ogbelaka st, Opp Federal High Court,<br/> Sapele Rd, B/C.</p>
                            </div>

                            <div className='flex items-center space-x-5 lg:space-x-10 justify-start w-full'>
                                <img src={whatsapp} className="w-[20px] h-[25px] object-cover" />
                                <p>+234-915-962-9644</p>
                            </div>

                            <div className='flex items-center space-x-5 lg:space-x-10 justify-start w-full'>
                                <img src={phone} className="w-[20px] h-[25px] object-cover" />
                                <p>+234-813-873-5665</p>
                            </div>

                            <div className='flex items-center space-x-5 lg:space-x-10 justify-start w-full'>
                                <img src={phone} className="w-[20px] h-[25px] object-cover" />
                                <p>+234-808-186-2750</p>
                            </div>
                        </div>

                    </div>
                 {/* CONTACT SECTION ENDS */}


                {/* FORM SECTION STARTS */}
                    <div className='w-full h-full'>
                        <h1 className='text-2xl text-[#FD6602] lg:px-[10rem] lg:mb-10'>Send a message</h1>
                        <form className='lg:px-[10rem] flex flex-col space-y-5 mt-[2rem] lg:mt-0'>
                            <div className='flex flex-col mb-2'>
                            <label htmlFor='name' className='text-sm my-1'> Full name</label>
                            <input type='text' id='name' required className='w-full text-sm outline-none placeholder-[#00000084] bg-transparent p-3 mt-2 rounded-lg border-[1px] border-black' placeholder='Enter full name' />
                            </div>

                            <div className='flex flex-col mb-2'>
                            <label htmlFor='email' className='text-sm my-1'> Email</label>
                            <input type='email' id='email' className='w-full  text-sm outline-none placeholder-[#00000084] bg-transparent p-3 mt-2 rounded-lg border-[1px] border-black' placeholder='Enter E-mail' />
                            </div>

                            <div className='flex flex-col mb-2'>
                            <label htmlFor='phone' className='text-sm my-1'> Phone number</label>
                            <input type='tel' id='phone' className='w-full text-sm  outline-none placeholder-[#00000084] bg-transparent p-3 mt-2 rounded-lg border-[1px] border-black' placeholder='Enter phone number' />
                            </div>

                            <div className='flex flex-col mb-2'>
                            <label className='mb-2 text-sm'>Message</label>
                            <textarea rows="10" cols="70" placeholder='Type your message here' className='w-full bg-transparent text-sm p-3 mt-2 rounded-lg border-[1px] border-black outline-none'>
                            
                            </textarea>
                            </div>

                            <button type='button' className='bg-black text-white text-sm font-semibold mt-1 p-3 w-[6rem] h-auto px-3 rounded-lg'>
                            send
                            </button>
                        </form>
                    </div>
                {/* FORM SECTION ENDS */}

            </div>
        </div>
    </div>
  )
}

export default Contact