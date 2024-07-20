import React, { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import './App.css';
import { categories, programs } from './data';
import FAQSection from './Faq';
import axios, { AxiosError } from 'axios';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("Product Management");
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showNotice, setShowNotice] = useState(true);
  const [error, setError] = useState("")
  const [refer, setReferred] = useState(false)
  const [formData, setFormData] = useState({
    refereeEmail: ''
  });
  const [loginData, setLoginData] = useState({
    email:'',
    password:''  
  })
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState("");
  const [loginmodalopen, setLoginModalOpen] = useState(false)
 

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(()=>{
    const tok = localStorage.getItem('token');
    if(tok){
      setToken(tok);
      setLogged(true);
    }
  }, [])

  const handleReferNowClick = () => {
    if(logged){
      setModalOpen(true);
    }
    else {
      window.alert("Login First");
    }
  };

  interface Program {
    name: string;
    referrerBonus: string;
    refereeBonus: string;
  }

  type Category = typeof categories[number];

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000); 
  };

  const positions =  
  [{x: 19.927709656339687, y: 39.97692758644489},
  {x: 29.601894987129228, y: 20.665273403585527},
  {x: 56.31260622066412, y: 36.0764299140157},
  {x: 43.743695963503335, y: 0.56558582561268},
  {x: 80.08410005978136, y: 60.585603181938794},
  {x: 64.78740420473261, y: 12.907424977236538},
  {x: 24.410582625459988, y: 49.550547693900484},
  {x: 58.20284665364059, y: 81.43039159892274},
  {x: 90.22474504423585, y: 17.021426123890727},
  {x: 6.0900388276248, y: 28.556282591337357},
  {x: 4.938997748506813, y: 45.97125046883199},
  {x: 73.43194889959419, y: 18.50918803271564}]
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  function isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError !== undefined;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/refer`, formData,
      {
        headers:{
          authorization : token
        }
      }
      );
      if (res.status !== 201) {
          console.log(res.data.error)
          setError(res.data.error);
       
      }
      else {
        handleCloseModal();
        setReferred(true);
        
       
      }
    } catch (error) {
      if(isAxiosError(error) && error.response?.status === 403){
        setError('You can only send a referral for a person once.');
      } else {
      setError('An error occurred. Please try again.');
      }
    }
  };

  const logout = ()=>{
    localStorage.removeItem('token');
    setLoginModalOpen(false)
    setToken("");
    setLogged(false);
    setReferred(false)
  }

  const login = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/login`, loginData,
      {
        headers:{
          authorization : token
        }
      }
      );
      if (!res.data.success) {
        setError(res.data.error);
       
      } else {
        setError('')
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        setLogged(true)
        handleCloseModal();
        console.log(res.data)
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-100 text-gray-900">
      {showNotice && (
        <div className="bg-blue-300 text-black py-2 px-4 w-full flex justify-between items-center">
          <span className="mx-auto">Refer and earn !</span>
          <button 
            className="text-black font-bold ml-4"
            onClick={() => setShowNotice(false)}
          >
            &times;
          </button>
        </div>
      )}      
      <header className="py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4">
          <img src="/logo.png" alt="Brand Logo" className="h-10" />
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:bg-blue-500 hover:animate-pulse px-2 rounded-full hover:text-white">Home</a></li>
              <li><a href="#faq" className="hover:bg-blue-500 hover:animate-pulse px-2 rounded-full hover:text-white">About</a></li>
              <li><a href="#ben" className="hover:bg-blue-500 hover:animate-pulse px-2 rounded-full hover:text-white">Benefits</a></li>
              <li>
               {!logged ? <button 
                  className="hover:bg-blue-500 hover:animate-pulse px-2 rounded-full hover:text-white" 
                  onClick={() => setLoginModalOpen(true)}
                >
                  SignIn/SignUp
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

      <main className="container mx-auto flex-grow px-4 flex flex-col justify-center relative">
        <section className="relative top-10 sm:top-16 max-h-screen flex items-center justify-center py-8 sm:py-16 bg-blue-100 rounded-xl overflow-hidden">
          <div className="absolute inset-0">
            { windowWidth>= 1000 ?
            positions.map((pos, index) => {
              return (
                <>
                  <img
                    src="/dollars.png"
                    alt="Dollar"
                    className=" hidden sm:block absolute w-16 h-16 sm:w-24 sm:h-24  animate-pulse"
                    style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
                    key={index}
                  />
                </>
              )
            })
            :
            positions.slice(0,6).map((pos, index) => {
              return (
                <>
                  <img
                    src="/dollars.png"
                    alt="Dollar"
                    className="absolute hidden sm:block w-16 h-16 sm:w-24 sm:h-24  animate-pulse"
                    style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
                    key={index}
                  />
                </>
              )
            })}
          </div>
          <div className="relative z-20 flex flex-col items-center text-center sm:flex-row sm:text-left sm:justify-between">
            <div className="w-full sm:w-1/2">
              <h1 className="text-4xl sm:text-6xl font-bold">Let's Earn & Learn</h1>
              <p className="mt-4 text-lg sm:text-xl">Refer a course and earn rewards!</p>
              <button 
                className="mt-6 px-8 py-4 bg-blue-500 sm:animate-pulse text-white text-lg rounded shadow hover:bg-blue-700"
                onClick={handleReferNowClick} disabled={refer}
              >
               {!refer? "Refer Now":"Referred"}
              </button>
            </div>
          </div>
          <div className="z-10 hidden sm:block w-1/2">
            <img src="/boygirlmain.png" alt="Refer & Earn" className="h-full w-full object-cover" />
          </div>
          <div className="z-10 sm:hidden absolute inset-0 flex items-center justify-center opacity-40">
            <img src="/boygirlmain.png" alt="Refer & Earn" className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="py-16 relative top-10">
          <h2 className="text-4xl font-semibold text-center mb-8">What Are The <span className="text-blue-500">Referral Benefits?</span></h2>
          
          <div className="md:hidden mb-4">
            <select
              className="block w-full p-2 border border-gray-300 rounded"
              onChange={(e) => handleCategoryClick(e.target.value as Category)}
              value={selectedCategory}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="hidden md:flex flex-col w-full md:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden">
              <h3 className="bg-blue-500 text-white text-xl px-4 py-2">All Programs</h3>
              <div className="flex flex-col space-y-2 p-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`text-left hover:bg-gray-100 py-2 px-4 rounded ${category === selectedCategory ? "bg-gray-200" : ""}`}
                    onClick={() => handleCategoryClick(category as Category)}
                    data-tip={category}
                  >
                    {windowWidth < 1024 && category.length > 10 ? category.slice(0, 4) + '...' : category}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-grow p-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-blue-500 text-white">Programs</th>
                      <th className="py-2 px-4 bg-blue-500 text-white">Referrer Bonus</th>
                      <th className="py-2 px-4 bg-blue-500 text-white">Referee Bonus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs[selectedCategory].map((program: Program, index:number) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b">{program.name}</td>
                        <td className="py-2 px-4 border-b">{program.referrerBonus}</td>
                        <td className="py-2 px-4 border-b">{program.refereeBonus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative top-10 bg-gray-50">
          <h2 className="text-4xl font-semibold text-center mb-8">What is a Referral?</h2>
          <p className="mt-4 text-lg text-center max-w-2xl mx-auto">
            A referral is when you invite someone to join our platform and they sign up using your unique referral link.
            You can earn rewards for every successful referral.
          </p>
          <div className="mt-12 flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16">
            <div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <Player
                autoplay
                loop
                src="/user.json"
                className="w-32 h-32 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Submit Referrals</h3>
              <p className="text-sm text-gray-600 text-center">
                Submit referrals easily via our website’s referral section.
              </p>
            </div>
            <div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <Player
                autoplay
                loop
                src="/rewards.json"
                className="w-32 h-32 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
              <p className="text-sm text-gray-600 text-center">
                Earn rewards once your referral joins an Accredian program.
              </p>
            </div>
            <div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <Player
                autoplay
                loop
                src="/bonuses.json"
                className="w-32 h-32 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Receive Bonuses</h3>
              <p className="text-sm text-gray-600 text-center">
                Both parties receive a bonus 30 days after program enrollment.
              </p>
            </div>
          </div>
        </section>

        <section className='py-16 relative top-10'>
          <FAQSection/>
        </section>
        

        {showConfetti && (
          <Player
            autoplay
            src="/confetti.json"
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2"
            style={{ width: "100vh", height: 300 }}
          />
        )}

        <div className="text-center py-16">
            <button 
                className="mt-6 px-8 py-4 bg-blue-500 sm:animate-pulse text-white text-lg rounded shadow hover:bg-blue-700"
                onClick={handleReferNowClick} disabled={refer}
              >
               {!refer? "Refer Now":"Referred"}
            </button>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed z-40 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg sm:w-1/2 w-3/4">
            <h3 className="text-2xl font-semibold mb-4 text-center">Referral Form</h3>
            <form onSubmit={handleSubmit}>
              
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="refereeEmail">Friend's Email</label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="refereeEmail" 
                  type="email" 
                  placeholder="Friend's email" 
                  value={formData.refereeEmail}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              {error && (
                <div className="mb-4 text-red-500 text-sm font-bold">
                  {error}
                </div>
              )}
              <div className="flex items-center justify-between">
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                  type="submit"
                >
                  Submit
                </button>
                <button 
                  className="text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                  onClick={handleCloseModal} 
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!logged && loginmodalopen && (
        <div className="fixed z-40 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg sm:w-1/2 w-3/4">
            <h3 className="text-2xl font-semibold mb-4 text-center">Sign In or Sign up</h3>
            <p className='text-center font-extralight'>At the same place</p>
            <form onSubmit={login}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="email" 
                  type="email" 
                  placeholder="Your email" 
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="password" 
                  type="password" 
                  placeholder="Your password" 
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  required 
                />
              </div>
              {error && (
                <div className="mb-4 text-red-500 text-sm font-bold">
                  {error}
                </div>
              )}
              <div className="flex items-center justify-between">
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                  type="submit"
                >
                  Submit
                </button>
                <button 
                  className="text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                  onClick={() => setLoginModalOpen(false)} 
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
