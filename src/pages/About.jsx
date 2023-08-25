import React from 'react'
import about from "../assets/about.png"
import quote from "../assets/quote.svg"
import ben1 from "../assets/ben1.svg"
import ben2 from "../assets/ben2.svg"
import ben3 from "../assets/ben3.svg"
import ben4 from "../assets/ben4.svg"
import service2 from "../assets/service2.png"


const About = () => {
  return (
    <>

    <div className=' lg:px-[70px] px-5 w-full h-full'>
      <div className='lg:flex items-center justify-center w-full space-y-3 lg:space-y-0 lg:w-[95%] h-full lg:h-[600px] lg:mt-[1rem] mb-[3rem] lg:mb-0'>
                <div className='w-full h-full mb-[3rem] lg:mb-0'>
                    <h1 className='text-5xl font-semibold lg:mt-[4rem] leading-[4rem] w-full'> About Us</h1>
                    <p className='mt-10 lg:w-[90%] text-lg font-thin text-[#1111117f]'>
                       The Charis Advantage LGI (Life Group<br/> International) Consumer cooperative enterprise is<br/> owned and managed, democratically.<br /><br />

                       It aims at fulfilling the needs and aspirations of its<br/> members and operates within the market system,<br/> independent of the state.<br /><br />

                       As a form of mutual benefit, it is oriented toward<br/> service rather than profit.<br /><br />
                    </p> 
                </div>

                <div className=' w-full h-full flex items-center contact-img'>
                    <img src={about} loading='lazy' className="w-full h-full lg:h-[80%] rounded-lg " />
                </div>
       </div>
    </div>

     <div className='w-full lg:h-max bg-[#1E1C1C] lg:px-[70px] px-5 lg:py-[5rem] py-[2rem] mb-[7rem]'>
        <div className='lg:flex lg:items-start lg:space-x-[15rem] lg:justify-center space-y-7 lg:space-y-0'>
          {/* FIRST FLEX ITEM STARTS */}
            <div className='text-center  flex flex-col items-center'>
              <h1 className='text-2xl font-bold mb-7 text-white'>Vision</h1>
              <img src={quote} />
              <p className='mt-5 text-[#ffffff8f]'>We believe that the needs and<br/> aspirations of people can be met<br/> and managed making every<br/> household economically stable.</p>
            </div>
          {/* FIRST FLEX ITEM ENDS */}

          {/* SECOND FLEX ITEM STARTS */}
            <div className='text-center text-white flex flex-col items-center'>
              <h1 className='text-2xl font-bold mb-7'>Mission</h1>
               <img src={quote} />
              <p className='mt-5 text-[#ffffff8f]'>Bringing the future<br/> together.</p>
            </div>
          {/* SECOND FLEX ITEM ENDS */}
        </div>

            <h1 className='text-3xl font-extrabold text-white text-center mt-[7rem]'>Why Choose Us</h1>
            <div className='lg:flex items-center w-full lg:space-x-10 space-y-[2rem] lg:space-y-0  mt-20'>
                <div className='lg:h-[18rem] h-auto p-3 py-[5rem] lg:py-0  border-[0.435233px] rounded-xl  border-white lg:w-full w-full flex flex-col items-center justify-center text-center'>
                  <img src={ben1} />
                  <p className='mt-[3rem] text-white'>Benefit 1</p>
                  <p className='mt-4 text-[#ffffff8f]'>Become a home owner with ease at affordable and appreciable cost</p>
                </div>

                <div className='lg:h-[18rem] h-auto p-3 border-[0.435233px] rounded-xl  border-white lg:w-full w-full flex flex-col items-center justify-center text-center py-[5rem] lg:py-0'>
                  <img src={ben2} />
                  <p className='mt-[3rem] text-white'>Benefit 2</p>
                  <p className='mt-4 text-[#ffffff8f]'>Earn annual cashflow on your cooperative store capital</p>
                </div>

                <div className='lg:h-[18rem] h-auto p-3 border-[0.435233px] rounded-xl  border-white lg:w-full w-full flex flex-col items-center justify-center text-center py-[5rem] lg:py-0'>
                  <img src={ben3} />
                  <p className='mt-[3rem] text-white'>Benefit 3</p>
                  <p className='mt-4 text-[#ffffff8f]'>Guaranteed home payment support in case of death or disability or less of income source</p>
                </div>

                <div className='lg:h-[18rem] h-auto p-3 border-[0.435233px] rounded-xl  border-white lg:w-full w-full flex flex-col items-center justify-center text-center py-[5rem] lg:py-0'>
                  <img src={ben4} />
                  <p className='mt-[3rem] text-white'>Benefit 4</p>
                  <p className='mt-4 text-[#ffffff8f]'>Flexible and convenient monthly repayment to match the customer’s income</p>
                </div>
               
            </div>
     </div>

        <div className='w-full h-full lg:px-[64px] mb-[10rem] py-10'>
          <h1 className='text-3xl font-extrabold text-[#FD6602] text-center mb-[5rem]'>Our Services</h1>
          <div className='lg:flex h-full items-center justify-start lg:space-x-[2rem] space-y-[2rem] lg:space-y-0'>

            <div className='w-full h-full p-0 flex flex-col items-center'>
              <img src={service2} className=' object-cover rounded-2xl border-4 border-white shadow-md shadow-black' />
              <p className='text-center mt-5 text-sm'>Facilitate Agro-Industrial Activities</p>
            </div>
            <div className='w-full h-full p-0 flex flex-col items-center justify-center'>
              <img src={service2} className=' object-cover rounded-2xl border-4 border-white shadow-md shadow-black' />
              <p className='text-center mt-4 text-sm'>FCo-ordinate purchase of domestic products</p>
            </div>
            <div className='w-full h-full p-0 flex flex-col items-center'>
              <img src={service2} className=' object-cover rounded-2xl border-4 border-white shadow-md shadow-black' />
              <p className='text-center mt-5 text-sm'>Facilitate Infrastructural Development</p>
            </div>
            <div className='w-full h-full p-0 flex flex-col items-center'>
              <img src={service2} className=' object-cover rounded-2xl border-4 border-white shadow-md shadow-black' />
              <p className='text-center mt-5 text-sm'>Facilitate Member’s Home Ownership</p>
            </div>
            
          </div>
        </div>
     </>
  )
}

export default About