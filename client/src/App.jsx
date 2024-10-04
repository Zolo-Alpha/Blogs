import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Landing from "./pages/Home/Landing";
import DraftAndPublished from './components/dashboard/DraftAndPublished'

// Pages
const landingProps = {
  title: "Welcome to the Techno Blogs",
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing {...landingProps} />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/services" element={<Browse />} /> */}
        {/* <Route path="/contact" element={<ContactUs />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/dashboard" element={<DraftAndPublished/>}></Route>
      </Routes>
    </>
  );
}

export default App;