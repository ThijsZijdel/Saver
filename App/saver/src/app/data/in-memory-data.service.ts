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
      { id: 8, name: 'Salary', amount: 500,    repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Aug", monthFk: 8, balanceFk: 2, companyFk: 1, alreadyPaid: 0  },
      { id: 9, name: 'Salary', amount: 600.50, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Sep", monthFk: 9, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 10, name: 'Salary', amount: 400.50, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Oct", monthFk: 10, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 11, name: 'Salary', amount: 600.50, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Nov", monthFk: 11, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 12, name: 'Salary', amount: 900,    repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Dec", monthFk: 12, balanceFk: 2, companyFk: 1, alreadyPaid: 0  }
    ];
    const spendings = [
      { id: 1, name: 'Household', amount: 230.20,  description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 1, subcategoryFk: 1, balanceFk: 3},
      { id: 2, name: 'Utilities', amount: 100.40,  description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 1, subcategoryFk: 2, balanceFk: 1  },
      { id: 3, name: 'Groceries', amount: 700.10,  description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 1, subcategoryFk: 3, balanceFk: 1  },
      { id: 4, name: 'Transportation', amount: 50.30,   description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 1, subcategoryFk: 4, balanceFk: 1  },
      { id: 5, name: 'Personal', amount: 350.20,  description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 1, subcategoryFk: 5, balanceFk: 2  },
      { id: 6, name: 'Mobile Phone', amount: 100,     description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 1, subcategoryFk: 6, balanceFk: 1  },
      { id: 7, name: 'Clothing', amount: 200.40,  description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 1, subcategoryFk: 7, balanceFk: 1  },
      { id: 8, name: 'Festivals', amount: 700,     description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 1, subcategoryFk: 8, balanceFk: 2  },
      { id: 9, name: 'Insurances', amount: 300.50,  description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 1, subcategoryFk: 9, balanceFk: 1  },
      { id: 10, name: 'Scooter costs', amount: 500.50,description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 1, subcategoryFk: 10, balanceFk: 1  },
      { id: 11, name: 'Rent', amount: 650.50,description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 1, subcategoryFk: 11, balanceFk: 1  },
      { id: 12, name: 'Study', amount: 800,   description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 1, subcategoryFk: 12, balanceFk: 1  }
    ];
    const expenses = [
      { id: 1, name: 'Monthly Rent', amount: 530.20, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Jan", monthFk: 1, subCategoryFk: 11, balanceFk: 1, companyFk: 1, alreadyPaid: 1 },
      { id: 2, name: 'Awakenings', amount: 300.40, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Feb", monthFk: 2, subCategoryFk: 8, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 3, name: 'Ah Food', amount: 600.10, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Mar", monthFk: 3, subCategoryFk: 3, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 4, name: 'Scooter Benzine', amount: 100.30, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Apr", monthFk: 4, subCategoryFk: 4, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 5, name: 'Drone', amount: 750.20, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "May", monthFk: 5, subCategoryFk: 5, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 6, name: 'Stufi', amount: 900,    repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Jun", monthFk: 6, subCategoryFk: 2, balanceFk: 1, companyFk: 1, alreadyPaid: 1  },
      { id: 7, name: 'Scooter Repair', amount: 300.40, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Jul", monthFk: 7, subCategoryFk: 4, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 8, name: 'Foods', amount: 500,    repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Aug", monthFk: 8, subCategoryFk: 3, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 9, name: 'Lamps', amount: 600.50, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Sep", monthFk: 9, subCategoryFk: 1, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 10, name: 'Drinks', amount: 400.50, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Oct", monthFk: 10, subCategoryFk: 3, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 11, name: 'Mysteryland', amount: 600.50, repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Nov", monthFk: 11, subCategoryFk: 8, balanceFk: 1, companyFk: 1, alreadyPaid: 0  },
      { id: 12, name: 'Athome', amount: 900,    repeatingFk: null, description: 'desc.', date: new Date(), monthName: "Dec", monthFk: 12, subCategoryFk: 1, balanceFk: 1, companyFk: 1, alreadyPaid: 0  }
    ];

    // id: number, name: string, amount: number, description: string, type: string, bankFk: number
    const balances = [
      { id: 1, name: 'ING Main', amount: 2453.50, description: 'Main on demand balance account.', type:1, bankFk: 0, maxDebt: -2000},
      { id: 2, name: 'ING Savings', amount: 7453.50, description: 'Main savings balance account.',  type:2 , bankFk: 0, maxDebt: 0},
      { id: 3, name: 'ING Credit Card', amount: 0, description: 'Credit card account.', type: 3, bankFk: 0, maxDebt: -2000},
      { id: 4, name: 'ING Savings Holiday', amount: 453.50, description: 'Holiday savings balance account.', type:2, bankFk: 0, maxDebt: 0},
    ];
    const balanceCategories = [
      { id: 1, name: 'On Demand', description: 'Money that is ready to be spend.', color: "#EB7092", icon:"credit-card"},
      { id: 2, name: 'Savings', description: 'Money that is saving up.', color: "#EB7092", icon:"credit-card"},
      { id: 3, name: 'Credit', description: 'Credit card.', color: "#EB7092", icon:"credit-card"}

    ];

    const categories = [
      { id: 1, name: 'Home', description: 'home related expenses.', color: "#EB7092", icon:"home", subCategoryFk: 0},
      { id: 2, name: 'Utilities', description: 'Mostly monthly expenses.', color: "#D23556",icon:"cogs", subCategoryFk: 0},
      { id: 3, name: 'Groceries', description: 'Food, drinks.', color: "#FFBB28",icon:"utensils", subCategoryFk: 0},
      { id: 4, name: 'Transportation', description: 'Transportation expenses.', color: "#55BF3B",icon:"car", subCategoryFk: 0},
      { id: 5, name: 'Personal', description: 'Personal expenses.', color: "#444",icon:"user", subCategoryFk: 0},
      { id: 6, name: 'Mobile Phone', description: 'Tele2.', color: "#4BCA81",icon:"phone", subCategoryFk: 2},
      { id: 7, name: 'Clothing', description: 'Clothes.', color: "#8a6fca",icon:"tshirt", subCategoryFk: 0},
      { id: 8, name: 'Festivals', description: 'Parties.', color: "#00AEEF",icon:"gift", subCategoryFk: 5},
      { id: 9, name: 'Insurances', description: 'desc.', color: "#938234",icon:"medkit", subCategoryFk: 0},
      { id: 10, name: 'Scooter costs', description: 'desc.', color: "#eeaaee",icon:"motorcycle", subCategoryFk: 4},
      { id: 11, name: 'Rent', description: 'Home costs.', color: "#FFBB28", icon:"home", subCategoryFk: 1},
      { id: 12, name: 'Study', description: 'desc.', color: "#B8E986",icon:"graduation-cap", subCategoryFk: 0}
    ];
    const budgets = [
      { id: 1, name: 'Bulk Budget', repeatingFk: 1, description: 'Main Budget.', startDate: new Date(), endDate: new Date(), balanceFk: 1, typeFk: "bulk", amountStart: 3563.52, amountLeft:2963.52, monthFk: 6, isPast: 0},
      { id: 2, name: 'Dinner Budget', repeatingFk: 1, description: 'Saving some cash.', startDate: new Date(), endDate: new Date(), balanceFk: 1, typeFk: "save", amountStart: 500.50, amountLeft:50, monthFk: 6, isPast: 0}
    ];
    return {incomes, spendings, expenses, categories, budgets, balances};
    //TODO export balance categories
  }
}

