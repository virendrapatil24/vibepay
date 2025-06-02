import { useEffect, useState } from "react";
import useToast from "../hooks/useToast";
import {
  getBalance,
  searchUsers,
  sendMoney,
} from "../services/account.service";
import { Search } from "lucide-react";
import { recipientUserType } from "../types/account.types";

const Dashboard = () => {
  const { showToast } = useToast();
  const [balance, setBalance] = useState(0);
  const [recipientUser, setRecipientUser] = useState<recipientUserType | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<recipientUserType[]>([]);
  const [amount, setAmount] = useState(0);

  const handleFunds = () => {
    showToast("coming soon!", "info");
  };

  const handleSendMoney = async () => {
    try {
      if (!recipientUser) {
        showToast("Recipient user not found", "error");
        return;
      }
      if (!amount || (amount < 1 && amount < balance)) {
        showToast("Amount should be more than 0.", "error");
        return;
      }

      const data = {
        amount,
        recipientId: recipientUser.id,
      };

      const result = await sendMoney(data);
      setBalance(result.newBalance);
      setRecipientUser(null);
      showToast(result.message || "Money Transfer successful", "success");
    } catch (err: any) {
      showToast(err.message || "Money Transfer Failed", "error");
    }
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
          {!recipientUser ? (
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
                  {searchResults.map((recipient) => (
                    <li className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-3">
                        <div className="cursor-pointer p-4 rounded-full bg-gray-200 text-gray-600 font-bold flex items-center justify-center w-10 h-10 shadow">
                          {recipient?.firstName?.[0]?.toUpperCase()}
                        </div>
                        <h2>
                          {recipient?.firstName + " " + recipient?.lastName}
                        </h2>
                      </div>
                      <button
                        className="py-2 px-6  bg-[#3abab3]/90 text-white text-sm hover:bg-[#3abab3] rounded-lg"
                        onClick={() => setRecipientUser(recipient)}
                      >
                        Send
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="bg-white w-full max-w-sm p-4 px-10 h-fit rounded-lg mx-auto">
              <div className="flex flex-col items-center gap-3">
                <div className="cursor-pointer p-4 rounded-full bg-gray-200 text-gray-600 font-bold flex items-center justify-center w-10 h-10 shadow">
                  {recipientUser?.firstName?.[0]?.toUpperCase()}
                </div>
                <h2>
                  {recipientUser?.firstName + " " + recipientUser?.lastName}
                </h2>
                <input
                  //   type="number"
                  className="bg-gray-200 px-6 py-2 focus:outline-none rounded-lg text-center w-full"
                  placeholder="Amount"
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <button
                  className="py-2 px-6  bg-[#3abab3]/90 text-white text-sm hover:bg-[#3abab3] rounded-lg"
                  onClick={handleSendMoney}
                >
                  Send
                </button>
                <button
                  className="py-2 px-6  bg-red-400/90 text-white text-sm hover:bg-red-400 rounded-lg"
                  onClick={() => setRecipientUser(null)}
                >
                  Go Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
