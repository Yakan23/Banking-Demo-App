import React from 'react'
import HeaderBox from '../../components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox'
import RightSideBar from '@/components/ui/RightSideBar'
import { getLoggedInUser } from '@/lib/actions/user.actions'

const Home= async()=> {
  const loggedIn= await getLoggedInUser()
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Welcome to your dashboard"

          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={456198.168}
          
          />
        </header>
          RECENT TRANSACTION
      </div>
      <RightSideBar
        user={loggedIn}
        banks={[{currentBalance:13651}, {currentBalance:779797} ]}
        transactions={[]}
      />
    </section>
  )
}

export default Home