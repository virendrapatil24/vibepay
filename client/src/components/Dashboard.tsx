import { useEffect, useState } from "react";
import useToast from "../hooks/useToast";
import { getBalance, searchUsers } from "../services/account.service";
import { Search } from "lucide-react";

const Dashboard = () => {
  const { showToast } = useToast();
  const [balance, setBalance] = useState(0);
  const [recipientUserId, setRecipientUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleFunds = () => {
    showToast("coming soon!", "info");
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const result = await getBalance();
      if (result?.balance !== undefined) {
        setBalance(Number(result.balance));
      }
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchTerm.trim().length > 0) {
        const results = await searchUsers(searchTerm);
        setSearchResults(results.users.slice(0, 5));
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  console.log(searchResults);

  return (
    <div className="p-2">
      <div className="w-full sm:max-w-4xl xl:max-w-5xl mx-auto mt-8 p-4 py-6 sm:p-6 bg-white rounded-xl space-y-2">
        <div className="bg-[#3abab3] p-4 rounded-lg text-white ">
          <h4 className="">Balance</h4>
          <h2 className="text-5xl mt-2">$ {balance}</h2>
          <div className="space-x-2 mt-6">
            <button
              className="py-2 px-6 bg-gray-200 text-black text-sm hover:bg-white rounded-full"
              onClick={handleFunds}
            >
              Withdraw
            </button>
            <button
              className="py-2 px-6  bg-gray-200 text-black text-sm hover:bg-white rounded-full"
              onClick={handleFunds}
            >
              Add funds
            </button>
          </div>
        </div>
        <div className="min-h-96 bg-gray-200 rounded-lg p-4 flex sm:justify-center">
          {!recipientUserId ? (
            <div className="bg-white w-full sm:w-3/5 h-fit p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Search className="text-gray-500 h-6 w-6" />
                <input
                  className="focus:outline-none"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {searchResults.length > 0 && (
                <ul className="space-y-2 mt-4 pt-4 border-t">
                  {searchResults.map((recipientUser) => (
                    <li className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-3">
                        <div className="cursor-pointer p-4 rounded-full bg-gray-200 text-gray-600 font-bold flex items-center justify-center w-10 h-10 shadow">
                          {recipientUser?.firstName?.[0]?.toUpperCase()}
                        </div>
                        <h2>
                          {recipientUser?.firstName +
                            " " +
                            recipientUser?.lastName}
                        </h2>
                      </div>
                      <button
                        className="py-2 px-6  bg-[#3abab3]/90 text-white text-sm hover:bg-[#3abab3] rounded-lg"
                        onClick={handleFunds}
                      >
                        Send
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div>Send MOneyyyy</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
