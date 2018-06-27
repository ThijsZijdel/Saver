import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const incomes = [
      { id: 1, name: 'Salary', amount: 530.20, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Jan", monthFk: 1, balanceFk: 1, companyFk: 1, alreadyPaid: 1 },
      { id: 2, name: 'Salary', amount: 300.40, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Feb", monthFk: 2, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 3, name: 'Salary', amount: 600.10, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Mar", monthFk: 3, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 4, name: 'Salary', amount: 100.30, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Apr", monthFk: 4, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 5, name: 'Salary', amount: 750.20, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "May", monthFk: 5, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 6, name: 'Salary', amount: 900,    repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 6, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 7, name: 'Salary', amount: 300.40, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Jul", monthFk: 7, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 8, name: 'Salary', amount: 500,    repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Aug", monthFk: 8, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 9, name: 'Salary', amount: 600.50, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Sep", monthFk: 9, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 10, name: 'Salary', amount: 400.50, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Oct", monthFk: 10, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 11, name: 'Salary', amount: 600.50, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Nov", monthFk: 11, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 12, name: 'Salary', amount: 900,    repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Dec", monthFk: 12, balanceFk: 1, companyFk: 1, alreadyPaid: 0  }
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
    const expenses = [
      { id: 1, name: 'Salary', amount: 530.20, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Jan", monthFk: 1, subCategoryFk: 1, balanceFk: 1, companyFk: 1, alreadyPaid: 1 },
      { id: 2, name: 'Salary', amount: 300.40, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Feb", monthFk: 2, subCategoryFk: 2, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 3, name: 'Salary', amount: 600.10, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Mar", monthFk: 3, subCategoryFk: 3, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 4, name: 'Salary', amount: 100.30, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Apr", monthFk: 4, subCategoryFk: 4, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 5, name: 'Salary', amount: 750.20, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "May", monthFk: 5, subCategoryFk: 5, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 6, name: 'Salary', amount: 900,    repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 6, subCategoryFk: 2, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 7, name: 'Salary', amount: 300.40, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Jul", monthFk: 7, subCategoryFk: 4, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 8, name: 'Salary', amount: 500,    repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Aug", monthFk: 8, subCategoryFk: 3, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 9, name: 'Salary', amount: 600.50, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Sep", monthFk: 9, subCategoryFk: 1, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 10, name: 'Salary', amount: 400.50, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Oct", monthFk: 10, subCategoryFk: 3, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 11, name: 'Salary', amount: 600.50, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Nov", monthFk: 11, subCategoryFk: 8, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 12, name: 'Salary', amount: 900,    repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Dec", monthFk: 12, subCategoryFk: 1, balanceFk: 1, companyFk: 1, alreadyPaid: 0  }
    ];
    const balances = [];
    const categories = [
      { id: 1, name: 'Home', description: 'home related expenses.', color: "#333", icon:"home", subCategoryFk: 0},
      { id: 2, name: 'Utilities', description: 'Mostly monthly expenses.', color: "#444",icon:"cogs", subCategoryFk: 0},
      { id: 3, name: 'Groceries', description: 'Food, drinks.', color: "#938234",icon:"utensils", subCategoryFk: 0},
      { id: 4, name: 'Transportation', description: 'Transportation expenses.', color: "#333",icon:"car", subCategoryFk: 0},
      { id: 5, name: 'Personal', description: 'Personal expenses.', color: "#444",icon:"user", subCategoryFk: 0},
      { id: 6, name: 'Mobile Phone', description: 'Tele2.', color: "#938234",icon:"phone", subCategoryFk: 2},
      { id: 7, name: 'Clothing', description: 'Clothes.', color: "#333",icon:"tshirt", subCategoryFk: 0},
      { id: 8, name: 'Festivals', description: 'Parties.', color: "#444",icon:"gift", subCategoryFk: 5},
      { id: 9, name: 'Insurances', description: 'desc.', color: "#938234",icon:"medkit", subCategoryFk: 0},
      { id: 10, name: 'Scooter costs', description: 'desc.', color: "#333",icon:"motorcycle", subCategoryFk: 4},
      { id: 11, name: 'Rent', description: 'Home costs.', color: "#444", icon:"home", subCategoryFk: 1},
      { id: 12, name: 'Study', description: 'desc.', color: "#938234",icon:"graduation-cap", subCategoryFk: 0}
    ];
    const budgets = [
      { id: 1, name: 'Bulk Budget', repeatingFk: 1, description: 'Main Budget.', startDate: new Date(), endDate: new Date(), balanceFk: 1, typeFk: "bulk", amountStart: 3563.52, amountLeft:2963.52, monthFk: 6, isPast: 0},
      { id: 2, name: 'Dinner Budget', repeatingFk: 1, description: 'Saving some cash.', startDate: new Date(), endDate: new Date(), balanceFk: 1, typeFk: "save", amountStart: 500.50, amountLeft:50, monthFk: 6, isPast: 0}
    ];
    return {incomes, spendings, expenses, categories, budgets};
  }
}



