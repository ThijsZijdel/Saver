import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const incomes = [
      { id: 11, name: 'Salary', amount: 530.20, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Jan" },
      { id: 12, name: 'Salary', amount: 300.40, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Feb"  },
      { id: 13, name: 'Salary', amount: 600.10, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Mar"  },
      { id: 14, name: 'Salary', amount: 100.30, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Apr"  },
      { id: 15, name: 'Salary', amount: 750.20, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "May"  },
      { id: 16, name: 'Salary', amount: 900, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Jun"  },
      { id: 17, name: 'Salary', amount: 300.40, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Jul"  },
      { id: 18, name: 'Salary', amount: 500, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Aug"  },
      { id: 19, name: 'Salary', amount: 600.50, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Sep"  },
      { id: 20, name: 'Salary', amount: 900, mainDescription: 'desc.', dateRecieved: new Date(), monthName: "Dec"  }
    ];
    const spendings = [
      { id: 11, name: 'Salary', amount: 230.20, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Jan", cacategoryId: 1 },
      { id: 12, name: 'Salary', amount: 100.40, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Feb", cacategoryId: 1  },
      { id: 13, name: 'Salary', amount: 700.10, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Mar", cacategoryId: 1  },
      { id: 14, name: 'Salary', amount: 50.30, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Apr", cacategoryId: 1  },
      { id: 15, name: 'Salary', amount: 350.20, mainDescription: 'desc.', dateSpend: new Date(), monthName: "May", cacategoryId: 1  },
      { id: 16, name: 'Salary', amount: 100, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Jun", cacategoryId: 1  },
      { id: 17, name: 'Salary', amount: 200.40, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Jul", cacategoryId: 1  },
      { id: 18, name: 'Salary', amount: 700, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Aug", cacategoryId: 1  },
      { id: 19, name: 'Salary', amount: 300.50, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Sep", cacategoryId: 1  },
      { id: 20, name: 'Salary', amount: 100, mainDescription: 'desc.', dateSpend: new Date(), monthName: "Dec", cacategoryId: 1  }
    ];
    return {incomes, spendings};
  }
}




