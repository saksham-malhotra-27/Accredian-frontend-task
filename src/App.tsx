import React, { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import './App.css';
import { categories, programs } from './data';
import FAQSection from './Faq';
import axios, { AxiosError } from 'axios';
import Referal from './Referal';
import Hero from './Hero';
import Nav from './Nav';

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

  useEffect(()=>{
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000);
  }, [refer])

  useEffect(()=>{
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000);
  }, [logged])

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
         // console.log(res.data.error)
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
      //  console.log(res.data)
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
      <Nav logged={logged} logout={logout} setLoginModalOpen={setLoginModalOpen}/>

      <main className="container mx-auto flex-grow px-4 flex flex-col justify-center relative">
        <section className="relative top-10 sm:top-16 max-h-screen flex items-center justify-center py-8 sm:py-16 sm:px-10 md:px-0 bg-blue-100 rounded-xl overflow-hidden">
         <Hero windowWidth={windowWidth} refer={refer} handleReferNowClick={handleReferNowClick}/>
        </section>

        <section id='ben' className="py-16 relative top-10">
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
         <Referal/>
        </section>

        <section id='faq' className='py-16 relative top-10'>
          <FAQSection/>
        </section>
        

        {showConfetti && (
          <Player
            autoplay
            src="/confetti.json"
            className="fixed z-50 bottom-0 left-1/2 transform -translate-x-1/2"
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
                <label className="block text-gray-700 text-sm font-bold mb-2"  htmlFor="refereeEmail">Friend's Email</label>
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
                  minLength={8}
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
