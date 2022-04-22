import { ChevronDownIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../features/authorization";
import { getAccount, accountSelectors } from "../../features/accountSlice";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store";

export default function Header() {
  const { token } = useSelector((state: RootState) => state.token)
  const account = useSelector(accountSelectors.selectAll)
  
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAccount(token))
  }, [dispatch])

  const logout = () => {
    dispatch(removeToken(token))
    window.localStorage.removeItem("token")
  };
  
  return (
    <header className="absolute top-5 right-8">
      <div className="group inline-block">
        <button
          type="button"
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          className="flex items-center bg-black text-white space-x-3 hover:opacity-90 cursor-pointer rounded-full p-1 pr-2"
        >
          {account.length ? (
            <>
              {account[0].images.length ? <img src="{account[0].images}" className="rounded-full w-10 h-10"/> : <img src="https://i.pinimg.com/originals/71/12/c6/7112c684ad8669e2ee1c4a38db9b7891.jpg" className="rounded-full w-10 h-10"/>}
              <h2>{account[0].display_name}</h2>
            </>
          )  :
            <div className="flex items-center h-10 px-4">
              Loading...
            </div> 
          }
          <ChevronDownIcon className="h-5 w-5" />
        </button>
        <div className="origin-top-right text-left absolute hidden group-hover:block right-0 mt-1 w-56 rounded-md bg-black">
          <a href="#" className="text-white block px-5 py-4 text-sm">
            Account
          </a>
          <button
            onClick={logout}
            className="flex items-center justify-between text-white text-sm hover:bg-red-500 space-x-2 px-5 py-4 w-full"
          >
            <p>Logout</p>
            <LogoutIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
