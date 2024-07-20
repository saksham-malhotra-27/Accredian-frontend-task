

function Hero({windowWidth, refer, handleReferNowClick}:{windowWidth:number, refer:any, handleReferNowClick: any}) {
 
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
  
    return (
    <>
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
    </>  )
}

export default Hero