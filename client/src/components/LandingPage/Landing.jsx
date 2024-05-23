import Sun from "../../../public/assets/icon-sun.svg"

const Landing = () => {
  return (
    <div>
        <div className="bg-center bg-cover bg-no-repeat bg-mobile-dark h-200 py-45 px-25 flex justify-between ">
            <h1 className="font-bold text-25 text-white  tracking-12">WELCOME</h1>
            <button className="h-30">
              <img src={Sun} alt="" />
            </button>
        </div>

        <div className="px-25 flex justify-center">
            <form className="mt-[-60px] flex flex-col justify-center items-center gap-12 rounded-6 w-full py-25 px-20 bg-very-dark-desaturated-blue caret-bright-blue" 
            action="">

                <input 
                className="
                w-full h-48 py-8 px-12 rounded-6 text-light-grayish-blue text-13 bg-very-dark-desaturated-blue outline outline-1 outline-very-dark-grayish-blue-dark focus:shadow-sm focus:shadow-bright-blue" 
                type="email" placeholder="Email address" id="email"/>

                <input className="w-full h-48 py-8 px-12 rounded-6 text-light-grayish-blue bg-very-dark-desaturated-blue text-13 outline outline-1 outline-very-dark-grayish-blue-dark focus:shadow-sm focus:shadow-bright-blue" 
                type="email" placeholder="Password" id="email"/>

                <button className="mt-10 text-light-grayish-blue text-14 w-full h-48 bg-bright-blue rounded-6 hover:bg-bright-blue-hover transition-colors duration-300">Log in</button>

                <p className="text-light-grayish-blue text-14 hover:cursor-pointer hover:underline decoration-bright-blue">Forgotten password?</p>

                <div className="w-full m-8 outline outline-1 outline-very-dark-grayish-blue-dark"></div>

                <button className="text-light-grayish-blue text-14 w-4/6 h-48 bg-bright-blue rounded-6 hover:bg-bright-blue-hover transition-colors duration-300">Create new account</button>
            </form>
        </div>
    </div>
  )
}

export default Landing