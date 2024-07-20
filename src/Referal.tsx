import { Player } from "@lottiefiles/react-lottie-player"

function Referal() {
  return (
    <>
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
    </>
  )
}

export default Referal