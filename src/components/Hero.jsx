
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col font-bold">
        <nav className='w-full mb-6 pt-4 flex justify-between items-center'>
            <h1 className='text-2xl orange_gradient'>SynopSize</h1>
            <div className='mt-5 flex flex-col items-center'>
                <h1 className='text-center font-inter font-normal text-xs text-gray-400'>POWERED BY</h1>
                <img className='w-24 cursor-pointer' 
                  onClick={() =>
                  window.open("https://rapidapi.com/", "_blank")}
                  src="https://rapidapi.com/uploads/blue_logo_f50bced105.svg" alt="rapid_api_logo"/>
            </div>
        </nav>
        <div className='w-[100%] h-[1px] bg-white/10'></div>

        <h1 className="head_text">
            AIの力を見て欲しい？
            <br className='max-md:hidden'/>
            <span className="orange_gradient">Need to shorten an Article?</span>
        </h1>
        <h2 className="desc">Save your time with <span className="text-white">SynopSize</span>, powered by an open-source article summarizer tool
        that transforms lengthy articles into clear and concise synopsis</h2>
    </header>
  )
}

export default Hero