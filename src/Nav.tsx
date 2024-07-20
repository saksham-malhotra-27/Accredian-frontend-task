
function Nav({logout, logged, setLoginModalOpen}: {logout:()=>void, logged:boolean, setLoginModalOpen:any}) {
  return (
    <>
     <header className="py-4 shadow-md">
        <div className="container mx-auto text-sm flex items-center justify-between px-4">
          <img src="/logo.png" alt="Brand Logo" className="h-10" />
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#faq" className="hover:bg-blue-500 hover:animate-pulse px-2 rounded-full hover:text-white">About</a></li>
              <li><a href="#ben" className="hover:bg-blue-500 hover:animate-pulse px-2 rounded-full hover:text-white">Benefits</a></li>
              <li>
               {!logged ? <button 
                  className="hover:bg-blue-500 hover:animate-pulse px-2 rounded-full hover:text-white" 
                  onClick={() => setLoginModalOpen(true)}
                >
                  SignIn
                </button> :
                <button 
                className="hover:bg-blue-500 hover:animate-pulse px-2 rounded-full hover:text-white" 
                onClick={logout}
              >
                Logout
              </button>
                }
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Nav