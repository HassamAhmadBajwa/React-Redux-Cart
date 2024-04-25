import Navbar from "./components/Navbar";
import { calculateTotals, getCartItem } from "./features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import CartContainer from "./components/CartContainer";
import { useEffect } from "react";
import Modal from "./components/Modal";
function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItem("random"));
  }, []);
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  if (isLoading) {
    return (
      <div className="loading">
        <h3>Loading... </h3>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
