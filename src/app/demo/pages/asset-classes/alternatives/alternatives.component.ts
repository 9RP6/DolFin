import { Component } from '@angular/core';

@Component({
  selector: 'app-alternatives',
  templateUrl: './alternatives.component.html',
  styleUrls: ['./alternatives.component.scss']
})
export class AlternativesComponent {
  // Description of alternative investments
  alternativeDescription = `
    Alternative investments are assets that don’t fall into the traditional categories of stocks, bonds, or cash. 
    They include things like real estate, private equity, private credit, hedge funds, commodities (like gold or oil), 
    collectibles (like art or wine), and even cryptocurrencies. These investments often have less regulation, can be 
    harder to sell quickly, and may require more expertise to manage. However, they can offer higher returns and 
    help diversify a portfolio, reducing risk by not relying solely on traditional markets. Many investors use them 
    to protect against inflation or market downturns.
  `;

  // Real Estate
  realEstate = {
    title: 'Real Estate',
    description: `
      Real estate investing involves buying property, such as homes, apartment buildings, or commercial spaces, 
      to generate income or make a profit when the property value increases. Investors can earn money through 
      rent payments from tenants or by selling the property at a higher price than they paid for it. Real estate 
      can be a way to diversify an investment portfolio and protect against inflation. You don’t need to be a 
      professional to invest in real estate; anyone with enough capital can buy property directly. There are also 
      options like real estate investment trusts (REITs), which allow you to invest in real estate without having 
      to own the properties yourself. While real estate can offer stable returns, it also comes with risks, such 
      as property value fluctuations or the challenge of finding tenants.
    `,
    link: 'https://www.morningstar.com/sectors/real-estate'
  };

  // Private Equity and Angel Investing
  privateEquity = {
    title: 'Private Equity',
    description: `
      Private equity is when investors put money into private companies (companies not listed on the stock market) 
      to help them grow or improve. The goal is to eventually sell the company or its shares for a profit.
    `,
    angelInvesting: {
      title: 'Angel Investing',
      description: `
        Angel investing is a type of private equity where individuals (called angel investors) provide early-stage 
        funding to startups in exchange for ownership (equity) in the company. Angel investors typically help small 
        businesses that are just getting started, offering money, and sometimes mentorship. Anyone with significant 
        wealth can become an angel investor, but they usually need to meet certain financial criteria, such as having 
        a high net worth or annual income. They often find opportunities through angel investing groups or online 
        platforms that connect investors with startups. It’s a high-risk investment, but if the startup succeeds, 
        the returns can be very rewarding.
      `
    },
    link: 'https://my.pitchbook.com/research-center/report/6ca91020-2690-3a92-9248-8a519f0962ba'
  };

  // Private Credit and Peer-to-Peer Lending
  privateCredit = {
    title: 'Private Credit',
    description: `
      Private credit is when investors lend money directly to businesses or individuals, instead of through 
      traditional banks. The goal is to earn interest on the loans. It’s a way for businesses to access funding 
      without going through traditional financial institutions.
    `,
    peerToPeerLending: {
      title: 'Peer-to-Peer Lending',
      description: `
        Peer-to-peer (P2P) lending is a form of private credit where individuals lend money to other individuals 
        or small businesses via online platforms. These platforms connect lenders with borrowers, allowing them to 
        agree on loan terms. Lenders earn interest from the loans, but there is a risk that the borrower might not 
        repay. Anyone with enough capital can participate in peer-to-peer lending by signing up on a P2P platform. 
        It’s a way to earn interest, but it comes with the risk of loan defaults. The more you lend, the higher the 
        potential returns, but also the higher the risk.
      `
    },
    link: 'https://www.dechert.com/about/dechert-year-in-review/private-credit-highlights-and-outlook.html'
  };
}