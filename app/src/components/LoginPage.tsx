import BlueChicken from "../assets/bluechicken.png";
import { useAuth } from "react-oidc-context";

export default function LoginPage() {
  const auth = useAuth();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <img
                    alt="Your Company"
                    src={BlueChicken}
                    className="mx-auto h-10 w-auto"
                  />
                  <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Seed Finder App
                  </h2>
                </div>
                <div className="flex items-center justify-center text-white">
                  <button
                    onClick={() => auth.signinRedirect()}
                    className="bg-discord-blue flex items-center space-x-4 rounded-md px-5 py-3 text-xl font-bold text-white transition duration-75 hover:bg-gray-600 active:bg-gray-900"
                  >
                    Login with Discord
                  </button>
                </div>
                <div className="text-center text-gray-500">
                  This app uses your Discord username to track jobs and previous
                  search results.
                </div>

                <a
                  href="https://github.com/Underscore76/StardewSeedApp"
                  className="flex items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="h-5 w-5 fill-[#24292F]"
                  >
                    <path
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold leading-6">
                    View Project on Github
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
