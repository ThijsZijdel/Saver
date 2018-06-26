import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const incomes = [
      { id: 1, name: 'Salary', amount: 530.20, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Jan" },
      { id: 2, name: 'Salary', amount: 300.40, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Feb"  },
      { id: 3, name: 'Salary', amount: 600.10, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Mar"  },
      { id: 4, name: 'Salary', amount: 100.30, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Apr"  },
      { id: 5, name: 'Salary', amount: 750.20, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "May"  },
      { id: 6, name: 'Salary', amount: 900,    mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Jun"  },
      { id: 7, name: 'Salary', amount: 300.40, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Jul"  },
      { id: 8, name: 'Salary', amount: 500,    mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Aug"  },
      { id: 9, name: 'Salary', amount: 600.50, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Sep"  },
      { id: 10, name: 'Salary', amount: 400.50, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Oct"  },
      { id: 11, name: 'Salary', amount: 600.50, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Nov"  },
      { id: 12, name: 'Salary', amount: 900,    mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Dec"  }
    ];
    const spendings = [
      { id: 1, name: 'Salary', amount: 230.20, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Jan", cacategoryId: 1 },
      { id: 2, name: 'Salary', amount: 100.40, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Feb", cacategoryId: 1  },
      { id: 3, name: 'Salary', amount: 700.10, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Mar", cacategoryId: 1  },
      { id: 4, name: 'Salary', amount: 50.30,  mainDescription: 'desc.', dateSpend: new Date(), monthName: "Apr", cacategoryId: 1  },
      { id: 5, name: 'Salary', amount: 350.20, mainDescription: 'desc.', dateSpend: new Date(), monthName: "May", cacategoryId: 1  },
      { id: 6, name: 'Salary', amount: 100,    mainDescription: 'desc.', dateSpend: new Date(), monthName: "Jun", cacategoryId: 1  },
      { id: 7, name: 'Salary', amount: 200.40, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Jul", cacategoryId: 1  },
      { id: 8, name: 'Salary', amount: 700,    mainDescription: 'desc.', dateSpend: new Date(), monthName: "Aug", cacategoryId: 1  },
      { id: 9, name: 'Salary', amount: 300.50, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Sep", cacategoryId: 1  },
      { id: 10, name: 'Salary', amount: 500.50, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Oct", cacategoryId: 1  },
      { id: 11, name: 'Salary', amount: 650.50, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Nov", cacategoryId: 1  },
      { id: 12, name: 'Salary', amount: 800,    mainDescription: 'desc.', dateSpend: new Date(), monthName: "Dec", cacategoryId: 1  }
    ];
    const expenses = [];
    const balances = [];

    return {incomes, spendings};
  }
}




