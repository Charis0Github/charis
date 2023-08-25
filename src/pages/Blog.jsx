import React from 'react'
import blog from '../assets/blog.png'

const Blog = () => {
  return (
    <div className='py-5 lg:px-0  w-full h-full mb-[5rem] flex flex-col leading-7'>
         <div className='w-full lg:h-[600PX]'>
            <img src={blog} className="w-full h-full object-cover" />
        </div>

        <div className='lg:px-[64px] px-5  w-full h-full mt-[2rem]'>
            <h1 className='text-2xl font-bold'>CALGI SECURELY DELIVERS YOUR NEEDS</h1>
            <p className='text-lg text-left my-[1rem] text-[#1111117f]'>Access basic necessities at a cheaper rate, own your home on a rent to own basis or an outright payment, earn dividends when you invest into the cooperative, access loans at a 2% interest rate.</p>


            <h1 className='text-[#FD6602] text-2xl'>FEATURES</h1>
            <p className='mt-3 text-[#1111117f]'>1. Mortgage Loan maximum of N50,000,000 depending on the house type and location @ 6% interest rate To 15% per annum.<br/>
            2. Equity contribution starts from 10% (depending on the proposed loan amount and building stage)<br/>
            3. Equity Loan up to N4,000,000 after 6months of membership @ 15% per annum.<br/>
            4. Maximum of thirty (30) years tenor5). Available to individuals of 18 years and above.<br/></p>

            <h1 className='text-[#FD6602] text-2xl mt-[3rem]'>BENEFITS</h1>
            <p className='mt-3 text-[#1111117f]' >
                1. Become a homeowner with ease at affordable and appreciable cost.<br/>
                2. Long repayment tenor is subject to applicant’s age (up to 30 years repayment period)<br/>
                3. Stable interest rate throughout the tenor of the loan.<br/>
                4. Flexible and convenient monthly repayment to match the customer’s income.<br/>
                5. Guarantee home payment support in case of death or disability or loss of income source.<br/>
                6. Earn annual cashflow on your cooperative share capital.<br/>
            </p>
        </div>

            <div className='w-full h-full flex flex-col bg-[#e6e4e4] py-10 mt-[3rem] leading-7'>
              <div className='lg:px-[64px] px-5  w-full h-full'>
                    <h1 className='text-black text-2xl my-2'>HOME OWNERSHIP OPTIONS</h1>
                    <li className='list-disc text-[#1111117f]'>Buy an existing building any where in Edo state </li>
                    <li className='list-disc text-[#1111117f]'>Buy a building Off-Plan (about to be built on an estate)</li>
                    <li className='list-disc text-[#1111117f]'>Build your own house on your own land</li>
                    <li className='list-disc text-[#1111117f]'>Complete an uncompleted building</li>
                    <li className='list-disc text-[#1111117f]'>Renovate or upgrade an existing building</li>
              </div>
            </div>


            <div className='lg:px-[64px] px-5  w-full h-full mt-[2rem]'>
              <h1 className='text-[#FD6602] text-2xl mt-[3rem]'>STEP 1-JOIN THE HOUSING COOPERATIVE</h1>
                <p className='mt-3 text-[#1111117f] w-full' >
                  <li className='list-disc text-[#1111117f]'>Entrance Fee - N20,000</li>
                  <li className='list-disc text-[#1111117f]'>Share Capital - N300,000 or more at N1 naira per share.</li>
                  <li className='list-disc text-[#1111117f]'>Monthly Contribution - N10,000 or more.</li>
                  <li className='list-disc text-[#1111117f]'>Attend Monthly online co-op meetings.</li>
                  <li className='list-disc text-[#1111117f]'>Make Monthly Purchase from Co-op Shop - N20,000 and above</li>
                </p>


               <h1 className='text-[#FD6602] text-2xl mt-[3rem]'>STEP 2-APPLY FOR HOUSE OF CHOICE</h1>
                <p className='mt-3 text-[#1111117f] w-full' >
                  <li className='list-disc text-[#1111117f]'>Apply for house - N50,000</li>
                  <li className='list-disc text-[#1111117f]'>Fill Application Form</li>
                  <li className='list-disc text-[#1111117f]'>Submit 6 months’ Pay slips or account statement or thrift statement.</li>
                  <li className='list-disc text-[#1111117f]'>Four passport photographs</li>
                  <li className='list-disc text-[#1111117f]'>Offer Letter (Allocation Letter)</li>
                  <li className='list-disc text-[#1111117f]'>Account opening (Current Account) of N10,000 with THE PMI.</li>
                  <li className='list-disc text-[#1111117f]'>NHF contribution Passbook (at least 6 months contribution)</li>
                  <li className='list-disc text-[#1111117f]'>Birth Certificate or Declaration of Age</li>
                  <li className='list-disc text-[#1111117f]'>Letter of Undertaking from applicant (Undertaking to have never accessed NHF Loan)</li>
                  <li className='list-disc text-[#1111117f]'>Pay Agency Fee @ 5%</li>
                  <li className='list-disc text-[#1111117f]'>Pay Legal Fee @ 5%</li>
                </p>

                <h1 className='text-[#FD6602] text-2xl mt-[3rem]'>STEP 3-FULFIL CO_OPERATIVE MEMBERSHIP     </h1>
                <p className='mt-3 text-[#1111117f] w-full' >
                  <li className='list-disc text-[#1111117f]'>Monthly Contribution (1% or more of house value) + ( 0.2% Insurance premium) + (0.1% management fees)</li>
                  <li className='list-disc text-[#1111117f]'>Attend Monthly online co-op meetings</li>
                  <li className='list-disc text-[#1111117f]'>Make Monthly Purchase from Co-op Shop - N20,000 and above</li>
                  <li className='list-disc text-[#1111117f]'>Take full possession of the property.</li>
                </p>
            </div>
    </div>
      
  )
}

export default Blog