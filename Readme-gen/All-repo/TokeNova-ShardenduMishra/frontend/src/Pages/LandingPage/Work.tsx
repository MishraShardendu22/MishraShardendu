const Work = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366F1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 tracking-tight">
            Simple, Seamless Process
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting started with blockchain ticketing has never been easier.
          </p>
        </div>

        {/* Animated Horizontal Timeline */}
        <div className="relative pb-12">
          {/* Main timeline line with animation */}
          <div className="absolute left-0 right-0 h-1 bg-gray-200 top-16 hidden md:block">
            <div
              className="h-full bg-indigo-600 w-0 origin-left rounded-full"
              style={{
                animation:
                  "expand 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards 0.5s",
              }}
            ></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
            {[
              {
                icon: "💼",
                title: "Create & Customize",
                description:
                  "Set up your event with details, custom ticket tiers, and pricing—all secured on the blockchain.",
                delay: 0.5,
              },
              {
                icon: "🎟️",
                title: "Mint & Distribute",
                description:
                  "Attendees receive unique NFT tickets directly in their digital wallets after purchase.",
                delay: 1.0,
              },
              {
                icon: "🚪",
                title: "Verify & Experience",
                description:
                  "Seamless entry verification at the venue through QR code scanning of the NFT ticket.",
                delay: 1.5,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="md:w-1/3 relative"
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.5s ease forwards ${step.delay}s, floatUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards ${step.delay}s`,
                }}
              >
                {/* Animated circle node on timeline */}
                <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div
                    className="w-14 h-14 rounded-full bg-white border-3 border-indigo-500 flex items-center justify-center shadow-lg"
                    style={{
                      animation: `pulse 2.5s infinite ${step.delay + 0.2}s`,
                    }}
                  >
                    <span className="text-xl font-bold text-indigo-600">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Mobile circle node */}
                <div className="md:hidden flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center shadow-lg mr-4"
                    style={{
                      animation: `pulse 2.5s infinite ${step.delay + 0.2}s`,
                    }}
                  >
                    <span className="text-lg font-bold text-indigo-600">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {step.title}
                  </h3>
                </div>

                {/* Content box with icon */}
                <div className="md:mt-32 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group backdrop-blur-sm bg-white/90">
                  {/* Decorative accent corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-100 rounded-bl-3xl transition-all duration-300 group-hover:bg-indigo-200"></div>

                  <div className="text-4xl mb-5 transform transition-transform duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 hidden md:block">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Step indicator dot */}
                  <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-indigo-500 opacity-70 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes expand {
            0% {
              width: 0;
            }
            100% {
              width: 100%;
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes floatUp {
            0% {
              transform: translateY(20px);
            }
            100% {
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Work;
