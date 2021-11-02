import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import './App.css';
import { addCustomerAction } from './store/customerReducer';
import { removeCustomerAction } from './store/customerReducer';
import { addCashAction } from './store/cashReducer';
import { removeCashAction } from './store/cashReducer';
import { fetchCustomers } from './asyncActions/customers';

function App() {

  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)

  const addCash = (payload) => {
    dispatch(addCashAction(payload))
  }
  const subtractCash = (payload) => {
    dispatch(removeCashAction(payload))
  }

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className="App" style={{ display: 'flex', flexDirection: "column", fontSize: '3rem' }}>
      <p>{cash}</p>
      <div >
        <button onClick={() => addCash(50)} style={{ margin: 10, fontSize: 'inherit' }}>Add</button>
        <button onClick={() => subtractCash(50)} style={{ margin: 10, fontSize: 'inherit' }}>Subrtact</button>
        <button onClick={() => addCustomer("New one")} style={{ margin: 10, fontSize: 'inherit' }}>Add Customer</button>
        <button onClick={() => dispatch(fetchCustomers())} style={{ margin: 10, fontSize: 'inherit' }}>Add Many</button>
      </div>
      {customers.length < 0 ?
        <div>There is no customers here</div>
        :
        customers.map(customer => <div onClick={() => removeCustomer(customer)}>{customer.name}</div>)
      }
    </div>
  );
}

export default App;
