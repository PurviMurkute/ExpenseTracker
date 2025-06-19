import React from 'react'
import Header from './../components/Header.jsx';

const AddTransaction = () => {
  return (
    <div>
      <Header/>
      <div>
        <form onSubmit={(e)=>{e.preventDefault()}}>
          <h3>Add Transactions</h3>
        </form>
      </div>
    </div>
  )
}

export default AddTransaction