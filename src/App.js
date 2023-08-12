import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="admin/getallemployees" element={<List getallemployees />} />
            <Route path="admin/getallaccounts" element={<List getallaccounts />} />
            <Route path="admin/registeremployee" element={<List registeremployee />} />
            <Route path="admin/addaccounttype" element={<List addaccounttype />} />
            <Route path="admin/getallaccounts" element={<List getallaccounts />} />
            <Route path="admin/getadminbyuid" element={<List getadminbyuid />} />

            <Route path="getallcustomers" element={<List getallcustomers />} />
            <Route path="accountcontroller" element={<List accountcontroller />} />
            <Route path="gettransactionbytid" element={<List gettransactionbytid />} />
            <Route path="transactioncontroller" element={<List transactioncontroller />} />
            <Route path="getemployeebyuid" element={<List getemployeebyuid/>} />
            <Route path="getaccounttypebyaid" element={<List getaccounttypebyaid />} />
            

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
